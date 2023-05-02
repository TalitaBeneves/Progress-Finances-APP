import { TipoAtivo } from './Enums';

export interface CadastrarAtivo {
  idUsuario: number;
  idMeta: number;
  nome: string;
  nota: number;
  recomendacaoPorcentagem: number;
  sugestaoInvestimento: number;
  tipoAtivo: TipoAtivo;
  localAlocado: string;
  quantidadeDeAtivo: number;
  valorTotalInvestido: number;
  valorAtualDoAtivo: number;
}

export interface ListaAtivoCalculado {
  idUsuario: number;
  idMeta: number;
  idAtivo: number;
  nome: string;
  nota: number;
  recomendacaoPorcentagem: number;
  sugestaoInvestimento: number;
  valorTotalInvestido: number;
  tipoAtivo: TipoAtivo;
}

export interface AtualizarAtivo {
  idUsuario: number;
  idMeta: number;
  idAtivo: number;
  nome: string;
  nota: number;
  recomendacaoPorcentagem: number;
  sugestaoInvestimento: number;
  tipoAtivo: TipoAtivo;
  localAlocado: string;
  quantidadeDeAtivo: number;
  valorTotalInvestido: number;
  valorAtualDoAtivo: number;
}
