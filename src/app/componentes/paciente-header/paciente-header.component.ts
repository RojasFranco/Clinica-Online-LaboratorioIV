import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-paciente-header',
  templateUrl: './paciente-header.component.html',
  styleUrls: ['./paciente-header.component.css']
})
export class PacienteHeaderComponent implements OnInit {

  usuarioActual;
  fotoPpal: string;
  fotoDos: string;
  fotoActual: string;
  constructor(private auth: AuthService, private db: ManejadorDbService, private router: Router) { }

  async ngOnInit(){
    let userActual = await this.auth.ObtenerActual();
    this.usuarioActual= (await this.db.ObtenerUsuario(userActual.email)).data();
    this.fotoPpal = this.usuarioActual.foto;
    this.fotoDos = this.usuarioActual.fotoDos;
    this.fotoActual = this.fotoPpal;
  }

  CambiarFoto(){
    if(this.fotoActual==this.fotoPpal){
      this.fotoActual = this.fotoDos;
    }
    else{
      this.fotoActual = this.fotoPpal;
    }
  }

  async Salir(){
    await this.auth.Desloguear();
    this.router.navigate(['login']);
  }

}
