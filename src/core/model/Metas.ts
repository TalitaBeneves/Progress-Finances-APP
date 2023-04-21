import { Data } from '@angular/router';

export interface CriarMetasModel {
  nomeMeta: number;
  valorInicial: number;
  valorMeta: number;
  dataCadastro: Data;
  dataAlvo: Data;
  porcentagem?: number;
  status?: Status;
  items: Items[];
}

export interface EditarMetasModel {
  id: number;
  nomeMeta: number;
  valorInicial: number;
  valorMeta: number;
  dataCadastro: Data;
  dataAlvo: Data;
  porcentagem?: number;
  status?: Status;
}

export interface AllMetasModel {
  id: number;
  nomeMeta: number;
  valorInicial: number;
  valorTotal: number;
  valorMeta: number;
  dataCadastro: Data;
  dataAlvo: Data;
  porcentagem: number;
  status?: Status;
  items: Items[];
}

export interface Items {
  id: number;
  dataDeposito: Date;
  valorDepositado: number;
}

export interface CreateItemsModel {
  valorDepositado: number;
  dataDeposito: Date;
  idMeta: number;
  progressFinanceModelId: number;
}

export interface EditarItemsModel {
  id: number;
  valorDepositado: number;
  dataDeposito: Date;
  idMeta: number;
  progressFinanceModelId: number;
}

export enum Status {
  CONCLUIDA = 0,
  ANDAMENTO = 1,
}
