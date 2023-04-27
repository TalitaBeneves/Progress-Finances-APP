import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CadastrarUsuario, LoginUsuario } from '../../model/Usuario';
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
}
