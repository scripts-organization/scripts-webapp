import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { MesaAlcalde } from '../models/mesaAlcalde.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MesaAlcaldeService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMesasAlcalde() {
    const url = `${base_url}/mesa_alcalde`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; mesasAlcalde: MesaAlcalde[] }) => resp.mesasAlcalde)
      );
  }
}
