import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { GenerarExcelService } from 'src/app/servicios/generar-excel.service';

@Component({
  selector: 'app-informes-especialidades',
  templateUrl: './informes-especialidades.component.html',
  styleUrls: ['./informes-especialidades.component.css']
})
export class InformesEspecialidadesComponent implements OnInit {

  listadoPedido: Array<{
    especialidad: string,
    cantidad: number
  }>;
  constructor(private cloud: CloudFirestoreService, private manejadorExcel: GenerarExcelService) { }

  ngOnInit(): void {
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.listadoPedido = [];
      snap.forEach(rta=>{
        let especialidad = rta.payload.doc.get("especialidad");
        
        let bandera = false;
          this.listadoPedido.forEach(element => {
            if(element.especialidad==especialidad){
              element.cantidad+=1;
              bandera = true;
            }
          });
          if(!bandera){
            this.listadoPedido.push({especialidad: especialidad, cantidad: 1});
          }
      });          
      console.log(this.listadoPedido);
    })
  }

  DescargarPdf(){
    const doc = new jsPDF({
    });    
    autoTable(doc, {html: '#table'});
    doc.save("especialidades-operaciones-"+(new Date()).toLocaleDateString()+".pdf");
  }

  DescargarExcel(){
    this.manejadorExcel.exportAsExcelFile(this.listadoPedido, "logueo-profesionales");
  }

}
