import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent implements OnInit {

  @Input() turno: Turno;
  @Input() puedeCancelar: boolean = false;
  @Input() pedidoProfesionalPendiente: boolean = false;
  @Input() puedeAtender: boolean = false;
  @Input() puedeCargarResenia: boolean = false;
  @Input() puedeCargarEncuesta: boolean = false;
  @Input() esAdmin: boolean= false;
  edad: string;
  temperatura: string;
  presion: string;
  
  agregadoUno:string;
  txtAgregadoUno: string;
  agregadoDos: string;
  txtAgregadoDos: string;
  agregadoTres: string;
  txtAgregadoTres: string;
  claseMje: string;
  mostrarMje: boolean = false;
  mensaje: string;

  lugar: string;
  atencion: string;
  recomienda: boolean;
  
  cantidadCamposAdicionales = 3;
  campoUno: boolean = false;
  campoDos: boolean = false;
  campoTres: boolean = false;
  constructor(private db: ManejadorDbService, private cloud: CloudFirestoreService) { }

  ngOnInit(): void {
  }

  CancelarTurno(){
    this.db.ActualizarEstadoTurno("cancelado", this.turno.id);
    this.turno = null;
  }

  ConfirmarTurno(){
    this.db.ActualizarEstadoTurno("confirmado", this.turno.id);
    this.turno = null;
  }

  RechazarTurno(){
    this.db.ActualizarEstadoTurno("rechazado", this.turno.id);
    this.turno = null;
  }

  Atender(){
    this.db.ActualizarEstadoTurno("atendido", this.turno.id);
    this.puedeCargarResenia = true;
    this.puedeAtender = false;
    this.puedeCancelar = false;
  }

  VerEncuesta(){
    this.CargarEncuestaActual();
    let inpRange = document.getElementById("range");
    inpRange.setAttribute("disabled", "true");

    let inpslctAt = document.getElementById("slctAt");
    inpslctAt.setAttribute("disabled", "true");

    let inprdioUno = document.getElementById("rdioUno");
    inprdioUno.setAttribute("disabled", "true");

    let inprrdioDos = document.getElementById("rdioDos");
    inprrdioDos.setAttribute("disabled", "true");
  }

  VerResenia(){
    this.CargarReseniaActual();
    let inputEdad = document.getElementById("idEdad");
    inputEdad.setAttribute("readonly", "true");

    let temp = document.getElementById("idTemperatura");
    temp.setAttribute("readonly", "true");

    let presion = document.getElementById("idPresion");
    presion.setAttribute("readonly", "true");
    if(this.campoUno){
      let campUno = document.getElementById("idCampoUno");      
      campUno.setAttribute("readonly", "true");
      let agUno = document.getElementById("idAgUno");
      agUno.setAttribute("readonly", "true");
    }
    if(this.campoDos){
      let campDos = document.getElementById("idCampoDos");
      campDos.setAttribute("readonly", "true");
      let agDos = document.getElementById("idAgDos");
      agDos.setAttribute("readonly", "true");
    }
    if(this.campoTres){
      let campTres = document.getElementById("idCampoTres");
      campTres.setAttribute("readonly", "true");
      let agTres = document.getElementById("idAgTres");
      agTres.setAttribute("readonly", "true");
    }
  }

  CargarReseniaActual(){
    if(this.turno.resenia){
      this.edad = this.turno.resenia["edad"];
      this.temperatura = this.turno.resenia["temperatura"];
      this.presion = this.turno.resenia["presion"];
      for (const key in this.turno.resenia) {
        if(key!="edad"&&key!="temperatura" && key!="presion"){
          this.cantidadCamposAdicionales-=1;        
          if(!this.campoUno){
            this.agregadoUno = key;
            this.txtAgregadoUno = this.turno.resenia[key];
            this.campoUno = true;
          }
          else if(!this.campoDos){
            this.campoDos = true;
            this.agregadoDos = key;
            this.txtAgregadoDos = this.turno.resenia[key];
          }
          else{
            this.campoTres = true;
            this.agregadoTres = key;
            this.txtAgregadoTres = this.turno.resenia[key];
          }
        }
      }
    }
  }

  GuardarResenia(){
    this.mostrarMje = true;
    if(this.edad && this.temperatura && this.presion){
      let turnoActualizado = {
        resenia: {
          edad: this.edad,
          temperatura: this.temperatura,
          presion: this.presion,
        }
      };
      if(this.agregadoUno && this.txtAgregadoUno){
        turnoActualizado.resenia[this.agregadoUno] = this.txtAgregadoUno;
      }
      if(this.agregadoDos && this.txtAgregadoDos){
        // this.turno.resenia.agregadoDos = this.txtAgregadoDos;
        turnoActualizado.resenia[this.agregadoDos] = this.txtAgregadoDos;
      }
      if(this.agregadoTres && this.txtAgregadoTres){
        turnoActualizado.resenia[this.agregadoTres] = this.txtAgregadoTres;
      }
      this.cloud.Actualizar("turnos", this.turno.id, turnoActualizado);
      this.claseMje = "alert alert-success";      
      this.mensaje = "Reseña agregada correctamente";
      setTimeout(() => {
        this.mostrarMje = false;        
      }, 2000);
    }
    else{
      this.claseMje = "alert alert-danger";      
      this.mensaje = "Complete los campos";
    }
  }

  GuardarEncuesta(){
    this.mostrarMje = true;
    if(this.lugar && this.atencion && this.recomienda){
      let encuestaActualizada = {
        encuesta:{
          atencion: this.atencion,
          lugar: this.lugar,
          recomienda: this.recomienda,
        }
      }
      this.cloud.Actualizar("turnos", this.turno.id, encuestaActualizada);
      this.claseMje = "alert alert-success";      
      this.mensaje = "Encuesta agregada correctamente";
      setTimeout(() => {
        this.mostrarMje = false;        
      }, 2000);
    }
    else{
      this.claseMje = "alert alert-danger";      
      this.mensaje = "Complete todas las opciones";
    }
  }

  CargarEncuestaActual(){
    if(this.turno.encuesta){
      this.lugar = this.turno.encuesta.lugar;
      this.atencion = this.turno.encuesta.atencion;
      this.recomienda = this.turno.encuesta.recomienda;
    }
  }

  AgregarCampo(){
    if(this.cantidadCamposAdicionales==3){
      this.cantidadCamposAdicionales-=1;
      this.campoUno = true;
    }
    else if(this.cantidadCamposAdicionales==2){
      this.cantidadCamposAdicionales-=1;
      this.campoDos = true;
    }
    else if(this.cantidadCamposAdicionales==1){
      this.cantidadCamposAdicionales-=1;
      this.campoTres = true;
    }
    else{
      this.mensaje = "No puede agregar mas campos";
      this.claseMje = "alert alert-danger";
      this.mostrarMje = true;
    }
  }
}
