import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Delegado } from '../../../models/delegado.model';
import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { DelegadoService } from '../../../services/delegado.service';
import { RecintoService } from '../../../services/recinto.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Recinto } from '../../../models/recinto.model';

@Component({
  selector: 'app-delegados',
  templateUrl: './delegados.component.html',
  styleUrls: ['./delegados.component.css'],
})
export class DelegadosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public delegados: Delegado[] = [];
  private imgSubs: Subscription;
  public usuario: Usuario;
  public recinto: Recinto;
  public isAdmin: boolean = false;

  constructor(
    private delegadoService: DelegadoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
    private usuarioService: UsuarioService,
    private recintoService: RecintoService
  ) {
    this.usuario = usuarioService.usuario;
    console.log('usuario: ' + this.usuario.recinto);
  }

  ngOnInit(): void {
    
    this.cargarDelegados()
    this.cargarRecinto();

    // this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    //   .pipe(delay(100))
    //   .subscribe( img => this.cargarDelegados() );
  }

  ngOnDestroy(): void {
    // this.imgSubs.unsubscribe()
  }

  cargarDelegadosPorRecinto() {
    this.cargando = true;
    this.delegadoService
      .cargarDelegadosPorRecinto(this.usuario.recinto.toString())
      .subscribe((delegados) => {
        this.cargando = false;
        this.delegados = delegados;
      });
  }

  cargarDelegados() {
    this.cargando = true;
    this.delegadoService.cargarDelegados().subscribe((delegados) => {
      this.cargando = false;
      this.delegados = delegados;
    });
  }

  cargarRecinto() {
    this.cargando = true;
    this.recintoService
      .obtenerRecintoPorId(this.usuario.recinto.toString())
      .subscribe((recinto) => {
        this.recinto = recinto;
        this.cargando = false;
      });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      //return this.cargarDelegados();
      return this.cargarDelegadosPorRecinto();
    }
    this.busquedasService.buscar('delegados', termino).subscribe((resp) => {
      this.delegados = resp;
    });
  }

  abrirModal(delegado: Delegado) {
    this.modalImagenService.abrirModal('delegados', delegado._id, delegado.img);
  }

  borrarDelegado(delegado: Delegado) {
    Swal.fire({
      title: '¿Borrar delegado?',
      text: `Esta a punto de borrar a ${delegado.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.delegadoService.borrarDelegado(delegado._id).subscribe((resp) => {
          this.cargarDelegados();
          Swal.fire(
            'Delegado borrado',
            `${delegado.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }
}
