import { Component, OnInit } from '@angular/core';
import { parse } from 'path';
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
  horaInicio: string;
  horaFinal: string;
  mailProfesional: string;
  claseMje: string;
  mensaje: string;
  mostrarMje: boolean = false;
  constructor(private auth: AuthService, private cloud: CloudFirestoreService) { 
    this.CargarHorarios();
  }

  async ngOnInit(){
    this.mailProfesional = (await this.auth.ObtenerActual()).email;
    this.cloud.ObtenerUno("usuarios", this.mailProfesional).subscribe(rta=>{
      if(rta.get("dias")){
        this.diasElegidos = rta.get("dias");
        this.horaInicio = rta.get("franja")[0];
        this.horaFinal = rta.get("franja")[1];
        document.getElementsByName("checkDias").forEach(rta=>{
          if(this.diasElegidos.includes((<HTMLInputElement>rta).value)){
            rta.setAttribute("checked", "true");
          }
        })
      }
      else{
        document.getElementsByName("checkDias").forEach(rta=>{
          rta.setAttribute("checked", "true");            
          this.diasElegidos.push((<HTMLInputElement>rta).value);
        })
        this.horaInicio = "8";
        this.horaFinal = "18";
      }
    })
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
        if(parseInt(this.horaInicio)<parseInt(this.horaFinal)){
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
          this.mensaje = "El horario de salida debe ser mayor al de inicio";
        }
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
