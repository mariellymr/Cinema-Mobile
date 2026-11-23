import api from './api';
import type { Filme } from '../models/Filme';
import type { Sala } from '../models/Sala';
import type { Sessao, SessaoDetalhada } from '../models/Sessao';

export const sessoesService = {
  async listarDetalhadas(): Promise<SessaoDetalhada[]> {
    const [sessoesRes, filmesRes, salasRes] = await Promise.all([
      api.get<Sessao[]>('/sessoes'),
      api.get<Filme[]>('/filmes'),
      api.get<Sala[]>('/salas'),
    ]);

    const filmesMap = new Map(filmesRes.data.map((f) => [f.id, f]));
    const salasMap = new Map(salasRes.data.map((s) => [s.id, s]));

    return sessoesRes.data
      .map((sessao) => ({
        ...sessao,
        filme: filmesMap.get(sessao.filmeId),
        sala: salasMap.get(sessao.salaId),
      }))
      .sort(
        (a, b) =>
          new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime(),
      );
  },
};
