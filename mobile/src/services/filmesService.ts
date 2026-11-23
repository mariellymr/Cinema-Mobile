import api from './api';
import type { Filme } from '../models/Filme';

export interface CreateFilmePayload {
  titulo: string;
  descricao: string;
  genero: string;
  classificacaoIndicativa: string;
  duracaoMinutos: number;
  dataEstreia: string;
}

export const filmesService = {
  async listar(): Promise<Filme[]> {
    const { data } = await api.get<Filme[]>('/filmes');
    return data;
  },

  async criar(payload: CreateFilmePayload): Promise<Filme> {
    const { data } = await api.post<Filme>('/filmes', payload);
    return data;
  },
};
