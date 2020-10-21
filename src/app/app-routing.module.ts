import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorAltaComponent } from './componentes/administrador-alta/administrador-alta.component';
import { AdministradorProfesionalesPendientesComponent } from './componentes/administrador-profesionales-pendientes/administrador-profesionales-pendientes.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { EspecialidadAgregarComponent } from './componentes/especialidad-agregar/especialidad-agregar.component';
import { LoginComponent } from './componentes/login/login.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';
import { ProfesionalesListadoComponent } from './componentes/profesionales-listado/profesionales-listado.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from './servicios/auth.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  // {path:'paciente', component: PacienteComponent, canActivate: [AuthGuard]},
  // {path: 'profesional', component: ProfesionalComponent, canActivate: [AuthGuard]},
  // {path:'administrador', component: AdministradorComponent, canActivate: [AuthGuard]}
  {path:'paciente', component: PacienteComponent},
  {path: 'profesional', component: ProfesionalComponent},
  {path:'administrador', component: AdministradorComponent,
    children: [
      // {path:'profesionales-listado', component: ProfesionalesListadoComponent},
      {path:'agregar-especialidad', component: EspecialidadAgregarComponent},
      {path:'pendientes', component: AdministradorProfesionalesPendientesComponent},
      {path: 'alta', component: AdministradorAltaComponent},
  ]},
  
  {path: '', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
