import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CriarMetasModel, MetasModel } from '../model/Metas';

@Injectable({
  providedIn: 'root',
})
export class MetasService {
  url: string = 'http://localhost:3000/meta';

  constructor(private http: HttpClient) {}

  getMeta() {
    return this.http.get(this.url);
  }

  addMeta(model: CriarMetasModel) {
    return this.http.post(this.url, model);
  }

  deletMeta(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
