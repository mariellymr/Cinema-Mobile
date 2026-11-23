import type { SessaoDetalhada } from './Sessao';

export interface Ingresso {
  id: number;
  nomeCliente: string;
  cpfCliente: string;
  assento: string;
  tipoPagamento: string;
  dataVenda: string;
  sessaoId: number;
  userId?: number | null;
}

export interface CreateIngressoPayload {
  nomeCliente: string;
  cpfCliente: string;
  assento: string;
  tipoPagamento: string;
  sessaoId: number;
  userId?: number;
}

export interface IngressoDetalhado extends Ingresso {
  sessao?: SessaoDetalhada;
}

export interface ComboLanche {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
}

export const COMBOS_LANCHES: ComboLanche[] = [
  {
    id: 'sem-combo',
    nome: 'Sem combo',
    descricao: 'Apenas o ingresso da sessão',
    preco: 0,
  },
  {
    id: 'pipoca-p',
    nome: 'Combo Pipoca Pequena + Refri',
    descricao: '1 pipoca pequena + 1 refrigerante 400ml',
    preco: 15,
  },
  {
    id: 'pipoca-m',
    nome: 'Combo Pipoca Média + Refri',
    descricao: '1 pipoca média + 1 refrigerante 500ml',
    preco: 22,
  },
  {
    id: 'pipoca-g',
    nome: 'Combo Pipoca Grande + Refri',
    descricao: '1 pipoca grande + 1 refrigerante 700ml',
    preco: 29,
  },
  {
    id: 'premium',
    nome: 'Combo Premium',
    descricao: 'Pipoca grande + 2 refrigerantes + chocolate',
    preco: 39,
  },
];

export const FORMAS_PAGAMENTO = [
  'Cartão de Crédito',
  'PIX',
  'Dinheiro',
] as const;
