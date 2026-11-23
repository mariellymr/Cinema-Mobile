import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '../services/api';
import type { LoginResponse, User } from '../models/User';

const TOKEN_KEY = '@cinema:token';
const USER_KEY = '@cinema:user';

interface AuthResult {
  ok: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  loadingStorage: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingStorage, setLoadingStorage] = useState(true);

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);

        if (storedToken && storedUser) {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setUser(JSON.parse(storedUser) as User);
        }
      } catch {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      } finally {
        setLoadingStorage(false);
      }
    };

    void loadStoredAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        email: email.trim(),
        password,
      });

      const { access_token, user: userData } = response.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEY, access_token),
        AsyncStorage.setItem(USER_KEY, JSON.stringify(userData)),
      ]);

      setUser(userData);
      return { ok: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          return {
            ok: false,
            message: 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.',
          };
        }
        if (error.response.status === 401) {
          return { ok: false, message: 'E-mail ou senha inválidos.' };
        }
      }
      return { ok: false, message: 'Erro ao realizar login. Tente novamente.' };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    try {
      await api.post('/users', {
        name: name.trim(),
        email: email.trim(),
        password,
      });
      return { ok: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          return {
            ok: false,
            message: 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.',
          };
        }
        if (error.response.status === 409) {
          return { ok: false, message: 'Este e-mail já está cadastrado.' };
        }
        if (error.response.status === 400) {
          return { ok: false, message: 'Verifique os dados informados (senha mínima de 6 caracteres).' };
        }
        if (error.response.status === 500) {
          return {
            ok: false,
            message: 'Erro interno (este e-mail pode já estar cadastrado).',
          };
        }
      }
      return { ok: false, message: 'Erro ao criar conta. Tente novamente.' };
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingStorage,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
