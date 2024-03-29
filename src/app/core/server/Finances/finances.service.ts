import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  AtualizarAtivo,
  CadastrarAtivo,
  ListaAtivoCalculado,
} from '../../model/Ativo';
import {
  ListarMetaInvestimentoModel,
  MetaInvestimento,
} from '../../model/MetaInvestimento';
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
  private _listnersByFiltro = new Subject<any>();

  constructor(private http: HttpClient) { }

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: any) {
    this._listners.next(filterBy);
  }

  listenFiltro(): Observable<any> {
    return this._listnersByFiltro.asObservable();
  }

  filterByFiltro(filterBy: any) {
    this._listnersByFiltro.next(filterBy);
  }

  litarAtivosById(idUsuario: number) {
    return this.http.get<any>(`${this.url}Ativos/LitarAtivosById/${idUsuario}`);
  }

  cadastrarAtivo(model: CadastrarAtivo) {
    return this.http.post(
      `${this.url}Ativos/CadastrarAtivo`,
      model,
      httpOptions
    );
  }

  atualizarAtivo(model: AtualizarAtivo) {
    return this.http.put(`${this.url}Ativos/EditarAtivo`, model, httpOptions);
  }

  deletarAtivo(idAtivo: number) {
    return this.http.delete(
      `${this.url}Ativos/Deletar/${idAtivo}`,
      httpOptions
    );
  }

  naoCalcularInvestimento(
    idUsuario: number,
    idAtivo: number,
    checked: boolean
  ) {
    return this.http.put(
      `${this.url}Ativos/naoCalcularInvestimento?idUsuario=${idUsuario}&idAtivo=${idAtivo}&chekedParaCalcular=${checked}`,
      httpOptions
    );
  }

  buscarPorAtivo(symbol: string) {
    return this.http.get(`${this.url}BuscarPorAtivo?${symbol}`);
  }

  buscarValorAtivo(ativo: string) {
    return this.http.get<any>(`${this.url}BuscaValorAtivo/${ativo}`)
  }

  //Meta Investimento
  cadastrarOuAtualizarMetaInvestimento(model: MetaInvestimento) {
    return this.http.post(
      `${this.url}MetaInvestimento/CadastrarOuAtualizarMetaInvestimento`,
      model,
      httpOptions
    );
  }

  listarMetaInvestimento(idMeta: number) {
    return this.http.get<ListarMetaInvestimentoModel[]>(
      `${this.url}MetaInvestimento/${idMeta}`
    );
  }

  //calcular
  calcularRecomendacaoInvestimento(
    idUsuario: number,
    valorInvestimento: number
  ) {
    return this.http.get<ListaAtivoCalculado>(
      `${this.url}CalcularInvestimento?idUsuario=${idUsuario}&valorInvestimento=${valorInvestimento}`
    );
  }
}
