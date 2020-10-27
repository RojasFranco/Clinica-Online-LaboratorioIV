import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorAltaComponent } from './componentes/administrador-alta/administrador-alta.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { EspecialidadAgregarComponent } from './componentes/especialidad-agregar/especialidad-agregar.component';
import { LoginComponent } from './componentes/login/login.component';
import { PacientePedirTurnoComponent } from './componentes/paciente-pedir-turno/paciente-pedir-turno.component';
import { PacienteTurnosComponent } from './componentes/paciente-turnos/paciente-turnos.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { ProfesionalNoAprobadoComponent } from './componentes/profesional-no-aprobado/profesional-no-aprobado.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';
import { ProfesionalesListadoAprobadosComponent } from './componentes/profesionales-listado-aprobados/profesionales-listado-aprobados.component';
import { ProfesionalesListadoPendientesComponent } from './componentes/profesionales-listado-pendientes/profesionales-listado-pendientes.component';
import { ProfesionalesListadoComponent } from './componentes/profesionales-listado/profesionales-listado.component';
import { ProfesionalesTurnosPendientesComponent } from './componentes/profesionales-turnos-pendientes/profesionales-turnos-pendientes.component';
import { ProfesionalesTurnosComponent } from './componentes/profesionales-turnos/profesionales-turnos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from './servicios/auth.guard';
import { ProfesionalGuard } from './servicios/profesional.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},

  // ESTOS VAN
  {path:'paciente', component: PacienteComponent, canActivate: [AuthGuard],
    children: [
      {path:'pedir-turno', component: PacientePedirTurnoComponent},
      {path: 'turnos', component: PacienteTurnosComponent},
  ]},
  {path: 'profesional', component: ProfesionalComponent, canActivate: [ProfesionalGuard],
    children: [
      {path: 'turnos', component: ProfesionalesTurnosComponent},
      {path: 'turnos-pendientes', component: ProfesionalesTurnosPendientesComponent},
    ]},

  {path:'administrador', component: AdministradorComponent, canActivate: [AuthGuard],
    children: [
      {path:'agregar-especialidad', component: EspecialidadAgregarComponent},
      {path:'pendientes', component: ProfesionalesListadoPendientesComponent},
      {path: 'aprobados', component: ProfesionalesListadoAprobadosComponent},
      {path: 'alta', component: AdministradorAltaComponent},
  ]},
  {path: 'noAprobado', component: ProfesionalNoAprobadoComponent, canActivate: [AuthGuard]},

  
  //    ESTOS PARA PROBAR
  // {path:'administrador', component: AdministradorComponent,
  //   children: [
  //     {path:'agregar-especialidad', component: EspecialidadAgregarComponent},
  //     {path:'pendientes', component: ProfesionalesListadoPendientesComponent},
  //     {path: 'aprobados', component: ProfesionalesListadoAprobadosComponent},
  //     {path: 'alta', component: AdministradorAltaComponent},
  // ]}, 
  // {path:'paciente', component: PacienteComponent,
  //   children: [
  //     {path:'pedir-turno', component: PacientePedirTurnoComponent},
  //     {path: 'turnos', component: PacienteTurnosComponent},
    
  //   ]},
  // {path: 'profesional', component: ProfesionalComponent,
  //   children: [
  //     {path: 'turnos', component: ProfesionalesTurnosComponent},
  //     {path: 'turnos-pendientes', component: ProfesionalesTurnosPendientesComponent},
  //   ]},
  {path: '', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
