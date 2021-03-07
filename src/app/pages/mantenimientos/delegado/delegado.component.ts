import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Recinto } from '../../../models/recinto.model';
import { Delegado } from '../../../models/delegado.model';

import { RecintoService } from '../../../services/recinto.service';
import { DelegadoService } from '../../../services/delegado.service';
import { UsuarioService } from '../../../services/usuario.service';

import { delay } from 'rxjs/operators';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-delegado',
  templateUrl: './delegado.component.html',
  styleUrls: ['./delegado.component.css']
})
export class DelegadoComponent implements OnInit {

  public delegadoForm: FormGroup;
  public recintos: Recinto[] = [];
  
  public usuarioSeleccionado: Usuario;
  public recintoSeleccionado: Recinto;


  constructor( private fb: FormBuilder,
    private recintoService: RecintoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

    ngOnInit(): void {
      this.activatedRoute.params
          .subscribe( ({ id }) => this.cargarUsuario( id ) );
  
      this.delegadoForm = this.fb.group({
        nombre: ['', Validators.required ],
        ci: ['', Validators.required],
        celular: ['', Validators.required],
        email: ['',],
        recinto: ['',  ],
      });
  
      //this.cargarRecintos();
  
      // this.delegadoForm.get('recinto').valueChanges
      //     .subscribe( recintoId => {
      //       this.recintoSeleccionado = this.recintos.find( h => h._id === recintoId );
      //     })
    }


    cargarUsuario(id: string) {

      if ( id === 'nuevo' ) {
        return;
      }
       this.usuarioService.obtenerUsuarioPorId( id )
        .pipe(
          delay(100)
        )
        .subscribe( usuario => {
  
          if ( !usuario ) {
            return this.router.navigateByUrl(`/dashboard/delegados`);
          }
  
          const { nombre, ci, celular, email, recinto:{ _id } } = usuario; 
          this.usuarioSeleccionado = usuario;
          this.delegadoForm.setValue({ nombre,ci,celular,email,recinto: _id });
        });
  
    }

    // cargarRecintos() {

    //   this.recintoService.cargarRecintos()
    //     .subscribe( (recintos: Recinto[]) => {
    //       this.recintos = recintos;
    //     })
  
    // }

   

    guardarUsuario() {

      const { nombre } = this.delegadoForm.value;
  
      if ( this.usuarioSeleccionado ) {
        // actualizar
        const data = {
          ...this.delegadoForm.value,
          password: this.delegadoForm.value.ci,
          email: this.delegadoForm.value.ci,
          uid: this.usuarioSeleccionado.uid,
          _id: this.usuarioSeleccionado.uid
        }
       
        this.usuarioService.guardarUsuario( data )
          .subscribe( resp => {
            Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
          })
  
      } 
      // else {
      //   // crear
        
      //   this.delegadoService.crearDelegado( this.delegadoForm.value )
      //       .subscribe( (resp: any) => {
      //         Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
      //         this.router.navigateByUrl(`/dashboard/delegado/${ resp.delegado._id }`)
      //     })
      // }
  
  
  
    }
  



}
