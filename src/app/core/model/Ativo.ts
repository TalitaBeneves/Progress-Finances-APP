import { TipoAtivo } from './Enums';

export interface ListaAtivoCalculado {
  usuario_Id: number;
  ativo_id: number;
  nome: string;
  nota: number;
  recomendacaoPorcentagem: number;
  sugestaoInvestimento: number;
  valorTotalInvestido: number;
  tipo: TipoAtivo;
}

export interface CadastrarAtivo {
  usuario_Id: number;
  nome: string;
  nota: number;
  sugestaoInvestimento: number;
  tipo: TipoAtivo;
  localAlocado: string;
  qtdAtivos: number;
  valorTotalInvestido: number;
  valorAtualDoAtivo: number;
}

export interface AtualizarAtivo extends CadastrarAtivo {
  ativo_id: number;
}
