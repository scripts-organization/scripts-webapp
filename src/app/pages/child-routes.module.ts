import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { RecintosComponent } from './mantenimientos/recintos/recintos.component';
import { DelegadosComponent } from './mantenimientos/delegados/delegados.component';
import { DelegadoComponent } from './mantenimientos/delegado/delegado.component';
import { JeferecintoComponent } from './mantenimientos/jeferecinto/jeferecinto.component';
import { AlcaldeComponent } from './mesas/alcalde/alcalde.component';
import { ValidarAlcaldeComponent } from './validar/validar-alcalde/validar-alcalde.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { titulo: 'Ajustes de cuenta' },
  },
  {
    path: 'buscar/:termino',
    component: BusquedaComponent,
    data: { titulo: 'Busquedas' },
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: { titulo: 'Gráfica #1' },
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil de usuario' },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { titulo: 'ProgressBar' },
  },
  {
    path: 'promesas',
    component: PromesasComponent,
    data: { titulo: 'Promesas' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

  // Mantenimientos
  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: { titulo: 'Matenimiento de Hospitales' },
  },
  {
    path: 'medicos',
    component: MedicosComponent,
    data: { titulo: 'Matenimiento de Medicos' },
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: { titulo: 'Matenimiento de Medicos' },
  },
  {
    path: 'recintos',
    component: RecintosComponent,
    data: { titulo: 'Matenimiento de Recintos' },
  },
  {
    path: 'delegados',
    component: DelegadosComponent,
    data: { titulo: 'Matenimiento de Delegados' },
  },
  {
    path: 'delegado/:id',
    component: DelegadoComponent,
    data: { titulo: 'Matenimiento de Delegado' },
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: { titulo: 'Matenimiento de Usuarios' },
  },
  {
    path: 'jeferecinto',
    component: JeferecintoComponent,
    data: { titulo: 'Registro de Jefes de Recinto' },
  },
  {
    path: 'alcalde',
    component: AlcaldeComponent,
    data: { titulo: 'Mesas Alcalde' },
  },
  {
    path: 'validar-alcalde',
    component: ValidarAlcaldeComponent,
    data: { titulo: 'Validar Alcalde' },
  },

  // Rutas de Admin
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { titulo: 'Matenimiento de Usuarios' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
