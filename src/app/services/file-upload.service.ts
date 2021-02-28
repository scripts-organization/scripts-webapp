import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

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

  actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales'|'recintos'|'delegados',
    id: string
  ) {

    // try {

      const url = `${ base_url }/mesa_alcalde/foto/${ id }`;
      const formData = new FormData();
      formData.append('images', archivo[0]);
      formData.append('images', archivo[1]);
      formData.append('images', archivo[2]);

      return this.http.put( url, formData ,this.headers )
      // const resp = await fetch( url, {
      //   method: 'PUT',
      //   headers: {
      //     'x-token': localStorage.getItem('token') || ''
      //   },
      //   body: formData
      // });

      // const data = await resp.json();

      // if ( data.ok ) {
      //   return data.nombreArchivo;
      // } else {
      //   console.log(data.msg);
      //   return false;
      // }
      
    // } catch (error) {
    //   console.log(error);
    //   return false;    
    // }

  }



}
