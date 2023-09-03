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
  usuario_Id: number;
  email: string;
  nome: string;
  imagemUrl?: string;
  token?: string;
}

export interface AtualizarDadosUsuarioModel {
  usuario_Id: number;
  email: string;
  nome: string;
  imagemUrl?: string;
  senhaAtual?: string;
  novaSenha?: string;
}

export interface CadastrarPergunta {
  usuario_Id: number;
  ativo: boolean;
  tipo: TipoAtivoPergunta;
  pergunta: string;
}

export interface AtualizarPergunta extends CadastrarPergunta {
  id: number;
}

export interface ListarPerguntas {
  pergunta_id: number;
  usuario_Id: number;
  pergunta: string;
  ativo: boolean;
  tipo: TipoAtivoPergunta;
}
