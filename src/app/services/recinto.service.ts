import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Recinto } from '../models/recinto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RecintoService {

  constructor( private http: HttpClient ) { }

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


  cargarRecintos() {

    const url = `${ base_url }/recintos`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, recintos: Recinto[] }) => resp.recintos )
              );
  }

  cargarRecintosPorDistrito(distrito) {

    const url = `${ base_url }/recintos/distrito/${ distrito }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, recintos: Recinto[] }) => resp.recintos )
              );
  }

  obtenerRecintoPorId( id: string ) {
    //console.log("id-"+id)
    const url = `${ base_url }/recintos/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, recinto: Recinto }) => resp.recinto)
              );
  }


  crearRecinto( recinto: Recinto ) {

    const url = `${ base_url }/recintos`;
    //console.log(recinto);
    return this.http.post( url, recinto, this.headers );
  }
  
  actualizarRecinto( _id: string, nombre: string  ) {

    const url = `${ base_url }/recintos/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarRecinto( _id: string ) {

    const url = `${ base_url }/recintos/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}
