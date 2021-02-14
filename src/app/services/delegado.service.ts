import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Delegado } from '../models/delegado.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DelegadoService {

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

  cargarDelegados() {

    const url = `${ base_url }/delegados`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, delegados: Delegado[] }) => resp.delegados )
              );
  }

  
  cargarDelegadosPorRecinto(idRecinto: string) {
    const url = `${ base_url }/delegados/recinto/${ idRecinto }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, delegados: Delegado[] }) => resp.delegados )
              );
  }


  obtenerDelegadoPorId( id: string ) {

    const url = `${ base_url }/delegados/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, delegado: Delegado }) => resp.delegado )
              );
  }

  crearDelegado( delegado: Delegado ) {

    const url = `${ base_url }/delegados`;
    return this.http.post( url, delegado, this.headers );
  }
  
  actualizarDelegado( delegado: Delegado  ) {

    const url = `${ base_url }/delegados/${ delegado._id }`;
    return this.http.put( url, delegado, this.headers );
  }

  borrarDelegado( _id: string ) {

    const url = `${ base_url }/delegados/${ _id }`;
    return this.http.delete( url, this.headers );
  }



}
