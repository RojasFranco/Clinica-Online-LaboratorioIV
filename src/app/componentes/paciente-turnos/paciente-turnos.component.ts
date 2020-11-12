import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-paciente-turnos',
  templateUrl: './paciente-turnos.component.html',
  styleUrls: ['./paciente-turnos.component.css']
})
export class PacienteTurnosComponent implements OnInit {

  mailUsuario: string;
  turnosUsuario: Array<Turno>;
  turnoSeleccionado: Turno;
  puedeCancelar: boolean;
  puedeCargarEncuesta: boolean = false;
  verResenia: boolean = false;
  aux: string;
  auxArray: Array<string> = [];
  textoBuscar: string;
  buscarPor: string;
  puedeBuscar: boolean = false;
  constructor(private auth: AuthService, private db: ManejadorDbService, private cloud: CloudFirestoreService) { }

  async ngOnInit(){
    this.mailUsuario = (await this.auth.ObtenerActual()).email;
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.turnosUsuario = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("correo_paciente")==this.mailUsuario){
          let turnoAgregar = new Turno();
          turnoAgregar.id = rta.payload.doc.id;
          turnoAgregar.nombre_profesional = rta.payload.doc.get("nombre_profesional");
          turnoAgregar.apellido_profesional = rta.payload.doc.get("apellido_profesional");
          turnoAgregar.nombre_paciente = rta.payload.doc.get("nombre_paciente");
          turnoAgregar.apellido_paciente = rta.payload.doc.get("apellido_paciente");
          turnoAgregar.time = rta.payload.doc.get("time");
          this.aux = (turnoAgregar.time).toString();
          this.aux = (new Date(parseInt(this.aux))).toLocaleString();
          this.auxArray = this.aux.split(':');
          this.auxArray.pop();
          turnoAgregar.fechaMostrar = this.auxArray.join(':');          
          turnoAgregar.correo_paciente = this.mailUsuario;
          turnoAgregar.estado = rta.payload.doc.get("estado");
          turnoAgregar.resenia = rta.payload.doc.get("resenia");
          turnoAgregar.encuesta = rta.payload.doc.get("encuesta");
          turnoAgregar.especialidad = rta.payload.doc.get("especialidad");
          this.turnosUsuario.push(turnoAgregar);
        }
      })
    })
  }

  ElegirTurno(turno: Turno){
    this.turnoSeleccionado = turno;
    if(this.turnoSeleccionado.estado == "confirmado" || this.turnoSeleccionado.estado =="pendiente"){
      this.puedeCancelar = true;
      this.puedeCargarEncuesta = false;
    }
    else if(this.turnoSeleccionado.estado=="atendido"){
      this.puedeCargarEncuesta = true;
      this.puedeCancelar = false;
    }
    else{
      this.puedeCancelar = false;
      this.puedeCargarEncuesta = false;
    }
  }

  Buscar(){
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.turnosUsuario = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("correo_paciente")==this.mailUsuario){
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
            turnoAgregar.correo_paciente = this.mailUsuario;
            this.turnosUsuario.push(turnoAgregar);
          }
        }
      })
    })
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
}
