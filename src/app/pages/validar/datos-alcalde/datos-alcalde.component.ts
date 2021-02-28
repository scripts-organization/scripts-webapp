import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { MesaAlcalde } from '../../../models/mesaAlcalde.model';

import { MesaAlcaldeService } from '../../../services/mesa-alcalde.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';


@Component({
  selector: 'app-datos-alcalde',
  templateUrl: './datos-alcalde.component.html',
  styleUrls: ['./datos-alcalde.component.css']
})
export class DatosAlcaldeComponent implements OnInit {

  public mesaForm: FormGroup;
  public foto = '1';
  public cargando: boolean = true;
  public codigo: string;
  public mesaAlcalde: MesaAlcalde;


  constructor(private fb: FormBuilder,
              private activatedRouted: ActivatedRoute,
              private mesaAlcaldeService: MesaAlcaldeService,
              private router: Router,
              private modalImagenService: ModalImagenService) {

    this.activatedRouted.params.subscribe( params => {
      this.codigo = params.id
      //console.log( params.id );
    });
   }

  ngOnInit(): void {
    this.cargarMesaAlcalde();

    this.mesaForm = this.fb.group({
      codigo: ['', Validators.required],
      numero: ['', Validators.required],
      habilitados: ['', Validators.required],
      a_llenada: ['', Validators.required],
      a_sumate: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_fpv: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_pdc: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_somos: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_mas_ipsp: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_ca: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_mts: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_pan_bol: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_ucs: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_blancos: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      a_nulos: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_llenada: ['', Validators.required],
      c_sumate: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_fpv: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_pdc: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_somos: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_mas_ipsp: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_ca: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_mts: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_pan_bol: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_ucs: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_blancos: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      c_nulos: ['', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.max(220), Validators.min(0)] ],
      observada: ['', Validators.required],
      revisadafoto: ['', Validators.required],
      revisadaacta: ['', Validators.required]
    });
  }


  cargarMesaAlcalde() {
    this.cargando = true;
    this.mesaAlcaldeService.obtenerMesaPorCodigo(this.codigo).pipe(
      delay(500)
    ).subscribe((mesaAlcalde) => {
      if ( !mesaAlcalde ) {
        return this.router.navigateByUrl(`/dashboard/validar-alcalde`);
      }
      this.cargando = false;
      this.mesaAlcalde = mesaAlcalde;
      //console.log("img1: " + this.mesaAlcalde[0].img_1);
    
      
      const { codigo, numero, habilitados, 
         a_llenada, a_sumate, a_fpv, a_pdc, a_somos, a_mas_ipsp, a_ca, a_mts, a_pan_bol, a_ucs, a_blancos, a_nulos,
         c_llenada, c_sumate, c_fpv, c_pdc, c_somos, c_mas_ipsp, c_ca, c_mts, c_pan_bol, c_ucs, c_blancos, c_nulos,
         img_1, img_2, img_3, observada, revisadafoto, revisadaacta} = mesaAlcalde[0]; 
      this.mesaForm.setValue({ codigo, numero, habilitados,
        a_llenada, a_sumate, a_fpv, a_pdc, a_somos, a_mas_ipsp, a_ca, a_mts, a_pan_bol, a_ucs, a_blancos, a_nulos, 
        c_llenada, c_sumate, c_fpv, c_pdc, c_somos, c_mas_ipsp, c_ca, c_mts, c_pan_bol, c_ucs, c_blancos, c_nulos,
        observada, revisadafoto, revisadaacta  });
    });
  }

  validarMesa() {
    const { codigo } = this.mesaForm.value;
  
    if ( this.mesaAlcalde ) {
      // actualizar
      const data = {
        ...this.mesaForm.value,
        _id: this.mesaAlcalde[0]._id
      }
      this.mesaAlcaldeService.actualizarMesaAlcalde( data )
        .subscribe( resp => {
          Swal.fire('Actualizada', `Mesa Alcalde: ${ codigo } actualizada correctamente`, 'success').then(()=>{
            this.router.navigate(['/dashboard/validar-alcalde']);

          })
        })

    } else {
      // crear
        Swal.fire('Error', `${ codigo } no existe`, 'error');
      
    }
  }


  campoEsValido( campo: string ) {
    return this.mesaForm.controls[campo].errors 
            && this.mesaForm.controls[campo].touched;
  }

  resetMesa() {
    Swal.fire({
      title: 'Resetear Mesa?',
      text: `Esta a punto de resetear la Mesa ${ this.codigo }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, resetear',
    }).then((result) => {
      if (result.value) {
        this.mesaAlcaldeService.resetMesa( this.mesaAlcalde[0]._id )
        .subscribe( resp => {
          // console.log("resp: " + resp);
          this.router.navigate(['/dashboard/validar-alcalde']);
        })
      }
    });
  }

  abrirModal() {
    this.modalImagenService.abrirModal('usuarios', this.mesaAlcalde[0]._id );
  }

}
