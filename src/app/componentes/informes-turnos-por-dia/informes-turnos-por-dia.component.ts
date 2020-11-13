import { Component, OnInit } from '@angular/core';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { GenerarExcelService } from 'src/app/servicios/generar-excel.service';
// import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-informes-turnos-por-dia',
  templateUrl: './informes-turnos-por-dia.component.html',
  styleUrls: ['./informes-turnos-por-dia.component.css']
})
export class InformesTurnosPorDiaComponent implements OnInit {
  listaPedida: Array<{
    dia: string,
    cantidad_turnos: number,
  }>;

  constructor(private cloud: CloudFirestoreService, private manejadorExcel: GenerarExcelService) { }

  async ngOnInit(){
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.listaPedida = [];
      snap.forEach(rta=>{
        let aux = rta.payload.doc.get("time");
        let auxDia = (new Date(parseInt(aux))).getDay();
        let dia = this.ObtenerDia(auxDia);
        let bandera=false;
        this.listaPedida.forEach(element => {
          if(element.dia==dia){
            element.cantidad_turnos+=1;
            bandera=true;
          }
        });
        if(!bandera){
          this.listaPedida.push({dia:dia, cantidad_turnos:1});
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
    {data: [], label: 'Dias de la semana'},
  ];

  Graficar(){
    this.listaPedida.forEach(element => {
      this.barChartLabels.push(element.dia);
      this.barChartData[0].data.push(element.cantidad_turnos);
    });
  }

  DescargarPdf(){
    const doc = new jsPDF({
    });    
    autoTable(doc, {html: '#table'});
    doc.save("turnos-dias-"+(new Date()).toLocaleDateString()+".pdf");
    var canvas = document.getElementById('grafico')  as HTMLCanvasElement;
    var context = canvas.getContext('2d');
    var imgData = canvas.toDataURL("image/jpeg", 10.0);
    var pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG",0,0,0,0, "alias", 0);
    pdf.save("grafico"+(new Date()).toLocaleDateString()+".pdf");    
  }

  DescargarExcel(){
    this.manejadorExcel.exportAsExcelFile(this.listaPedida, "logueo-profesionales");
  }

  ObtenerDia(nroDia: number){
    let retorno;
    switch (nroDia) {
      case 0:
        retorno = "domingo";
        break;
      case 1:
        retorno = "lunes";
        break;
      case 2:
        retorno = "martes";
        break;
      case 3:
        retorno = "miercoles";
        break;                         
      case 4:
        retorno = "jueves";
        break;                         
      case 5:
        retorno = "viernes";
         break;                         
      case 6:
        retorno = "sabado";
        break;                                 
      default:
        retorno = "error";
        break;
    }
    return retorno;
  }

}
