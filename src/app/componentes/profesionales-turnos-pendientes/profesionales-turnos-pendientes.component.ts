import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-profesionales-turnos-pendientes',
  templateUrl: './profesionales-turnos-pendientes.component.html',
  styleUrls: ['./profesionales-turnos-pendientes.component.css']
})
export class ProfesionalesTurnosPendientesComponent implements OnInit {

  listadoTurnos: Array<Turno>;
  turnoElegido: Turno;
  constructor(private auth: AuthService, private db: ManejadorDbService, private cloud: CloudFirestoreService) { }

  async ngOnInit(){
    let mailProfesional = (await this.auth.ObtenerActual()).email;
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.listadoTurnos = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("correo_profesional") == mailProfesional && rta.payload.doc.get("estado")=="pendiente"){
          let turnoAgregar = new Turno();
          turnoAgregar.id = rta.payload.doc.id;
          turnoAgregar.nombre_profesional = rta.payload.doc.get("nombre_profesional");
          turnoAgregar.apellido_profesional = rta.payload.doc.get("apellido_profesional");
          turnoAgregar.nombre_paciente = rta.payload.doc.get("nombre_paciente");
          turnoAgregar.apellido_paciente = rta.payload.doc.get("apellido_paciente");
          turnoAgregar.horario = rta.payload.doc.get("horario");
          turnoAgregar.correo_paciente = mailProfesional;
          turnoAgregar.estado = rta.payload.doc.get("estado");
          this.listadoTurnos.push(turnoAgregar);          
        }
      })
    })
  }

  ElegirTurno(turno: Turno){
    this.turnoElegido = turno;
  }

}
