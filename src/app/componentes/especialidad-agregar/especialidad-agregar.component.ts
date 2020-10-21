import { Component, OnInit } from '@angular/core';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-especialidad-agregar',
  templateUrl: './especialidad-agregar.component.html',
  styleUrls: ['./especialidad-agregar.component.css']
})
export class EspecialidadAgregarComponent implements OnInit {

  especialidades: Array<string>;
  nuevaEspecialidad: string;
  mostrarMje: boolean= false;
  mensaje: string;
  claseMje: string;

  constructor(private db: CloudFirestoreService, private manejador: ManejadorDbService) { 
    this.especialidades = new Array<string>();
  }

  async ngOnInit(){
    this.db.ObtenerTodosTiempoReal("especialidades").subscribe(snap=>{
      this.especialidades = [];
      snap.forEach(rta=>{
        this.especialidades.push(rta.payload.doc.get("nombre"));
      })
    });
  }

  Agregar(){
    this.mostrarMje = true;
    if(this.nuevaEspecialidad){
      this.manejador.AgregarEspecialidad(this.nuevaEspecialidad);
      this.claseMje = "alert alert-success";
      this.mensaje = "Especialidad agregada correctamente";
    }
    else{
      this.claseMje = "alert alert-danger";
      this.mensaje = "Complete el nombre"
    }
  }

}
