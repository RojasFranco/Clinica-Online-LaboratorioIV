import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-administrador-cabecera',
  templateUrl: './administrador-cabecera.component.html',
  styleUrls: ['./administrador-cabecera.component.css']
})
export class AdministradorCabeceraComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  ProfesionalesPendientes(){
    this.router.navigate(["administrador/pendientes"]);
  }

  ProfesionalesAprobados(){
    this.router.navigate(["administrador/aprobados"]);
  }

  AgregarEspecialidad(){
    this.router.navigate(["administrador/agregar-especialidad"]);
  }

  AgregarAdmin(){
    this.router.navigate(["administrador/alta"]);
  }

  async Salir(){
    await this.auth.Desloguear();
    this.router.navigate(['login']);
  }
}
