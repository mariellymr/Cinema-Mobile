import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  filmeId?: number | null;
  lida: boolean;
  criadaEm: string;
}

const API_URL = (api.defaults.baseURL || 'http://localhost:3000').replace(/\/$/, '');

export const NotificationBell = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<Notificacao | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  useEffect(() => {
    let mounted = true;

    api
      .get<Notificacao[]>('/notificacoes')
      .then((res) => {
        if (mounted && Array.isArray(res.data)) {
          setNotificacoes(res.data);
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar notificações:', err);
      });

    const eventSource = new EventSource(`${API_URL}/notificacoes/stream`);

    eventSource.onmessage = (event) => {
      try {
        const nova: Notificacao = JSON.parse(event.data);
        setNotificacoes((prev) => {
          if (prev.some((n) => n.id === nova.id)) return prev;
          return [nova, ...prev];
        });
        setToast(nova);
        setTimeout(() => {
          setToast((atual) => (atual?.id === nova.id ? null : atual));
        }, 6000);
      } catch (err) {
        console.error('Erro ao ler evento de notificação:', err);
      }
    };

    return () => {
      mounted = false;
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const marcarComoLida = async (id: number) => {
    try {
      await api.patch(`/notificacoes/${id}/lida`);
      setNotificacoes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, lida: true } : n)),
      );
    } catch (err) {
      console.error('Erro ao marcar notificação como lida:', err);
    }
  };

  const marcarTodasComoLidas = async () => {
    try {
      await api.patch('/notificacoes/ler-todas');
      setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
    } catch (err) {
      console.error('Erro ao marcar todas como lidas:', err);
    }
  };

  return (
    <>
      <div className="position-relative me-3" ref={dropdownRef}>
        <button
          type="button"
          className="btn btn-dark position-relative p-2 border-0"
          onClick={() => setOpen((prev) => !prev)}
          title="Notificações de novos filmes"
          aria-label="Notificações"
        >
          <i className="bi bi-bell-fill fs-5 text-warning"></i>
          {naoLidas > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.7rem' }}
            >
              {naoLidas > 9 ? '9+' : naoLidas}
            </span>
          )}
        </button>

        {open && (
          <div
            className="card shadow-lg position-absolute end-0 mt-2 text-white"
            style={{
              width: '340px',
              maxHeight: '420px',
              overflowY: 'auto',
              zIndex: 1050,
              backgroundColor: '#1e242d',
              border: '1px solid #343d4b',
            }}
          >
            <div className="card-header d-flex justify-content-between align-items-center border-secondary">
              <span className="fw-bold">Notificações</span>
              {naoLidas > 0 && (
                <button
                  type="button"
                  className="btn btn-link btn-sm text-warning text-decoration-none p-0"
                  onClick={marcarTodasComoLidas}
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>

            <div className="list-group list-group-flush">
              {notificacoes.length === 0 ? (
                <div className="p-3 text-center text-secondary small">
                  Nenhuma notificação ainda.
                </div>
              ) : (
                notificacoes.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => !n.lida && marcarComoLida(n.id)}
                    className="list-group-item list-group-item-action text-start border-secondary"
                    style={{
                      backgroundColor: n.lida ? '#1e242d' : '#283140',
                      color: '#fff',
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <strong className="small text-warning">{n.titulo}</strong>
                      {!n.lida && (
                        <span
                          className="badge bg-danger ms-2"
                          style={{ fontSize: '0.65rem' }}
                        >
                          Novo
                        </span>
                      )}
                    </div>
                    <p className="mb-1 small text-light">{n.mensagem}</p>
                    <small className="text-secondary" style={{ fontSize: '0.72rem' }}>
                      {new Date(n.criadaEm).toLocaleString('pt-BR')}
                    </small>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1100, maxWidth: '360px' }}
        >
          <div
            className="toast show text-white shadow-lg"
            role="alert"
            style={{
              backgroundColor: '#1e242d',
              border: '1px solid #f5c518',
            }}
          >
            <div className="toast-header bg-dark text-warning border-secondary">
              <i className="bi bi-film me-2"></i>
              <strong className="me-auto">{toast.titulo}</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Fechar"
                onClick={() => setToast(null)}
              ></button>
            </div>
            <div className="toast-body small">{toast.mensagem}</div>
          </div>
        </div>
      )}
    </>
  );
};
