import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastrarUsuario, LoginUsuario } from 'src/core/model/Usuario';
import { environment } from 'src/environments/environment';
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
  url: string = environment.urlLogin;

  constructor(private http: HttpClient) {}

  cadastrarUsuario(model: CadastrarUsuario) {
    return this.http.post(`${this.url}Usuarios/cadastrarUsuario`, model);
  }

  login(model: LoginUsuario) {
    return this.http.post(`${this.url}Usuarios/Login`, model);
  }
}
