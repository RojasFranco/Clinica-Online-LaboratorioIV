import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { GenerarExcelService } from 'src/app/servicios/generar-excel.service';

@Component({
  selector: 'app-informes-profesionales',
  templateUrl: './informes-profesionales.component.html',
  styleUrls: ['./informes-profesionales.component.css']
})
export class InformesProfesionalesComponent implements OnInit {

  listaPedida: Array<Profesional>;
  horarioInicial: Date;
  horarioFinal: Date;
  mostrarMje: boolean = false;
  mensaje: string;
  claseMje: string;
  constructor(private cloud: CloudFirestoreService, private manejadorExcel: GenerarExcelService) { }

  ngOnInit(): void {
  }

  ObtenerLogueados(){
    let dateAuxInicial = (new Date(this.horarioInicial)).getTime();
    let dateAuxFinal = (new Date(this.horarioFinal)).getTime();
    if(dateAuxInicial && dateAuxFinal){
      if(dateAuxInicial<dateAuxFinal){
        this.cloud.ObtenerTodosTiempoReal("login-profesionales").subscribe(snap=>{
          this.listaPedida = [];
          snap.forEach(rta=>{
            let auxHorario = rta.payload.doc.get("hora");
            if(auxHorario<dateAuxFinal && auxHorario>dateAuxInicial){
              let profesional = new Profesional();
              profesional.correo = rta.payload.doc.get("idCorreoProfesional");
              profesional.nombre = rta.payload.doc.get("nombre");;
              profesional.apellido = rta.payload.doc.get("apellido");
              profesional.especialidades = rta.payload.doc.get("especialidades");    
              profesional.aprobado = true;
              let horaLogueoParse = (new Date(parseInt(auxHorario))).toLocaleString().split(':')
              horaLogueoParse.pop();
              profesional.horaLogueo = horaLogueoParse.join(':');
              this.listaPedida.push(profesional);
            }
          });
          if(this.listaPedida.length==0){
            this.mostrarMje = true;
            this.claseMje = "alert alert-info";
            this.mensaje = "No hay profesionales logueados dentro de ese horario";
          }
          else{
            this.mostrarMje = false;
          }
        })
      }
      else{
        this.mostrarMje = true;
        this.claseMje = "alert alert-danger";
        this.mensaje = "La fecha inicial no puede ser mayor a la final";
      }
    }
    else{
      this.mostrarMje = true;
      this.claseMje = "alert alert-danger";
      this.mensaje = "Debe seleccionar fecha inicial y final";
    }
  }

  DescargarPdf(){
    const doc = new jsPDF({
    });    
    autoTable(doc, {html: '#table'});
    doc.save("logueo-profesionales-"+(new Date()).toLocaleDateString()+".pdf");
  }

  DescargarExcel(){
    this.manejadorExcel.exportAsExcelFile(this.listaPedida, "logueo-profesionales");
  }

}
