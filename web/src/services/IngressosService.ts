import api from "./api";
import type { Ingresso } from "../models/Ingresso";

export function listIngressos() {
  return api.get<Ingresso[]>("/ingressos");
}

export function createIngresso(data: Partial<Ingresso>) {
  return api.post("/ingressos", data);
}
