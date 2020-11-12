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
      this.Graficar();
    })
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Dias de la semana'},
    {data: [], label: 'Especialidad'},
  ];

  Graficar(){
    this.listadoPedido.forEach(element => {
      this.barChartLabels.push(element.especialidad);
      this.barChartData[0].data.push(element.cantidad);
    });
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
