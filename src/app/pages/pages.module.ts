import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RecintosComponent } from './mantenimientos/recintos/recintos.component';
import { DelegadosComponent } from './mantenimientos/delegados/delegados.component';
import { DelegadoComponent } from './mantenimientos/delegado/delegado.component';
import { JeferecintoComponent } from './mantenimientos/jeferecinto/jeferecinto.component';
import { AlcaldeComponent } from './mesas/alcalde/alcalde.component';
import { ValidarAlcaldeComponent } from './validar/validar-alcalde/validar-alcalde.component';
import { DatosAlcaldeComponent } from './validar/datos-alcalde/datos-alcalde.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
    RecintosComponent,
    DelegadosComponent,
    DelegadoComponent,
    JeferecintoComponent,
    AlcaldeComponent,
    ValidarAlcaldeComponent,
    DatosAlcaldeComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    AgGridModule.withComponents([])
  ],
})
export class PagesModule {}
