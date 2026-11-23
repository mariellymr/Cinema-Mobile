import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AppState } from 'react-native';
import type { Notificacao } from '../models/Notificacao';
import { notificacoesService } from '../services/notificacoesService';
import { useAuth } from './AuthContext';

interface NotificacoesContextType {
  notificacoes: Notificacao[];
  naoLidas: number;
  loading: boolean;
  toastAtual: Notificacao | null;
  fecharToast: () => void;
  recarregar: () => Promise<void>;
  marcarComoLida: (id: number) => Promise<void>;
  marcarTodasComoLidas: () => Promise<void>;
}

const NotificacoesContext = createContext<NotificacoesContextType | undefined>(
  undefined,
);

export const NotificacoesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated } = useAuth();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastAtual, setToastAtual] = useState<Notificacao | null>(null);

  const knownIdsRef = useRef<Set<number>>(new Set());
  const initializedRef = useRef(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const exibirToast = useCallback((notificacao: Notificacao) => {
    setToastAtual(notificacao);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastAtual(null);
    }, 5500);
  }, []);

  const fecharToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastAtual(null);
  }, []);

  const buscar = useCallback(
    async (silencioso = false) => {
      if (!isAuthenticated) return;
      try {
        if (!silencioso) setLoading(true);
        const lista = await notificacoesService.listar();

        if (initializedRef.current) {
          const nova = lista.find((n) => !knownIdsRef.current.has(n.id));
          if (nova) {
            exibirToast(nova);
          }
        } else {
          initializedRef.current = true;
        }

        knownIdsRef.current = new Set(lista.map((n) => n.id));
        setNotificacoes(lista);
      } catch {
        // Silencioso no polling para não atrapalhar a navegação
      } finally {
        if (!silencioso) setLoading(false);
      }
    },
    [isAuthenticated, exibirToast],
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setNotificacoes([]);
      knownIdsRef.current = new Set();
      initializedRef.current = false;
      fecharToast();
      return;
    }

    void buscar(false);

    const interval = setInterval(() => {
      if (AppState.currentState === 'active') {
        void buscar(true);
      }
    }, 4000);

    return () => {
      clearInterval(interval);
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, [isAuthenticated, buscar, fecharToast]);

  const marcarComoLida = useCallback(async (id: number) => {
    await notificacoesService.marcarComoLida(id);
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n)),
    );
  }, []);

  const marcarTodasComoLidas = useCallback(async () => {
    await notificacoesService.marcarTodasComoLidas();
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  }, []);

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <NotificacoesContext.Provider
      value={{
        notificacoes,
        naoLidas,
        loading,
        toastAtual,
        fecharToast,
        recarregar: () => buscar(false),
        marcarComoLida,
        marcarTodasComoLidas,
      }}
    >
      {children}
    </NotificacoesContext.Provider>
  );
};

export const useNotificacoes = () => {
  const context = useContext(NotificacoesContext);
  if (!context) {
    throw new Error(
      'useNotificacoes deve ser usado dentro de NotificacoesProvider',
    );
  }
  return context;
};
