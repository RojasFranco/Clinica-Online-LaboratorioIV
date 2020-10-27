import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Profesional } from 'src/app/clases/profesional';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-paciente-pedir-turno',
  templateUrl: './paciente-pedir-turno.component.html',
  styleUrls: ['./paciente-pedir-turno.component.css']
})
export class PacientePedirTurnoComponent implements OnInit {

  horarioElegido;
  tipoBusqueda: string;
  tipoEspecialidad: string;
  especialidades: Array<string>;
  especialidadElegida: string;
  apellidoProfesional: string;
  todosLosApellidos: Array<string>;
  paciente: Paciente;

  mostrarError: boolean = false;
  mensajeMostrar: string;
  claseRta: string;
  mensajeRta: string;
  mostrarRta: boolean = false;

  profesionalSeleccionado: Profesional;
  listadoProfesionales: Array<Profesional>;  
  constructor(private cloud: CloudFirestoreService, private db: ManejadorDbService, private auth:AuthService) {
    this.paciente = new Paciente();
   }

  async ngOnInit(){
    let user = await this.auth.ObtenerActual();
    let mailUser = user.email;
    this.cloud.ObtenerUno("usuarios", mailUser).subscribe(rta=>{
      this.paciente.correo = mailUser;
      this.paciente.nombre = rta.get("nombre");
      this.paciente.apellido = rta.get("apellido");
    });

    this.cloud.ObtenerTodosTiempoReal("especialidades").subscribe(snap=>{
      this.especialidades = [];
      snap.forEach(rta=>{
        this.especialidades.push(rta.payload.doc.get("nombre"));
      });
    });
    this.cloud.ObtenerTodosTiempoReal("usuarios").subscribe(snap=>{
      this.todosLosApellidos = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("rol")=="profesional" && rta.payload.doc.get("aprobado")){
          this.todosLosApellidos.push(rta.payload.doc.get("apellido"));
        }
      });
    });  
  }

  Reservar(){       
    this.mostrarRta = true;
    if(this.profesionalSeleccionado && this.horarioElegido){      
      if(this.VerificarHorario(this.horarioElegido)){
        let date = new Date(this.horarioElegido);      
        let turno = new Turno();
        turno.correo_profesional = this.profesionalSeleccionado.correo;
        turno.horario = date;
        turno.nombre_paciente = this.paciente.nombre;
        turno.apellido_paciente = this.paciente.apellido;
        turno.correo_paciente = this.paciente.correo;
        turno.nombre_profesional = this.profesionalSeleccionado.nombre;
        turno.apellido_profesional = this.profesionalSeleccionado.apellido;
        this.db.AgregarTurno(turno);      this.mostrarRta = true;
        this.claseRta = "alert alert-success";
        this.mensajeRta = "Turno solicitado exitosamente";
      }
      else{
        this.claseRta = "alert alert-danger";
        this.mensajeRta = "Nuestro horario es de Lunes a Viernes de 08 a 19, y sabados de 08 a 14hs";
      }

    }
    else{
      this.claseRta = "alert alert-danger";
      this.mensajeRta = "Debe elegir profesional y fecha del turno";
    }
  }

  BuscarProfesionales(){
    this.mostrarError = false;
    if(this.especialidadElegida){
      this.cloud.ObtenerTodosTiempoReal("usuarios").subscribe(snap=>{
        this.listadoProfesionales = [];
        snap.forEach(rta=>{
          let especialidadesProfesional: Array<string>;
          especialidadesProfesional = rta.payload.doc.get("especialidades");        
          if(rta.payload.doc.get("rol")=="profesional" && 
             rta.payload.doc.get("aprobado")==true &&
             especialidadesProfesional.includes(this.especialidadElegida)){
               let profesionalAgregar = this.CompletarProfesional(rta.payload.doc);
               this.listadoProfesionales.push(profesionalAgregar);
          }
        });
      });
    }    
    else if(this.apellidoProfesional){
      this.cloud.ObtenerTodosTiempoReal("usuarios").subscribe(snap=>{
        this.listadoProfesionales = [];
        snap.forEach(rta=>{
          if(rta.payload.doc.get("rol")=="profesional" && 
             rta.payload.doc.get("aprobado")==true &&
             rta.payload.doc.get("apellido")==this.apellidoProfesional){
               let profesionalAgregar = this.CompletarProfesional(rta.payload.doc);
               this.listadoProfesionales.push(profesionalAgregar);
          }
        });
      });
    }
    else{
      this.mostrarError = true;
      this.mensajeMostrar = "Debe elegir las opciones";
    }
  }

  ElegirProfesional(profesionalElegido: Profesional){
    this.profesionalSeleccionado = profesionalElegido;
  }

  CompletarProfesional(rtaPayloadDoc): Profesional{
    let profesionalAgregar = new Profesional();
    profesionalAgregar.correo = rtaPayloadDoc.id;
    profesionalAgregar.nombre = rtaPayloadDoc.get("nombre");
    profesionalAgregar.apellido = rtaPayloadDoc.get("apellido");
    profesionalAgregar.especialidades = rtaPayloadDoc.get("especialidades");
    return profesionalAgregar;
  }

  VerificarHorario(fechaElegida){
    let date = new Date(fechaElegida);
    if(date.getDay()!=0){
      if(date.getDay()==6){
        if(date.getHours()>8 && date.getHours()<14){
          return true;
        }
      }
      else{
        if(date.getHours()>8 && date.getHours()<19){
          return true;
        }
      }
    }
    return false;
  }

}
