import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  profesionalesAprobados: boolean = true;
  profesionalesDesaprobados: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  ListarProfesionales(listadoPedido: string){
    if(listadoPedido == "aprobados"){
      this.profesionalesAprobados = true;
      this.profesionalesDesaprobados = false;
    }
    else{
      this.profesionalesAprobados = false;
      this.profesionalesDesaprobados = true;
    }
  }

}
