import api from "./api";
import type { Sessao } from "../models/Sessao";

export function listSessoes() {
  return api.get<Sessao[]>("/sessoes");
}

export function createSessao(sessao: Partial<Sessao>) {
  return api.post("/sessoes", sessao);
}

export function updateSessao(id: string, sessao: Partial<Sessao>) {
  return api.put(`/sessoes/${id}`, sessao);
}

export function deleteSessao(id: string) {
  return api.delete(`/sessoes/${id}`);
}