import api from './api';
import type { Notificacao } from '../models/Notificacao';

export const notificacoesService = {
  async listar(): Promise<Notificacao[]> {
    const { data } = await api.get<Notificacao[]>('/notificacoes');
    return data;
  },

  async marcarComoLida(id: number): Promise<void> {
    await api.patch(`/notificacoes/${id}/lida`);
  },

  async marcarTodasComoLidas(): Promise<void> {
    await api.patch('/notificacoes/ler-todas');
  },
};
