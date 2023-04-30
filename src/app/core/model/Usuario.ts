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
