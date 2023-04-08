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
  id?: number;
  nomeMeta: number;
  valorInicial: number;
  objetivo: number;
  dataEstimada: string;
  status?: Status;
  porcentagem: number;
  items: Items[];
}

export interface EditarMetasModel {
  nomeMeta: number;
  valorInicial: number;
  objetivo: number;
  dataEstimada: string;
  status?: Status;
  porcentagem: number;
}

export interface AllMetasModel {
  dataEstimada: string;
  metaId: number;
  nomeMeta: string;
  objetivo: string;
  porcentagem: number;
  valorInicial: string;
  items: Items[];
}

export interface Items {
  id?: number;
  data: string;
  hora: string;
  valor: number;
}

export enum Status {
  CONCLUIDA = 1,
  ANDAMENTO = 2,
}
