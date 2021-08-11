export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  status: Status;
  dataDeCriacao: string | Date;
}
export enum Status {
  CANCELADO = 'cancelado',
  EM_ANDAMENTO = 'em_andamento',
  REALIZADO = 'realizado',
}
export const listaDeStatus = [
  {
    text: 'Cancelado',
    value: Status.CANCELADO,
  },
  {
    text: 'Em Andamento',
    value: Status.EM_ANDAMENTO,
  },
  {
    text: 'Realizado',
    value: Status.REALIZADO,
  },
];
export enum Prioridade {
  UM = 'um',
  DOIS = 'dois',
  TRES = 'tres',
  QUATRO = 'quatro',
  CINCO = 'cinco',
}
export const listaDePrioridades = [
  { text: '1', value: Prioridade.UM },
  { text: '2', value: Prioridade.DOIS },
  { text: '3', value: Prioridade.TRES },
  { text: '4', value: Prioridade.QUATRO },
  { text: '5', value: Prioridade.CINCO },
];
