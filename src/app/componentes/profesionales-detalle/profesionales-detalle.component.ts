import { Component, Input, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-profesionales-detalle',
  templateUrl: './profesionales-detalle.component.html',
  styleUrls: ['./profesionales-detalle.component.css']
})
export class ProfesionalesDetalleComponent implements OnInit {

  @Input() profesional: Profesional;
  @Input() puedeAprobar: boolean;
  claseMjeAprobacion: string;
  MjeAprobacion: string;
  constructor(private db: ManejadorDbService) { }

  ngOnInit(): void {
  }

  async AprobarProfesional(){
    this.profesional.aprobado = true;
    await this.db.ActualizarProfesional(this.profesional);
    this.claseMjeAprobacion =  "alert alert-success";
    this.MjeAprobacion = "Aprobado exitosamente";
    setTimeout(() => {
      this.claseMjeAprobacion = "none";
      this.MjeAprobacion="";
      this.profesional = null;
    }, 3000);    
  }

}
