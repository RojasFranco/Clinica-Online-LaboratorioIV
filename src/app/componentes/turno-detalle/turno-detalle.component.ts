import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent implements OnInit {

  @Input() turno: Turno;
  @Input() puedeCancelar: boolean = false;
  @Input() pedidoProfesionalPendiente: boolean = false;
  constructor(private db: ManejadorDbService) { }

  ngOnInit(): void {
  }

  CancelarTurno(){
    this.db.ActualizarEstadoTurno("cancelado", this.turno.id);
    this.turno = null;
  }

  ConfirmarTurno(){
    this.db.ActualizarEstadoTurno("confirmado", this.turno.id);
    this.turno = null;
  }

  RechazarTurno(){
    this.db.ActualizarEstadoTurno("rechazado", this.turno.id);
    this.turno = null;
  }
}
