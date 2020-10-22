import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-profesionales-listado-pendientes',
  templateUrl: './profesionales-listado-pendientes.component.html',
  styleUrls: ['./profesionales-listado-pendientes.component.css']
})
export class ProfesionalesListadoPendientesComponent implements OnInit {

  profesionalElegido: Profesional;
  constructor() { }

  ngOnInit(): void {
  }

  ElegirProfesional(profesional: Profesional){
    this.profesionalElegido = profesional;
  }

}
