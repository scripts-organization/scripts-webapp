import { Component, OnInit, ViewChild } from '@angular/core';
import { MesaAlcalde } from '../../../models/mesaAlcalde.model';

import { MesaAlcaldeService } from '../../../services/mesa-alcalde.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-validar-alcalde',
  templateUrl: './validar-alcalde.component.html',
  styleUrls: ['./validar-alcalde.component.css'],
})
export class ValidarAlcaldeComponent implements OnInit {
  // @ViewChild('agGrid') agGrid: AgGridAngular;

  
  public gridApi;
  public gridColumnApi;

  public defaultColDef;
  public rowSelection;
  public rowClassRules;
  public gridOptions;

  title = 'Mesas Alcalde';
  public cargando: boolean = true;
  public mesasAlcalde: MesaAlcalde[] = [];

  columnDefs = [
    {
      field: 'recinto.nombre',
      sortable: true,
      filter: true,
      minWidth: 400,
    },
    { field: 'codigo', sortable: true, filter: true },
    { field: 'numero', sortable: true, filter: true, headerName:'Nro'},
    // { field: 'habilitados', sortable: true, filter: true },
    { field: 'a_llenada', sortable: true, filter: true , valueFormatter: this.boolFormatter, headerName:'Datos_A', minWidth: 120},
    { field: 'c_llenada', sortable: true, filter: true , valueFormatter: this.boolFormatter, headerName:'Datos_C', minWidth: 120},
    { field: 'fotoenviada' , sortable: true, filter: true, valueFormatter: this.boolFormatter, headerName:'Foto'},
    { field: 'revisadafoto' , sortable: true, filter: true, valueFormatter: this.boolFormatter, minWidth: 150, headerName:'Foto Revisada'},
    { field: 'revisadaacta' , sortable: true, filter: true, valueFormatter: this.boolFormatter, minWidth: 150, headerName:'Acta Revisada'},

    { field: 'observada', sortable: true, filter: true , valueFormatter: this.boolFormatter, minWidth: 200},
    { field: 'a_sumate', sortable: true, filter: true, headerName:'SUMATE' ,minWidth: 120},
    { field: 'a_fpv', sortable: true, filter: true, headerName:'FPV', minWidth: 120 },
    { field: 'a_pdc', sortable: true, filter: true, headerName:'PDC', minWidth: 120 },
    { field: 'a_somos', sortable: true, filter: true, headerName:'SOMOS', minWidth: 120 },
    { field: 'a_mas_ipsp', sortable: true, filter: true, headerName:'MAS', minWidth: 120 },
    { field: 'a_ca', sortable: true, filter: true, headerName:'CA', minWidth: 120 },
    { field: 'a_mts' , sortable: true, filter: true, headerName:'MTS', minWidth: 120},
    { field: 'a_pan_bol', sortable: true, filter: true, headerName:'PAN-BOL', minWidth: 120 },
    { field: 'a_ucs', sortable: true, filter: true, headerName:'UCS', minWidth: 120 },
    { field: 'a_blancos' , sortable: true, filter: true, headerName:'BLANCOS', minWidth: 120},
    { field: 'a_nulos' , sortable: true, filter: true, minWidth: 200, headerName:'NULLOS'},


    // { field: '_id' , sortable: true, filter: true},
  ];

  rowData: MesaAlcalde[];

  constructor(
    private mesaAlcaldeService: MesaAlcaldeService,
    private router: Router
  ) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'single';

    this.rowClassRules = {
      'acta-lista': function (params:any) {
         let a_llenada = params.data.a_llenada;
         let c_llenada = params.data.c_llenada;
         let fotoenviada = params.data.fotoenviada;
         return a_llenada && c_llenada && fotoenviada;
       },
      'foto-revisada': 'data.revisadafoto == true',
      'acta-revisada': 'data.revisadaacta == true',
    };

   
  }

  ngOnInit(): void {
    //this.cargarMesasAlcalde();
    // this.rowData = this.recintos;
   
  }

  cargarMesasAlcalde() {
    this.cargando = true;
    this.mesaAlcaldeService.cargarMesasAlcalde().subscribe((mesasAlcalde) => {
      this.cargando = false;
      this.mesasAlcalde = mesasAlcalde;
      // console.log(mesasAlcalde);
      this.rowData = this.mesasAlcalde;

    });
  }

  cargarDatos() {
    this.cargarMesasAlcalde();
  }

  onGridReady(params) {
    console.log(params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    // this.rowClassRules = {
    //   'rag-green-outer': function(params) { return true; },
    //   'rag-amber-outer': function(params) { return params.data.numero === 2; },
    //   'rag-red-outer': function(params) { return params.data.numero === 3; }
    // };
    
    this.cargarMesasAlcalde();
    
  }

  onSelectionChanged(event) {
    // console.log('onSelectionChanged');
    // var selectedRows = this.gridApi.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].codigo : '';
  }
  onCellDoubleClicked(event) {
    console.log('onSelectionChanged:' + event);
    var selectedRows = this.gridApi.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML =
      selectedRows.length === 1 ? selectedRows[0].codigo : '';

    this.router.navigate(['/dashboard/datos-alcalde', selectedRows[0].codigo]);
  }

  boolFormatter(params) {
    return params.value ? 'Si' : 'No'; 
  }



}
