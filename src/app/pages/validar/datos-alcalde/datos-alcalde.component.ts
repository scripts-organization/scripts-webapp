import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';

import { MesaAlcalde } from '../../../models/mesaAlcalde.model';

import { MesaAlcaldeService } from '../../../services/mesa-alcalde.service';

@Component({
  selector: 'app-datos-alcalde',
  templateUrl: './datos-alcalde.component.html',
  styleUrls: ['./datos-alcalde.component.css']
})
export class DatosAlcaldeComponent implements OnInit {

  public mesaForm: FormGroup;
  public cargando: boolean = true;
  public codigo: string;
  public mesaAlcalde: MesaAlcalde;

  constructor(private fb: FormBuilder,
              private activatedRouted: ActivatedRoute,
              private mesaAlcaldeService: MesaAlcaldeService,
              private router: Router) {

    this.activatedRouted.params.subscribe( params => {
      this.codigo = params.id
      console.log( params.id );
    });
   }

  ngOnInit(): void {
    this.cargarMesaAlcalde();

    this.mesaForm = this.fb.group({
      codigo: ['', Validators.required],
      numero: ['', Validators.required],
      habilitados: ['', Validators.required],
      llenada: ['', Validators.required],

    });
  }


  cargarMesaAlcalde() {
    this.cargando = true;
    this.mesaAlcaldeService.obtenerMesaPorCodigo(this.codigo).pipe(
      delay(100)
    ).subscribe((mesaAlcalde) => {
      if ( !mesaAlcalde ) {
        return this.router.navigateByUrl(`/dashboard/validar-alcalde`);
      }
      debugger;
      this.cargando = false;
      this.mesaAlcalde = mesaAlcalde;
      console.log(mesaAlcalde);
    

      const { codigo, numero, habilitados, llenada } = mesaAlcalde[0]; 
      this.mesaForm.setValue({ codigo, numero, habilitados, llenada  });
    });
  }

  validarMesa() {

  }

}
