import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-profesional-definir-horario',
  templateUrl: './profesional-definir-horario.component.html',
  styleUrls: ['./profesional-definir-horario.component.css']
})
export class ProfesionalDefinirHorarioComponent implements OnInit {

  diasPosibles =  ['lunes', 'martes','miercoles','jueves','viernes'];
  diasElegidos = [];
  horarios: Array<number>;
  horaInicio: number;
  horaFinal: number;
  mailProfesional: string;
  claseMje: string;
  mensaje: string;
  mostrarMje: boolean = false;
  constructor(private auth: AuthService, private cloud: CloudFirestoreService) { 
    this.CargarHorarios();
  }

  async ngOnInit(){
    this.mailProfesional = (await this.auth.ObtenerActual()).email;
  }

  CargarHorarios(){
    this.horarios = [];
    for (let index = 8; index < 19; index++) {
      this.horarios.push(index);      
    }
  }

  ElegirCheck(elegido){
    if(elegido.checked){
      this.diasElegidos.push(elegido.value);
    }
    else{
      let posicion = this.diasElegidos.indexOf(elegido.value)
      this.diasElegidos.splice(posicion, 1);
    }
  }

  Guardar(){
    this.mostrarMje = true;
    if(this.diasElegidos.length>0){
      if(this.horaInicio && this.horaFinal){
        let campoAgregar = {
          dias: this.diasElegidos,
          franja: [this.horaInicio, this.horaFinal],
        };
        this.cloud.Actualizar("usuarios", this.mailProfesional, campoAgregar);
        this.claseMje = "alert alert-success";
        this.mensaje = "Horario guardado correctamente";
      }
      else{
        this.claseMje = "alert alert-danger";
        this.mensaje = "Debe elegir horario de entrada y salida";
      }
    }
    else{
      this.claseMje = "alert alert-danger";
      this.mensaje = "Debe elegir al menos un dia";
    }
  }

}
