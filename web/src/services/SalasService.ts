import api from "./api";
import type { Sala } from "../models/Sala";

export function listSalas() {
  return api.get<Sala[]>("/salas");
}

export function createSala(sala: Partial<Sala>) {
  return api.post("/salas", sala);
}

export function updateSala(id: string, sala: Partial<Sala>) {
  return api.put(`/salas/${id}`, sala);
}

export function deleteSala(id: string) {
  return api.delete(`/salas/${id}`);
}

