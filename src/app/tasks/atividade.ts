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

export const StatusText = {
  [Status.CANCELADO]: 'Cancelado',
  [Status.EM_ANDAMENTO]: 'Em andamento',
  [Status.REALIZADO]: 'Realizado',
};

export const listaDeStatus = [
  {
    text: StatusText[Status.CANCELADO],
    value: Status.CANCELADO,
  },
  {
    text: StatusText[Status.EM_ANDAMENTO],
    value: Status.EM_ANDAMENTO,
  },
  {
    text: StatusText[Status.REALIZADO],
    value: Status.REALIZADO,
  },
];
export enum Prioridade {
  UM = '1',
  DOIS = '2',
  TRES = '3',
  QUATRO = '4',
  CINCO = '5',
}
export const listaDePrioridades = [
  { text: '1', value: Prioridade.UM },
  { text: '2', value: Prioridade.DOIS },
  { text: '3', value: Prioridade.TRES },
  { text: '4', value: Prioridade.QUATRO },
  { text: '5', value: Prioridade.CINCO },
];
