import { Component, OnInit } from '@angular/core';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { GenerarExcelService } from 'src/app/servicios/generar-excel.service';

@Component({
  selector: 'app-informes-medicos-turnos',
  templateUrl: './informes-medicos-turnos.component.html',
  styleUrls: ['./informes-medicos-turnos.component.css']
})
export class InformesMedicosTurnosComponent implements OnInit {

  listaPedida: Array<{
    medico: string,
    cantidad_turnos: number,
    idMedico: string
  }>;
  horarioInicial: Date;
  horarioFinal: Date;
  nombreMedico: string;
  apellidoMedico: string;
  mostrarMje: boolean = false;
  mensaje: string;
  claseMje: string;
  constructor(private cloud: CloudFirestoreService, private manejadorExcel: GenerarExcelService) { }

  ngOnInit(){}

  ObtenerMedicos(){
    let dateAuxInicial = (new Date(this.horarioInicial)).getTime();
    let dateAuxFinal = (new Date(this.horarioFinal)).getTime();
    if(dateAuxInicial && dateAuxFinal){
      if(dateAuxInicial<dateAuxFinal){
        this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
          this.listaPedida = [];
          snap.forEach(rta=>{            
            let mailUsuario = rta.payload.doc.get("correo_profesional");
            this.nombreMedico = rta.payload.doc.get("nombre_profesional");
            this.apellidoMedico = rta.payload.doc.get("apellido_profesional")
            let auxHorario = rta.payload.doc.get("time");
            console.log((new Date(auxHorario)).getDate());
            let bandera= false;
            if(auxHorario<dateAuxFinal && auxHorario>dateAuxInicial){
              this.listaPedida.forEach(element => {
                if(element.idMedico==mailUsuario){
                  element.medico = this.nombreMedico+' '+this.apellidoMedico;
                  element.cantidad_turnos+=1;
                  bandera = true;
                }
              });
              if(!bandera){
                this.listaPedida.push({idMedico: mailUsuario, medico: this.nombreMedico+' '+this.apellidoMedico, cantidad_turnos:1});
              }
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
