export interface Ingresso {
  id: number;
  sessaoId: number;
  cliente: string;
  cpf: string;
  assento: string;
  pagamento: string;
  combo?: string;
  valorFinal: number;
}
