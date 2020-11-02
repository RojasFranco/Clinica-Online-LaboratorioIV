import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { join } from 'path';
import { Paciente } from 'src/app/clases/paciente';
import { Profesional } from 'src/app/clases/profesional';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';

@Component({
  selector: 'app-manejador-turnos',
  templateUrl: './manejador-turnos.component.html',
  styleUrls: ['./manejador-turnos.component.css']
})
export class ManejadorTurnosComponent implements OnInit {

  @Input() profesional: Profesional = new Profesional();
  @Output() eventoEmitirTime: EventEmitter<number> = new EventEmitter();
  horaInicio= 8;
  horaFin= 18;
  fechasMostrar = [];
  horariosMostrar: Array<{hora: string, time: number}> = [];
  dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  mailUsuario: string;
  horariosOcupados: Array<number>;
  horariosLibres: Array<number> = [];
  fechaElegida: string;
  horarioTimeElegido: number;
  constructor(private cloud: CloudFirestoreService,
              private auth: AuthService) { }

  async ngOnInit(){
    if(this.profesional.franja){
      this.horaInicio = parseInt(this.profesional.franja[0]);
      this.horaFin = parseInt(this.profesional.franja[1]);
      this.dias = this.profesional.dias;
      console.log("PEPE");
      console.log(this.dias);
    }
    this.mailUsuario = this.profesional.correo;
    // this.mailUsuario = "profesional@profesional.com";
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.horariosOcupados = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.id==this.mailUsuario){
          this.horariosOcupados.push(rta.payload.doc.get("time"));
        };
      });
      this.CargarHsLibres();
      this.CargarFechasMostrar();
      console.log(this.horariosLibres);
    })
  }

  CargarHsLibres(){
    let diaActual = new Date();
    for (let index = 0; index < 15; index++) {
      let nuevoDiaNumber = diaActual.setDate(diaActual.getDate()+1);
      let nuevoDia = new Date(nuevoDiaNumber);
      nuevoDia.setHours(this.horaInicio, 0, 0);
      if(nuevoDia.getDay()==6){
        if(this.dias.includes("sabado")){
          for (let index = 8; index < 14; index++) {            
            nuevoDia.setHours(index,0);
            if(!this.horariosOcupados.includes(nuevoDia.getTime())){
              this.horariosLibres.push(nuevoDia.getTime());
            }            
          }
        }
      }
      else if(nuevoDia.getDay()!=0){
        for (let index = this.horaInicio; index < this.horaFin; index++) {          
          nuevoDia.setHours(index,0);
          if(!this.horariosOcupados.includes(nuevoDia.getTime())){
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
        // this.horariosMostrar.push(date);
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

  ElegirTime(){
    this.eventoEmitirTime.emit(this.horarioTimeElegido);
  }
}
