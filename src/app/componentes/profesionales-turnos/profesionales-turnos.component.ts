import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-profesionales-turnos',
  templateUrl: './profesionales-turnos.component.html',
  styleUrls: ['./profesionales-turnos.component.css']
})
export class ProfesionalesTurnosComponent implements OnInit {

  listadoTurnos: Array<Turno>;
  turnoElegido: Turno;
  puedeAtender: boolean = false;
  puedeCancelar: boolean = false;
  puedeCargarResenia: boolean = false;
  resenia: string;
  habilitarFormResenia: boolean = false;
  verEncuesta: boolean = false;
  guardadoExitoso: boolean = false;  
  aux: string;
  auxArray: Array<string> = [];
  constructor(private cloud: CloudFirestoreService, private auth: AuthService, private db: ManejadorDbService) { }

  async ngOnInit(){
    let mailProfesional = (await this.auth.ObtenerActual()).email;
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.listadoTurnos = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("correo_profesional") == mailProfesional &&
           (rta.payload.doc.get("estado")=="confirmado")||rta.payload.doc.get("estado")=="atendido"){
          let turnoAgregar = new Turno();
          turnoAgregar.id = rta.payload.doc.id;
          turnoAgregar.nombre_profesional = rta.payload.doc.get("nombre_profesional");
          turnoAgregar.apellido_profesional = rta.payload.doc.get("apellido_profesional");
          turnoAgregar.nombre_paciente = rta.payload.doc.get("nombre_paciente");
          turnoAgregar.apellido_paciente = rta.payload.doc.get("apellido_paciente");
          turnoAgregar.time = rta.payload.doc.get("time");
          this.aux = (turnoAgregar.time).toString();
          this.aux = (new Date(parseInt(this.aux))).toLocaleString();
          this.auxArray = this.aux.split(':');
          this.auxArray.pop();
          turnoAgregar.fechaMostrar = this.auxArray.join(':');
          turnoAgregar.correo_paciente = mailProfesional;
          turnoAgregar.estado = rta.payload.doc.get("estado");
          turnoAgregar.resenia = rta.payload.doc.get("resenia");
          turnoAgregar.encuesta = rta.payload.doc.get("encuesta");
          this.listadoTurnos.push(turnoAgregar);  
        }
      })
    })
  }

  ElegirTurno(turno: Turno){
    this.turnoElegido = turno;
    if(turno.estado == "atendido"){
      this.puedeAtender = false;
      this.puedeCancelar = false; 
      this.puedeCargarResenia = true;     
    }
    else{
      this.puedeAtender = true;
      this.puedeCancelar = true;
      this.puedeCargarResenia = false;
    }
  }

  CargarFormResenia(){
    this.habilitarFormResenia = true;
  }

  GuardarResenia(){
    let guardar = {
      resenia: this.resenia
    };
    this.cloud.Actualizar("turnos", this.turnoElegido.id, guardar);    
    this.guardadoExitoso = true;
  }

  VerEncuesta(turno: Turno){
    if(turno.encuesta){
      // MOSTRAR ENCUESTA
    }
    else{
      //  INFORMAR QUE NO HAY CARGADA
    }
  }
}
