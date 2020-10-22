import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css']
})
export class ProfesionalComponent implements OnInit {

  profesionalAprobado: boolean;
  constructor(private db: ManejadorDbService, private auth: AuthService) { }

  async ngOnInit(){
    let user = await this.auth.ObtenerActual();
    this.profesionalAprobado = (await this.db.ObtenerUsuario(user.email)).data().aprobado;
  }

}
