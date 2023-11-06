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
  token?: string;
}

export interface AtualizarDadosUsuarioModel {
  idUsuario: number;
  email: string;
  nome: string;
  imagemUrl?: string;
  senhaAtual?: string;
  novaSenha?: string;
}

export interface RedefinirUsuarioModel {
  idUsuario: number;
  email: string;
  novaSenha: string;
}

export interface CadastrarPergunta {
  idUsuario: number;
  ativo: boolean;
  tipo: TipoAtivoPergunta;
  pergunta: string;
}

export interface AtualizarPergunta extends CadastrarPergunta {
  idPergunta: number;
}

export interface ListarPerguntas {
  idPergunta: number;
  idUsuario: number;
  pergunta: string;
  ativo: boolean;
  tipo: TipoAtivoPergunta;
}
