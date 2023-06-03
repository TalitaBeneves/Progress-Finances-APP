import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, take } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  AtualizarPergunta,
  CadastrarPergunta,
  CadastrarUsuario,
  ListarPerguntas,
  LoginUsuario,
  UsuarioLogado,
} from '../../model/Usuario';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-HTTP-Method-Override': 'POST',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private currentUserSource = new ReplaySubject<any>(1);
  url: string = environment.urlBase;
  local: string | null;
  constructor(private http: HttpClient) {}

  cadastrarUsuario(model: CadastrarUsuario) {
    return this.http.post(`${this.url}Usuarios/cadastrarUsuario`, model);
  }

  login(model: LoginUsuario) {
    return this.http.post(`${this.url}Usuarios/Login`, model);
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('usuario', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getUserLocalStorage(): any {
    const local = localStorage.getItem('usuario');
    if (local) {
      this.local = JSON.parse(local);
      return this.local;
    }
  }

  buscarMetaInvestimentoPeloId(idUsuario: number) {
    return this.http.get(
      `${this.url}Usuarios/buscarMetaInvestimentoPeloId/${idUsuario}`
    );
  }

  atualizarDados(model: UsuarioLogado) {
    return this.http.put(
      `${this.url}Usuarios/EditarUsuario`,
      model,
      httpOptions
    );
  }

  atualizarImagem(idUsuario: number, file: File) {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post(`${this.url}Usuarios/upload-image/${idUsuario}`, formData)
      .pipe(take(1));
  }

  /////////////////////////////PERGUNTAS///////////////////////////////////
  cadastrarPergunta(model: CadastrarPergunta) {
    return this.http.post(`${this.url}Usuarios/cadastrarPergunta`, model);
  }

  buscarPergunta(idUsuario: number) {
    return this.http.get<ListarPerguntas>(
      `${this.url}Usuarios/buscarPerguntas/${idUsuario}`
    );
  }

  atualizarPergunta(model: AtualizarPergunta) {
    return this.http.put(
      `${this.url}Usuarios/EditarPergunta`,
      model,
      httpOptions
    );
  }

  deletarPergunta(idPergunta: number) {
    return this.http.delete(`${this.url}Usuario/DeletarPergunta/${idPergunta}`);
  }
}
