import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CadastrarAtivo } from 'src/core/model/Ativo';
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
export class FinancesService {
  url: string = environment.urlBase;
  private _listners = new Subject<any>();

  constructor(private http: HttpClient) {}

  getMeta(idUsuario: string) {
    return this.http.get<any>(`${this.url}Ativos/LitarAtivosById/${idUsuario}`);
  }

  cadastrarAtivo(model: CadastrarAtivo) {
    return this.http.post(`${this.url}Ativos`, model, httpOptions);
  }

  getMetaInvestimentoId(idUsuario: number) {
    return this.http.get(
      `${this.url}Usuarios/buscarMetaInvestimentoPeloId/${idUsuario}`
    );
  }
  buscarPorAtivo(symbol: string) {
    return this.http.get(`${this.url}BuscarPorAtivo?${symbol}`);
  }

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: any) {
    this._listners.next(filterBy);
  }
}
