export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  filmeId?: number | null;
  lida: boolean;
  criadaEm: string;
}
