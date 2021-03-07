import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { MesaAlcalde } from '../../../models/mesaAlcalde.model';

import { MesaAlcaldeService } from '../../../services/mesa-alcalde.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

interface ErrorValidate {
  [s: string]: boolean;
}

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
  private imgSubs: Subscription;

  public alcaldeValidos;
  public concejalValidos;
  public mesaGanada = true;
  public sumaValida = true;


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
    this.enableButton();
    this.cargarMesaAlcalde();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarMesaAlcalde() );

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
      observaciones: [''],
      revisadafoto: ['', Validators.required],
      revisadaacta: ['', Validators.required]
    }, {
      //validators: this.suma()
    });
  }

  enableButton() {
    const users = ['4494336@sumate.com','5253588@sumate.com','9351265@sumate.com','7937567@sumate.com','0012274@sumate.com','7966943@sumate.com'];
    const currentUser = localStorage.getItem('email' );
    const encontrado = users.findIndex(e=>e==currentUser);
    return encontrado >= 0 ? true : false;
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
         img_1, img_2, img_3, observada, revisadafoto, revisadaacta, mesaganada, observaciones } = mesaAlcalde[0]; 
      this.mesaForm.setValue({ codigo, numero, habilitados,
        a_llenada, a_sumate, a_fpv, a_pdc, a_somos, a_mas_ipsp, a_ca, a_mts, a_pan_bol, a_ucs, a_blancos, a_nulos, 
        c_llenada, c_sumate, c_fpv, c_pdc, c_somos, c_mas_ipsp, c_ca, c_mts, c_pan_bol, c_ucs, c_blancos, c_nulos,
        observada, revisadafoto, revisadaacta, observaciones  });

        this.alcaldeValidos = Number(a_sumate) + Number(a_fpv) + Number(a_pdc) + Number(a_somos) + Number(a_mas_ipsp) + Number(a_ca) + Number(a_mts) + Number(a_pan_bol) + Number(a_ucs);
        this.concejalValidos = Number(c_sumate) + Number(c_fpv) + Number(c_pdc) + Number(c_somos) + Number(c_mas_ipsp) + Number(c_ca) + Number(c_mts) + Number(c_pan_bol) + Number(c_ucs);
        this.mesaGanada = mesaganada;

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
    // console.log("this.imgSubs: " + this.imgSubs)
  }
  sum(){
    const { a_sumate, a_fpv, a_pdc, a_somos, a_mas_ipsp, a_ca, a_mts, a_pan_bol, a_ucs, a_blancos, a_nulos,
             c_sumate, c_fpv, c_pdc, c_somos, c_mas_ipsp, c_ca, c_mts, c_pan_bol, c_ucs, c_blancos, c_nulos, habilitados } = this.mesaForm.value;
    this.alcaldeValidos = Number(a_sumate) + Number(a_fpv) + Number(a_pdc) + Number(a_somos) + Number(a_mas_ipsp) + Number(a_ca) + Number(a_mts) + Number(a_pan_bol) + Number(a_ucs);
    this.concejalValidos = Number(c_sumate) + Number(c_fpv) + Number(c_pdc) + Number(c_somos) + Number(c_mas_ipsp) + Number(c_ca) + Number(c_mts) + Number(c_pan_bol) + Number(c_ucs);
    if ( this.alcaldeValidos + Number(a_blancos) + Number(a_nulos) > habilitados ||
         this.concejalValidos + Number(c_blancos) + Number(c_nulos) > habilitados){
          // return false;
          
        this.sumaValida = false;
        //Swal.fire('Error', `se supero el total de habilitados en la mesa`, 'error');
          
    } else {
        this.sumaValida = true;
      // return true;
      // control.setErrors(null);
      
    } 
  }

}

