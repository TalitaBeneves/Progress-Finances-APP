import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CadastrarAtivo } from '../../model/Ativo';
import { MetaInvestimento } from '../../model/MetaInvestimento';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-HTTP-Method-Override': 'POST',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class FinancesService {
  url: string = environment.urlBase;
  private _listners = new Subject<any>();

  constructor(private http: HttpClient) {}

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: any) {
    this._listners.next(filterBy);
  }

  litarAtivosById(idUsuario: string) {
    return this.http.get<any>(`${this.url}Ativos/LitarAtivosById/${idUsuario}`);
  }

  cadastrarAtivo(model: CadastrarAtivo) {
    return this.http.post(`${this.url}Ativos`, model, httpOptions);
  }

  buscarPorAtivo(symbol: string) {
    return this.http.get(`${this.url}BuscarPorAtivo?${symbol}`);
  }

  //Meta Investimento
  cadastrarOuAtualizarMetaInvestimento(model: MetaInvestimento) {
    return this.http.post(
      `${this.url}api/MetasInvestimento/CadastrarOuAtualizarMetaInvestimento`,
      model,
      httpOptions
    );
  }

  listarMetaInvestimento(idMeta: number) {
    return this.http.get<MetaInvestimento[]>(
      `${this.url}api/MetasInvestimento/${idMeta}`
    );
  }
}
