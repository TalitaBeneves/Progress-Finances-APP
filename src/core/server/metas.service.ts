import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AllMetasModel,
  CriarMetasModel,
  EditarMetasModel,
  Items,
  MetasModel,
} from '../model/Metas';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MetasService {
  // url: string = 'http://localhost:3000/metas';
  url: string = environment.url;

  constructor(private http: HttpClient) {}

  getMeta() {
    return this.http.get<AllMetasModel>(this.url);
  }

  getMetaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  addMeta(model: CriarMetasModel) {
    return this.http.post(this.url, model);
  }

  editMeta(id: number, model: EditarMetasModel) {
    const url = `${this.url}/${id}`;
    return this.http.put(url, model);
  }

  createItem(metaId: any, item: Items): Observable<any> {
    return this.http.post<any>(`${this.url}/${metaId}/items`, item);
  }

  deletMeta(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
