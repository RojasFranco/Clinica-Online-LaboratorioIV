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

  // NUEVOS
  horaInicio= 8;
  horaFin= 18;
  fechasMostrar = [];
  horariosMostrar: Array<{hora: string, time: number}> = [];
  dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  horariosOcupados: Array<string>;
  horariosLibres: Array<number> = [];
  fechaElegida: string;
  horarioTimeElegido: number;
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
    if(this.profesionalSeleccionado){
      if(this.horarioTimeElegido){
        let elementoAgregar = {
        correo_paciente: this.paciente.correo,
        correo_profesional: this.profesionalSeleccionado.correo,
        time: this.horarioTimeElegido,
        nombre_paciente: this.paciente.nombre,
        apellido_paciente: this.paciente.apellido,
        estado: "pendiente",
        nombre_profesional: this.profesionalSeleccionado.nombre,
        apellido_profesional: this.profesionalSeleccionado.apellido,
        };
        this.cloud.AgregarSinId("turnos", elementoAgregar);
        this.claseRta = "alert alert-success";
        this.mensajeRta = "Turno solicitado exitosamente";
        setTimeout(() => {
          this.mostrarRta = false;
          this.claseRta = "";
          this.mensajeRta = "";
          this.profesionalSeleccionado = null;
          this.fechaElegida = null;
          this.tipoBusqueda = null;
          this.listadoProfesionales = null;
        }, 3000);
      }
      else{
        this.claseRta = "alert alert-danger";
        this.mensajeRta = "Debe elegir el dia y horario";
      }        

    }
    else{
      this.claseRta = "alert alert-danger";
      this.mensajeRta = "Primero debe elegir un profesional";
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
    if(this.profesionalSeleccionado.franja){
      this.horaInicio = parseInt(this.profesionalSeleccionado.franja[0]);
      this.horaFin = parseInt(this.profesionalSeleccionado.franja[1]);
      this.dias = this.profesionalSeleccionado.dias;
    }
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.horariosOcupados = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("correo_profesional")==this.profesionalSeleccionado.correo){          
          let horarioOcupado = new Date(parseInt(rta.payload.doc.get("time")));
          this.horariosOcupados.push(horarioOcupado.toLocaleString());
        };
      });
      this.CargarHsLibres();
      this.CargarFechasMostrar();
    });
  }

  CompletarProfesional(rtaPayloadDoc): Profesional{
    let profesionalAgregar = new Profesional();
    profesionalAgregar.correo = rtaPayloadDoc.id;
    profesionalAgregar.nombre = rtaPayloadDoc.get("nombre");
    profesionalAgregar.apellido = rtaPayloadDoc.get("apellido");
    profesionalAgregar.especialidades = rtaPayloadDoc.get("especialidades");
    profesionalAgregar.franja = rtaPayloadDoc.get("franja");
    profesionalAgregar.dias = rtaPayloadDoc.get("dias");

    return profesionalAgregar;
  }

  CargarHsLibres(){
    let diaActual = new Date();
    for (let index = 0; index < 15; index++) {
      let nuevoDiaNumber = diaActual.setDate(diaActual.getDate()+1);
      let nuevoDia = new Date(nuevoDiaNumber);
      nuevoDia.setHours(this.horaInicio, 0, 0);
      if(nuevoDia.getDay()==6){
        if(this.dias.includes("sabados")){
          for (let index = 8; index < 14; index++) {            
            nuevoDia.setHours(index,0);
            if(!this.horariosOcupados.includes(nuevoDia.toLocaleString())){
              this.horariosLibres.push(nuevoDia.getTime());
            }
          }
        }
      }
      else if(nuevoDia.getDay()!=0){
        for (let index = this.horaInicio; index < this.horaFin; index++) {          
          nuevoDia.setHours(index,0);
          if(!this.horariosOcupados.includes(nuevoDia.toLocaleString())){
            this.horariosLibres.push(nuevoDia.getTime());
          }
        }
      }
    }
  }

  ElegirDia(fechaString: string){
    this.horariosMostrar = [];
    this.horariosLibres.forEach(element => {
      let date = new Date(element);
      let fecha = date.toLocaleDateString();
      if(fechaString==fecha){        
        let aux = date.toLocaleTimeString().split(':');
        aux.pop();
        this.horariosMostrar.push({
          hora: aux.join(':'),
          time: date.getTime(),
        });
      }
    });
  }

  CargarFechasMostrar(){
    this.horariosLibres.forEach(element => {
      let date = new Date(element);
      let fecha = date.toLocaleDateString();
      if(!this.fechasMostrar.includes(fecha)){
        this.fechasMostrar.push(fecha);
      }
    });
  }

}
