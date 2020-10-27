import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';

@Component({
  selector: 'app-profesionales-listado-pendientes',
  templateUrl: './profesionales-listado-pendientes.component.html',
  styleUrls: ['./profesionales-listado-pendientes.component.css']
})
export class ProfesionalesListadoPendientesComponent implements OnInit {

  profesionalElegido: Profesional;
  listadoProfesionales: Array<Profesional>;
  constructor(private db: CloudFirestoreService) { 
    this.listadoProfesionales = new Array<Profesional>();
  }

  async ngOnInit(){
    this.db.ObtenerTodosTiempoReal("usuarios").subscribe(snap=>{
      this.listadoProfesionales = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("rol")=="profesional" && !rta.payload.doc.get("aprobado")){
          let profesional = new Profesional();          
          profesional.correo = rta.payload.doc.id;
          profesional.nombre = rta.payload.doc.get("nombre");
          profesional.apellido = rta.payload.doc.get("apellido");
          profesional.especialidades = rta.payload.doc.get("especialidades");
          this.listadoProfesionales.push(profesional);
        }
      });
    });
  }

  ElegirProfesional(profesional: Profesional){
    this.profesionalElegido = profesional;
  }

}
