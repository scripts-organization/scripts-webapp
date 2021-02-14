import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Recinto } from '../../../models/recinto.model';
import { Delegado } from '../../../models/delegado.model';

import { RecintoService } from '../../../services/recinto.service';
import { DelegadoService } from '../../../services/delegado.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-delegado',
  templateUrl: './delegado.component.html',
  styleUrls: ['./delegado.component.css']
})
export class DelegadoComponent implements OnInit {

  public delegadoForm: FormGroup;
  public recintos: Recinto[] = [];
  
  public delegadoSeleccionado: Delegado;
  public recintoSeleccionado: Recinto;


  constructor( private fb: FormBuilder,
    private recintoService: RecintoService,
    private delegadoService: DelegadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

    ngOnInit(): void {
      this.activatedRoute.params
          .subscribe( ({ id }) => this.cargarDelegado( id ) );
  
      this.delegadoForm = this.fb.group({
        nombre: ['', Validators.required ],
        ci: ['', Validators.required],
        celular: ['', Validators.required],
        correo: ['', Validators.email],
        recinto: ['', Validators.required ],
      });
  
      this.cargarRecintos();
  
      this.delegadoForm.get('recinto').valueChanges
          .subscribe( recintoId => {
            this.recintoSeleccionado = this.recintos.find( h => h._id === recintoId );
          })
    }


    cargarDelegado(id: string) {

      if ( id === 'nuevo' ) {
        return;
      }
       this.delegadoService.obtenerDelegadoPorId( id )
        .pipe(
          delay(100)
        )
        .subscribe( delegado => {
  
          if ( !delegado ) {
            return this.router.navigateByUrl(`/dashboard/delegados`);
          }
  
          const { nombre, ci, celular, correo, recinto:{ _id } } = delegado; 
          this.delegadoSeleccionado = delegado;
          this.delegadoForm.setValue({ nombre,ci,celular,correo,recinto: _id });
        });
  
    }

    cargarRecintos() {

      this.recintoService.cargarRecintos()
        .subscribe( (recintos: Recinto[]) => {
          this.recintos = recintos;
        })
  
    }

    guardarDelegado() {

      const { nombre } = this.delegadoForm.value;
  
      if ( this.delegadoSeleccionado ) {
        // actualizar
        const data = {
          ...this.delegadoForm.value,
          _id: this.delegadoSeleccionado._id
        }
        this.delegadoService.actualizarDelegado( data )
          .subscribe( resp => {
            Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
          })
  
      } else {
        // crear
        
        this.delegadoService.crearDelegado( this.delegadoForm.value )
            .subscribe( (resp: any) => {
              Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
              this.router.navigateByUrl(`/dashboard/delegado/${ resp.delegado._id }`)
          })
      }
  
  
  
    }
  



}
