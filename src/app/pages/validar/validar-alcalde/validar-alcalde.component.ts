import { Component, OnInit, ViewChild  } from '@angular/core';
import { MesaAlcalde } from '../../../models/mesaAlcalde.model';


import { MesaAlcaldeService } from '../../../services/mesa-alcalde.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-validar-alcalde',
  templateUrl: './validar-alcalde.component.html',
  styleUrls: ['./validar-alcalde.component.css']
})
export class ValidarAlcaldeComponent implements OnInit {
  // @ViewChild('agGrid') agGrid: AgGridAngular;

  public gridApi;
  public gridColumnApi;

  public defaultColDef;
  public rowSelection;

  title = 'Mesas Alcalde';
  public cargando: boolean = true;
  public mesasAlcalde: MesaAlcalde[] = [];


  columnDefs = [
      { field: 'recinto.nombre', sortable: true, filter: true ,checkboxSelection: true, minWidth: 400},
      { field: 'codigo',sortable: true, filter: true },
      { field: 'numero' },
      { field: 'habilitados' },
      { field: 'llenada',sortable: true, filter: true},
      { field: 'sumate'},
      { field: 'fpv'},
      { field: 'pdc'},
      { field: 'somos'},
      { field: 'mas_ipsp'},
      { field: 'ca'},
      { field: 'mts'},
      { field: 'pan_bol'},
      { field: 'ucs'},
      { field: 'blancos'},
      { field: 'nulos'},
      { field: '_id'},
  ];


  rowData: MesaAlcalde[];
  
  constructor(private mesaAlcaldeService: MesaAlcaldeService,
    private router: Router) {

  this.defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  this.rowSelection = 'single';
               
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

  cargarDatos(){
    this.cargarMesasAlcalde();
  }

  onGridReady(params) {
    console.log(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.cargarMesasAlcalde();
  } 

  onSelectionChanged(event) {
    // console.log('onSelectionChanged');
    // var selectedRows = this.gridApi.getSelectedRows();
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].codigo : '';
  }
  onCellDoubleClicked(event) {
    console.log('onSelectionChanged:'+event);
    var selectedRows = this.gridApi.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML =
      selectedRows.length === 1 ? selectedRows[0].codigo : '';
    
      this.router.navigate(['/dashboard/datos-alcalde', selectedRows[0].codigo ]);
    
  }

}
