import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';

@Component({
  selector: 'app-administrador-turnos',
  templateUrl: './administrador-turnos.component.html',
  styleUrls: ['./administrador-turnos.component.css']
})
export class AdministradorTurnosComponent implements OnInit {

  listadoTurnos: Array<Turno>;
  turnoSeleccionado: Turno;
  textoBuscar: string;
  buscarPor: string;
  puedeBuscar: boolean = false;
  constructor(private cloud: CloudFirestoreService) { }

  async ngOnInit(){
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.listadoTurnos = [];
      snap.forEach(rta=>{
        let aux: string;
        let auxArray: Array<string> = [];
        let mailUsuario: string;
        let turnoAgregar = new Turno();
        turnoAgregar.id = rta.payload.doc.id;
        turnoAgregar.nombre_profesional = rta.payload.doc.get("nombre_profesional");
        turnoAgregar.apellido_profesional = rta.payload.doc.get("apellido_profesional");
        turnoAgregar.nombre_paciente = rta.payload.doc.get("nombre_paciente");
        turnoAgregar.apellido_paciente = rta.payload.doc.get("apellido_paciente");
        turnoAgregar.time = rta.payload.doc.get("time");
        aux = (turnoAgregar.time).toString();
        aux = (new Date(parseInt(aux))).toLocaleString();
        auxArray =aux.split(':');
        auxArray.pop();
        turnoAgregar.fechaMostrar = auxArray.join(':');          
        turnoAgregar.correo_paciente = mailUsuario;
        turnoAgregar.estado = rta.payload.doc.get("estado");
        turnoAgregar.resenia = rta.payload.doc.get("resenia");
        turnoAgregar.encuesta = rta.payload.doc.get("encuesta");
        turnoAgregar.especialidad = rta.payload.doc.get("especialidad");
        this.listadoTurnos.push(turnoAgregar);
      })
    })
  }

  SeleccionarTurno(turno: Turno){
    this.turnoSeleccionado = turno;
  }

  ElegirOpcion(buscarPor: string){
    this.puedeBuscar = true;
    this.buscarPor = buscarPor
    let elegido = document.getElementById(buscarPor);
    elegido.classList.add("active");
    let botones = document.getElementsByName("botonesOpc");
    botones.forEach(rta=>{
      if(rta.id != elegido.id){
        rta.classList.remove("active");
      }
    })
  }

  Buscar(){
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.listadoTurnos = [];
      snap.forEach(rta=>{
        let aux: string;
        let auxArray: Array<string> = [];
        let turnoAgregar = new Turno();
        let datoBuscarBD;
        let bandera = false;
        if(this.textoBuscar){
          if(this.buscarPor=="fecha"){
            let auxTime = new Date(parseInt(rta.payload.doc.get("time")));
            datoBuscarBD = auxTime.toLocaleDateString();
          }
          else{
            datoBuscarBD = rta.payload.doc.get(this.buscarPor);
          }
          if((datoBuscarBD.toLocaleLowerCase()).includes(this.textoBuscar.toLocaleLowerCase())){
            bandera = true;
          }
        }
        else{
          bandera = true;
        }

        if(bandera){
          turnoAgregar.id = rta.payload.doc.id;
          turnoAgregar.nombre_profesional = rta.payload.doc.get("nombre_profesional");
          turnoAgregar.apellido_profesional = rta.payload.doc.get("apellido_profesional");
          turnoAgregar.nombre_paciente = rta.payload.doc.get("nombre_paciente");
          turnoAgregar.apellido_paciente = rta.payload.doc.get("apellido_paciente");
          turnoAgregar.time = rta.payload.doc.get("time");
          aux = (turnoAgregar.time).toString();
          aux = (new Date(parseInt(aux))).toLocaleString();
          auxArray =aux.split(':');
          auxArray.pop();
          turnoAgregar.fechaMostrar = auxArray.join(':');          
          turnoAgregar.estado = rta.payload.doc.get("estado");
          turnoAgregar.resenia = rta.payload.doc.get("resenia");
          turnoAgregar.encuesta = rta.payload.doc.get("encuesta");
          turnoAgregar.especialidad = rta.payload.doc.get("especialidad");
          this.listadoTurnos.push(turnoAgregar);
        }
      })
    })
  }

}
