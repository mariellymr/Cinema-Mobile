import api from './api';
import type {
  CreateIngressoPayload,
  Ingresso,
  IngressoDetalhado,
} from '../models/Ingresso';
import { sessoesService } from './sessoesService';

export const ingressosService = {
  async criar(payload: CreateIngressoPayload): Promise<Ingresso> {
    const { data } = await api.post<Ingresso>('/ingressos', payload);
    return data;
  },

  async listarDetalhados(
    userId?: number,
    isAdmin = false,
  ): Promise<IngressoDetalhado[]> {
    const [ingressosRes, sessoesDetalhadas] = await Promise.all([
      api.get<Ingresso[]>('/ingressos'),
      sessoesService.listarDetalhadas(),
    ]);

    const sessoesMap = new Map(sessoesDetalhadas.map((s) => [s.id, s]));

    const filtrados =
      !isAdmin && userId
        ? ingressosRes.data.filter((i) => i.userId === userId)
        : ingressosRes.data;

    return filtrados
      .map((ingresso) => ({
        ...ingresso,
        sessao: sessoesMap.get(ingresso.sessaoId),
      }))
      .sort(
        (a, b) =>
          new Date(b.dataVenda).getTime() - new Date(a.dataVenda).getTime(),
      );
  },
};
