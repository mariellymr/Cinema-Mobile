import type { Filme } from './Filme';
import type { Sala } from './Sala';

export interface Sessao {
  id: number;
  dataHora: string;
  preco: number;
  idioma: string;
  formato: string;
  filmeId: number;
  salaId: number;
}

export interface SessaoDetalhada extends Sessao {
  filme?: Filme;
  sala?: Sala;
}
