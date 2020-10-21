import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador-cabecera',
  templateUrl: './administrador-cabecera.component.html',
  styleUrls: ['./administrador-cabecera.component.css']
})
export class AdministradorCabeceraComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ProfesionalesPendientes(){
    this.router.navigate(["administrador/pendientes"]);
  }

  ProfesionalesAprobados(){
    // this.router.navigate(["administrador/aprobados"]);
  }

  AgregarEspecialidad(){
    this.router.navigate(["administrador/agregar-especialidad"]);
  }

  AgregarAdmin(){
    this.router.navigate(["administrador/alta"]);
  }
}
