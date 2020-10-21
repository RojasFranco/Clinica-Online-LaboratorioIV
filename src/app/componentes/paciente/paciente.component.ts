import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit{

  // usuarioActual;
  // fotoPpal: string;
  // fotoDos: string;
  // fotoActual: string;
  constructor(private auth: AuthService, private db: ManejadorDbService) { }

  async ngOnInit(){
    // let userActual = await this.auth.ObtenerActual();
    //  this.usuarioActual= (await this.db.ObtenerUsuario(userActual.email)).data();
    //  this.fotoPpal = this.usuarioActual.foto;
    //  this.fotoDos = this.usuarioActual.fotoDos;
    //  this.fotoActual = this.fotoPpal;
  }

}
