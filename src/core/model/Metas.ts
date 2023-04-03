export interface MetasModel {
  id?: number;
  nomeMeta: string;
  valorAtual: number;
  objetivo: number;
  hora: string;
  dataEstimada: string;
  porcentagem: string;
  status: Status;
}

export interface CriarMetasModel {
  nomeMeta: number;
  valorInicial: number;
  objetivo: number;
  dataEstimada: string;
  status?: Status;
}

export enum Status {
  CONCLUIDA = 1,
  ANDAMENTO = 2,
}
