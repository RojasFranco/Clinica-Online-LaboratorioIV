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

  // chart = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Grafico'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //   ]
  // });
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
      // this.chart.addSeries({type: "column" ,data: [22,88]}, true, true);
    })
  }

  DescargarPdf(){
    const doc = new jsPDF({
    });    
    autoTable(doc, {html: '#table'});
    doc.save("turnos-dias-"+(new Date()).toLocaleDateString()+".pdf");
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
