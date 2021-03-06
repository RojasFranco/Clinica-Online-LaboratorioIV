import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-profesionales-turnos',
  templateUrl: './profesionales-turnos.component.html',
  styleUrls: ['./profesionales-turnos.component.css']
})
export class ProfesionalesTurnosComponent implements OnInit {

  listadoTurnos: Array<Turno>;
  turnoElegido: Turno;
  puedeAtender: boolean = false;
  puedeCancelar: boolean = false;
  puedeCargarResenia: boolean = false;
  resenia: string;
  habilitarFormResenia: boolean = false;
  verEncuesta: boolean = false;
  guardadoExitoso: boolean = false;  
  aux: string;
  auxArray: Array<string> = [];
  textoBuscar: string;
  buscarPor: string;
  puedeBuscar: boolean = false;
  constructor(private cloud: CloudFirestoreService, private auth: AuthService, private db: ManejadorDbService) { }

  async ngOnInit(){
    let mailProfesional = (await this.auth.ObtenerActual()).email;
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.listadoTurnos = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("correo_profesional") == mailProfesional &&
           (rta.payload.doc.get("estado")=="confirmado")||rta.payload.doc.get("estado")=="atendido"){
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
          turnoAgregar.correo_paciente = rta.payload.doc.get("correo_paciente");
          turnoAgregar.estado = rta.payload.doc.get("estado");
          turnoAgregar.resenia = rta.payload.doc.get("resenia");
          turnoAgregar.encuesta = rta.payload.doc.get("encuesta");
          turnoAgregar.correo_profesional = mailProfesional;          
          turnoAgregar.especialidad = rta.payload.doc.get("especialidad");
          this.listadoTurnos.push(turnoAgregar);  
        }
      })
    })
  }

  ElegirTurno(turno: Turno){
    this.turnoElegido = turno;
    if(turno.estado == "atendido"){
      this.puedeAtender = false;
      this.puedeCancelar = false; 
      this.puedeCargarResenia = true;     
    }
    else{
      this.puedeAtender = true;
      this.puedeCancelar = true;
      this.puedeCargarResenia = false;
    }
  }

  CargarFormResenia(){
    this.habilitarFormResenia = true;
  }

  GuardarResenia(){
    let guardar = {
      resenia: this.resenia
    };
    this.cloud.Actualizar("turnos", this.turnoElegido.id, guardar);    
    this.guardadoExitoso = true;
  }

  VerEncuesta(turno: Turno){
    if(turno.encuesta){
      // MOSTRAR ENCUESTA
    }
    else{
      //  INFORMAR QUE NO HAY CARGADA
    }
  }


  async Buscar(){
    let mailProfesional = (await this.auth.ObtenerActual()).email;
    this.cloud.ObtenerTodosTiempoReal("turnos").subscribe(snap=>{
      this.listadoTurnos = [];
      snap.forEach(rta=>{
        if(rta.payload.doc.get("correo_profesional") == mailProfesional &&
        (rta.payload.doc.get("estado")=="confirmado")||rta.payload.doc.get("estado")=="atendido"){
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
            else if(this.buscarPor=="resenia"){
              if(rta.payload.doc.get("estado")=="atendido"){
                let resenia = rta.payload.doc.get("resenia");
                let arrayAux = [];
                arrayAux.push(resenia.temperatura);
                arrayAux.push(resenia.presion);
                arrayAux.push(resenia.edad);
                datoBuscarBD = arrayAux.join(' ');
              }
              else{
                datoBuscarBD="";
              }
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
            turnoAgregar.correo_paciente = rta.payload.doc.get("correo_paciente");
            turnoAgregar.correo_profesional = mailProfesional;
            this.listadoTurnos.push(turnoAgregar);
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
