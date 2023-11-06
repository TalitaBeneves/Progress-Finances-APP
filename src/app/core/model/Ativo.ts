import { TipoAtivo } from './Enums';

export interface ListaAtivoCalculado {
  idUsuario: number;
  idAtivo: number;
  nome: string;
  nota: number;
  recomendacaoPorcentagem: number;
  sugestaoInvestimento: number;
  valorTotalInvestido: number;
  tipo: TipoAtivo;
}

export interface CadastrarAtivo {
  idUsuario: number;
  nome: string;
  nota: number;
  sugestaoInvestimento: number;
  tipo: TipoAtivo;
  localAlocado: string;
  qtdAtivos: number;
  valorTotalInvestido: number;
  valorAtualDoAtivo: number;
  chekedParaCalculo: boolean;
}

export interface AtualizarAtivo extends CadastrarAtivo {
  idAtivo: number;
}
