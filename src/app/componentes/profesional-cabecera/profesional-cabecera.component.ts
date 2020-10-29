import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-profesional-cabecera',
  templateUrl: './profesional-cabecera.component.html',
  styleUrls: ['./profesional-cabecera.component.css']
})
export class ProfesionalCabeceraComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  VerTurnos(){
    this.router.navigate(['profesional/turnos']);
  }

  VerTurnosPendientes(){
    this.router.navigate(['profesional/turnos-pendientes']);
  }

  DefinirHorario(){
    this.router.navigate(['profesional/horarios'])
  }

  async Salir(){
    await this.auth.Desloguear();
    this.router.navigate(['login']);
  }

}
