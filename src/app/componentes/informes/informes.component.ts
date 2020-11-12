import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Logueos(){
    this.router.navigate(['informes/logueos']);
  }

  PorEspecialidad(){
    this.router.navigate(['informes/especialidad']);
  }

  PorDiaSemana(){
    this.router.navigate(['informes/diaSemana']);
  }

  PorLapsoTiempo(){
    this.router.navigate(['informes/LapsoTiempo']);
  }

  Volver(){
    this.router.navigate(['administrador']);
  }
}
