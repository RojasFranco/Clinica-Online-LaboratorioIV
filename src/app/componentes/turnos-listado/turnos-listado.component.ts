import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turnos-listado',
  templateUrl: './turnos-listado.component.html',
  styleUrls: ['./turnos-listado.component.css']
})
export class TurnosListadoComponent implements OnInit {

  @Input() turnos: Array<Turno>;
  @Output() eventoSeleccionarTurno: EventEmitter<Turno> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  SeleccionarTurno(turno: Turno){
    this.eventoSeleccionarTurno.emit(turno);
  }

}
