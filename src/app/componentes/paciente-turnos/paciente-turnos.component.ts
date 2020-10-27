import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-paciente-turnos',
  templateUrl: './paciente-turnos.component.html',
  styleUrls: ['./paciente-turnos.component.css']
})
export class PacienteTurnosComponent implements OnInit {

  mailUsuario: string;
  turnosUsuario: Array<Turno>;
  turnoSeleccionado: Turno;
  puedeCancelar: boolean;
  constructor(private auth: AuthService, private db: ManejadorDbService, private cloud: CloudFirestoreService) { }

  async ngOnInit(){
    this.mailUsuario = (await this.auth.ObtenerActual()).email;
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.turnosUsuario = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("correo_paciente")==this.mailUsuario){
          let turnoAgregar = new Turno();
          turnoAgregar.id = rta.payload.doc.id;
          turnoAgregar.nombre_profesional = rta.payload.doc.get("nombre_profesional");
          turnoAgregar.apellido_profesional = rta.payload.doc.get("apellido_profesional");
          turnoAgregar.nombre_paciente = rta.payload.doc.get("nombre_paciente");
          turnoAgregar.apellido_paciente = rta.payload.doc.get("apellido_paciente");
          turnoAgregar.horario = rta.payload.doc.get("horario");
          turnoAgregar.correo_paciente = this.mailUsuario;
          turnoAgregar.estado = rta.payload.doc.get("estado");
          this.turnosUsuario.push(turnoAgregar);
        }
      })
    })
  }

  ElegirTurno(turno: Turno){
    this.turnoSeleccionado = turno;
    if(this.turnoSeleccionado.estado == "confirmado" || this.turnoSeleccionado.estado =="pendiente"){
      this.puedeCancelar = true;
    }
    else{
      this.puedeCancelar = false;
    }
  }

}
