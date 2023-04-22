import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  url: string = environment.urlLogin;

  constructor(private http: HttpClient) {}

  getMeta(idUsuario: string) {
    return this.http.get<any>(`${this.url}Ativos`);
  }
}
