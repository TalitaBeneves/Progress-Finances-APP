import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  AllMetasModel,
  CreateItemsModel,
  CriarMetasModel,
  EditarItemsModel,
  EditarMetasModel,
  Items,
} from '../model/Metas';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-HTTP-Method-Override': 'POST',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MetasService {
  url: string = environment.url;
  urlItems: string = environment.urlItems;
  private _listners = new Subject<any>();

  constructor(private http: HttpClient) {}

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: any) {
    this._listners.next(filterBy);
  }

  getMeta() {
    return this.http.get<AllMetasModel>(this.url);
  }

  getMetaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  addMeta(model: CriarMetasModel) {
    return this.http.post(this.url, model, httpOptions);
  }

  editMeta(model: EditarMetasModel) {
    const url = `${this.url}`;
    return this.http.put(url, model, httpOptions);
  }

  deletMeta(id: number) {
    return this.http.delete(`${this.url}/${id}`, httpOptions);
  }

  getItems() {
    return this.http.get<Items>(this.urlItems);
  }

  createItem(model: CreateItemsModel) {
    return this.http.post(this.urlItems, model, httpOptions);
  }

  editarItem(model: EditarItemsModel) {
    return this.http.put(this.urlItems, model, httpOptions);
  }

  deleteItem(idItem: number) {
    return this.http.delete<any>(`${this.urlItems}/${idItem}`, httpOptions);
  }
}
