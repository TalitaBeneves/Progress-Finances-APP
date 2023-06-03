import { TipoAtivoPergunta } from './Enums';

export interface LoginUsuario {
  senha: string;
  email: string;
}

export interface CadastrarUsuario {
  nome: string;
  senha: string;
  email: string;
  imagemUrl?: string;
}

export interface UsuarioLogado {
  idUsuario: number;
  email: string;
  nome: string;
  imagemUrl?: string;
}
export interface AtualizarDadosUsuarioModel {
  idUsuario: number;
  email: string;
  nome: string;
  senhaAtual: string;
  novaSenha: string;
  imagemUrl?: string;
}

export interface CadastrarPergunta {
  idUsuario: number;
  marked: boolean;
  tipo: TipoAtivoPergunta;
  pergunta: string;
}
export interface AtualizarPergunta {
  idUsuario: number;
  id: number;
  marked: boolean;
  tipo: TipoAtivoPergunta;
  pergunta: string;
}

export interface ListarPerguntas {
  id: number;
  idUsuario: number;
  pergunta: string;
  marked: boolean;
  tipo: TipoAtivoPergunta;
}
