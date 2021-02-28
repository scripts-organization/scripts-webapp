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

  obtenerMesaPorCodigo( codigo: string ) {

    const url = `${ base_url }/mesa_alcalde/codigo/${ codigo }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, mesaAlcalde: MesaAlcalde }) => resp.mesaAlcalde )
              );
  }

  actualizarMesaAlcalde( mesaAlcalde: MesaAlcalde ) {
    const url = `${ base_url }/mesa_alcalde/${ mesaAlcalde._id }`;
    return this.http.put( url, mesaAlcalde, this.headers );

  }

  resetMesa( id: string ) {
    const url = `${ base_url }/mesa_alcalde/reset/${ id }`;
    return this.http.put( url, {} ,this.headers );            
  }

  subirFotosMesa( id: string, images: any[] ) {
    const url = `${ base_url }/mesa_alcalde/foto/${ id }`;
    return this.http.put( url, images ,this.headers );            
  }
}
