import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { CabeceraInicialComponent } from './componentes/cabecera-inicial/cabecera-inicial.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { PacienteHeaderComponent } from './componentes/paciente-header/paciente-header.component';
import { AdministradorCabeceraComponent } from './componentes/administrador-cabecera/administrador-cabecera.component';
import { ProfesionalCabeceraComponent } from './componentes/profesional-cabecera/profesional-cabecera.component';
import { ProfesionalesListadoComponent } from './componentes/profesionales-listado/profesionales-listado.component';
import { ProfesionalesListadoPendientesComponent } from './componentes/profesionales-listado-pendientes/profesionales-listado-pendientes.component';
import { EspecialidadAgregarComponent } from './componentes/especialidad-agregar/especialidad-agregar.component';
import { AdministradorAltaComponent } from './componentes/administrador-alta/administrador-alta.component';
import { ProfesionalesListadoAprobadosComponent } from './componentes/profesionales-listado-aprobados/profesionales-listado-aprobados.component';
import { ProfesionalesDetalleComponent } from './componentes/profesionales-detalle/profesionales-detalle.component';
import { ProfesionalNoAprobadoComponent } from './componentes/profesional-no-aprobado/profesional-no-aprobado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    CabeceraInicialComponent,
    ProfesionalComponent,
    PacienteComponent,
    AdministradorComponent,
    PacienteHeaderComponent,
    AdministradorCabeceraComponent,
    ProfesionalCabeceraComponent,
    ProfesionalesListadoComponent,
    ProfesionalesListadoPendientesComponent,
    EspecialidadAgregarComponent,
    AdministradorAltaComponent,
    ProfesionalesListadoAprobadosComponent,
    ProfesionalesDetalleComponent,
    ProfesionalNoAprobadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
