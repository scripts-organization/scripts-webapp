import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { Recinto } from '../../../models/recinto.model';
import { Usuario } from '../../../models/usuario.model';



import { UsuarioService } from '../../../services/usuario.service';
import { RecintoService } from '../../../services/recinto.service';


@Component({
  selector: 'app-jeferecinto',
  templateUrl: './jeferecinto.component.html',
  styleUrls: ['./jeferecinto.component.css']
})
export class JeferecintoComponent implements OnInit {

  public gridApi;
  public gridColumnApi;

  public defaultColDef;
  public rowSelection;
  public rowClassRules;
  public gridOptions;

  title = 'Recintos';
  public cargando: boolean = true;
  public recintos: Recinto[] = [];


  public usuarios: Usuario[] = [];
  public nuevosUsuarios: Usuario[] = [];

  
  public recintoSeleccionado: Recinto;
  public jefeSeleccionado: Usuario;
  public formSubmitted = false;


  columnDefs = [
    { field: 'nombre', sortable: true, filter: true, minWidth: 400 },
    { field: 'cantidadmesas', sortable: true, filter: true },
    { field: 'distrito', sortable: true, filter: true},
  ];

  rowData: Recinto[];

  // public registerForm = this.fb.group({
  //   nombre: ['', Validators.required ],
  //   email: ['', [ Validators.required, Validators.email ] ],
  //   password: ['', Validators.required ],
  //   ci: ['', Validators.required ],
  //   celular: ['', Validators.required ],
  //   recinto: ['', Validators.required ]
  // }, {
  //   validators: this.passwordsIguales('password', 'ci')
  // });

  constructor( private fb: FormBuilder,
               private recintoService: RecintoService,
               private usuarioService: UsuarioService,
               private router: Router ) {

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'single';
    this.rowClassRules = {
      
    };

  }


  ngOnInit(): void {
    // this.cargarRecintos();
    // this.cargarUsuarios();
    //   this.registerForm.get('recinto').valueChanges
    //         .subscribe( recintoId => {
    //           this.recintoSeleccionado = this.recintos.find( h => h._id === recintoId );
    //           this.nuevosUsuarios = this.usuarios.filter(u=>u.recinto !== undefined);
    //           this.jefeSeleccionado = this.nuevosUsuarios.find( u => (u.recinto._id && u.recinto._id === recintoId));
    //           // .find( u => (u.recinto._id && u.recinto._id === recintoId));
    //           // console.log("jefe");
              
    //           // console.log(this.jefeSeleccionado)
    //         })
    //   console.log(this.recintoSeleccionado);
  }

  // crearUsuario() {
  //   this.formSubmitted = true;
  //   console.log( this.registerForm.value );

  //   if ( this.registerForm.invalid ) {
  //     return;
  //   }

  //   // Realizar el posteo
  //   this.usuarioService.crearUsuario( this.registerForm.value )
  //       .subscribe( resp => {
          
  //         // Navegar al Dashboard
  //         this.router.navigateByUrl('dashboard/usuarios');

  //       }, (err) => {
  //         // Si sucede un error
  //         Swal.fire('Error', err.error.msg, 'error' );
  //       });


  // }

  // campoEsValido( campo: string ) {
  //   return this.registerForm.controls[campo].errors 
  //           && this.registerForm.controls[campo].touched;
  // }

  // contrasenasNoValidas(campo1: string, campo2: string) {
  //   const pass1 = this.registerForm.controls[campo1].value
  //   const pass2 = this.registerForm.controls[campo2].value
 

  //   if ( (pass1 !== pass2) && this.registerForm.controls[campo2].touched ) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

  // aceptaTerminos() {
  //   return !this.registerForm.get('terminos').value && this.formSubmitted;
  // }

  // passwordsIguales(pass1Name: string, pass2Name: string ) {

  //   return ( formGroup: FormGroup ) => {

  //     const pass1Control = formGroup.get(pass1Name);
  //     const pass2Control = formGroup.get(pass2Name);

  //     if ( pass1Control.value === pass2Control.value ) {
  //       pass2Control.setErrors(null)
  //     } else {
  //       pass2Control.setErrors({ noEsIgual: true })
  //     }


  //   }
  // }

  cargarRecintos() {
    this.cargando = true;
    this.recintoService.cargarRecintos()
      .subscribe( (recintos: Recinto[]) => {
        this.cargando = false;
        this.recintos = recintos;
        this.rowData = this.recintos;
      })
  }

  onGridReady(params) {
    //console.log(params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi; 
    this.cargarRecintos();
    
  }

  onCellDoubleClicked(event) {
    //console.log('onSelectionChanged:' + event);
    var selectedRows = this.gridApi.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].codigo : '';

    this.router.navigate(['/dashboard/delegados', selectedRows[0]._id]);
  }

  boolFormatter(params) {
    return params.value ? 'Si' : 'No'; 
  }



  // cargarUsuarios() {
  //   this.usuarioService.cargarUsuarios( 0 )
  //     .subscribe( ({ total, usuarios }) => {
  //       this.usuarios = usuarios;
  //       console.log(usuarios);
  //   })
  // }


}
