import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CadastrarPergunta,
  ListarPerguntas,
  AtualizarPergunta,
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
export class PerguntasService {
  url: string = environment.urlBase;

  constructor(private http: HttpClient) { }

  cadastrarPergunta(model: CadastrarPergunta) {
    return this.http.post(
      `${this.url}Perguntas/cadastrarPergunta`,
      model,
      httpOptions
    );
  }

  buscarPergunta(idUsuario: number) {
    return this.http.get<ListarPerguntas>(
      `${this.url}Perguntas/buscarPerguntas/${idUsuario}`
    );
  }

  atualizarPergunta(model: AtualizarPergunta) {
    return this.http.put(
      `${this.url}Perguntas/EditarPergunta`,
      model,
      httpOptions
    );
  }

  deletarPergunta(idPergunta: number) {
    return this.http.delete(
      `${this.url}Perguntas/DeletarPergunta/${idPergunta}`
    );
  }
}
