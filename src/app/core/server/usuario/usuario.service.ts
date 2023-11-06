import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, take } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  CadastrarUsuario,
  LoginUsuario,
  RedefinirUsuarioModel,
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
  currentUser$ = this.currentUserSource.asObservable();

  url: string = environment.urlBase;
  local: string | null | UsuarioLogado;

  constructor(private http: HttpClient) {}

  cadastrarUsuario(model: CadastrarUsuario) {
    return this.http.post(`${this.url}Usuario/cadastrarUsuario`, model);
  }

  login(model: LoginUsuario) {
    return this.http.post(`${this.url}Usuario/Login`, model);
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
      `${this.url}Usuario/buscarMetaInvestimentoPeloId/${idUsuario}`
    );
  }

  atualizarDados(model: UsuarioLogado) {
    return this.http.put(
      `${this.url}Usuario/EditarUsuario`,
      model,
      httpOptions
    );
  }

  redefinirSenha(model: RedefinirUsuarioModel) {
    return this.http.put(
      `${this.url}Usuario/RedefinirSenha`,
      model,
      httpOptions
    );
  }

  atualizarImagem(idUsuario: number, file: File) {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post(`${this.url}Usuario/upload-image/${idUsuario}`, formData)
      .pipe(take(1));
  }

  deletarConta(idUsuario: number) {
    return this.http.delete<any>(
      `${this.url}Usuario/DeletarUsuario/${idUsuario}`
    );
  }
}
