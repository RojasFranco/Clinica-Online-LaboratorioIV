import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorAltaComponent } from './componentes/administrador-alta/administrador-alta.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { EspecialidadAgregarComponent } from './componentes/especialidad-agregar/especialidad-agregar.component';
import { LoginComponent } from './componentes/login/login.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { ProfesionalNoAprobadoComponent } from './componentes/profesional-no-aprobado/profesional-no-aprobado.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';
import { ProfesionalesListadoAprobadosComponent } from './componentes/profesionales-listado-aprobados/profesionales-listado-aprobados.component';
import { ProfesionalesListadoPendientesComponent } from './componentes/profesionales-listado-pendientes/profesionales-listado-pendientes.component';
import { ProfesionalesListadoComponent } from './componentes/profesionales-listado/profesionales-listado.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from './servicios/auth.guard';
import { ProfesionalGuard } from './servicios/profesional.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},

  {path:'paciente', component: PacienteComponent, canActivate: [AuthGuard]},
  {path: 'profesional', component: ProfesionalComponent, canActivate: [ProfesionalGuard]},

  {path:'administrador', component: AdministradorComponent, canActivate: [AuthGuard],
    children: [
      {path:'agregar-especialidad', component: EspecialidadAgregarComponent},
      {path:'pendientes', component: ProfesionalesListadoPendientesComponent},
      {path: 'aprobados', component: ProfesionalesListadoAprobadosComponent},
      {path: 'alta', component: AdministradorAltaComponent},
  ]},
  {path: 'noAprobado', component: ProfesionalNoAprobadoComponent, canActivate: [AuthGuard]},
  // {path:'administrador', component: AdministradorComponent,
  //   children: [
  //     {path:'agregar-especialidad', component: EspecialidadAgregarComponent},
  //     {path:'pendientes', component: ProfesionalesListadoPendientesComponent},
  //     {path: 'aprobados', component: ProfesionalesListadoAprobadosComponent},
  //     {path: 'alta', component: AdministradorAltaComponent},
  // ]}, 
  // {path:'paciente', component: PacienteComponent},
  // {path: 'profesional', component: ProfesionalComponent},
  {path: '', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
