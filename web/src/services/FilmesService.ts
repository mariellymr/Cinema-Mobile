import api from "./api";
import type { Filme } from "../models/Filme";

export function listFilmes() {
  return api.get<Filme[]>("/filmes");
}

export function createFilme(filme: Partial<Filme>) {
  return api.post("/filmes", filme);
}

export function updateFilme(id: number, filme: Partial<Filme>) {
  return api.put(`/filmes/${id}`, filme);
}

export function deleteFilme(id: number) {
  return api.delete(`/filmes/${id}`);
}
