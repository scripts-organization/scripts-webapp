import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';
import { Recinto } from '../../../models/recinto.model';
import { MesaAlcalde } from '../../../models/mesaAlcalde.model';


import { MesaAlcaldeService } from '../../../services/mesa-alcalde.service';
import { RecintoService } from '../../../services/recinto.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-alcalde',
  templateUrl: './alcalde.component.html',
  styleUrls: ['./alcalde.component.css'],
})
export class AlcaldeComponent implements OnInit {
  public cargando: boolean = true;
  public usuario: Usuario;
  public recinto: Recinto;
  public mesasAlcalde: MesaAlcalde[] = [];

  constructor(private mesaAlcaldeService: MesaAlcaldeService,
              private recintoService: RecintoService,
              private usuarioService: UsuarioService
    ) {
      this.usuario = usuarioService.usuario;
    }

  ngOnInit(): void {
    this.cargarMesasAlcalde();
    this.cargarRecinto();
    
  }


  cargarMesasAlcalde() {
    this.cargando = true;
    this.mesaAlcaldeService.cargarMesasAlcalde().subscribe((mesasAlcalde) => {
      this.cargando = false;
      this.mesasAlcalde = mesasAlcalde;
      console.log(mesasAlcalde)
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


  cargarFoto(mesa: MesaAlcalde) {

  }
}
