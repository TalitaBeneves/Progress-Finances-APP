import { TipoAtivo } from './Enums';

export interface CadastrarAtivo {
  idUsuario: number;
  idMeta: number;
  nome: string;
  nota: number;
  recomendacaoPorcentagem: number;
  sugestaoInvestimento: number;
  tipoAtivo: TipoAtivo;
}
