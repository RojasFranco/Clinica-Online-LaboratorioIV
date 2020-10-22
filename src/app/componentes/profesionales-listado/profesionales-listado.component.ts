import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';

@Component({
  selector: 'app-profesionales-listado',
  templateUrl: './profesionales-listado.component.html',
  styleUrls: ['./profesionales-listado.component.css']
})
export class ProfesionalesListadoComponent implements OnInit {

  @Output() eventoElegirProfesional: EventEmitter<Profesional> = new EventEmitter();
  @Input() aprobados: boolean;
  profesionales: Array<Profesional>;  

  constructor(private db: CloudFirestoreService) { 
    this.profesionales = new Array<Profesional>();
  }

  async ngOnInit(){
    this.db.ObtenerTodosTiempoReal("usuarios").subscribe(snap=>{
      this.profesionales = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("rol")=="profesional" && rta.payload.doc.get("aprobado")==this.aprobados){
          let profesional = new Profesional();          
          profesional.correo = rta.payload.doc.id;
          profesional.nombre = rta.payload.doc.get("nombre");
          profesional.apellido = rta.payload.doc.get("apellido");
          profesional.especialidades = rta.payload.doc.get("especialidades");
          this.profesionales.push(profesional);
        }
      });
    });
  }

  SeleccionarProfesional(profesional: Profesional){
    this.eventoElegirProfesional.emit(profesional);
  }

}
