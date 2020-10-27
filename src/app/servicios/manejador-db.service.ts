import { Injectable } from '@angular/core';
import { Administrador } from '../clases/administrador';
import { Paciente } from '../clases/paciente';
import { Profesional } from '../clases/profesional';
import { Turno } from '../clases/turno';
import { CloudFirestoreService } from './cloud-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ManejadorDbService {

  private coleccionUsuarios: string;
  private especialidades: string;
  private turnos: string;

  constructor(private db: CloudFirestoreService) { 
    this.coleccionUsuarios = "usuarios";
    this.especialidades = "especialidades";
    this.turnos = "turnos";
  }

  AgregarPaciente(paciente: Paciente){
    let pacienteAgregar = {
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      correo: paciente.correo,
      rol: "paciente",
      foto: paciente.foto,
      fotoDos: paciente.fotoDos
    }
    return this.db.AgregarConId(this.coleccionUsuarios, paciente.correo, pacienteAgregar);
  }

  AgregarProfesional(profesional: Profesional){
    let profesionalAgregar = {
      nombre: profesional.nombre,
      apellido: profesional.apellido,
      correo: profesional.correo,
      rol: "profesional",
      aprobado: profesional.aprobado,
      especialidades: profesional.especialidades
    }
    return this.db.AgregarConId(this.coleccionUsuarios, profesional.correo, profesionalAgregar);
  }

  AgregarAdministrador(admin: Administrador){
    let adminAgregar = {
      nombre: admin.nombre,
      apellido: admin.apellido,
      correo: admin.correo,
      rol: "administrador"
    };
    return this.db.AgregarConId(this.coleccionUsuarios, admin.correo, adminAgregar);
  }

  AgregarTurno(turno: Turno){
    let fecha = this.convertDate(turno.horario);
    let hora = this.converHours(turno.horario);
    let turnoAgregar = {
      nombre_paciente: turno.nombre_paciente,
      apellido_paciente: turno.apellido_paciente,
      horario: fecha+' '+hora,
      correo_profesional: turno.correo_profesional,
      correo_paciente: turno.correo_paciente,
      estado: turno.estado,
      nombre_profesional: turno.nombre_profesional,
      apellido_profesional: turno.apellido_profesional,
      duracion: 30,
    };
    return this.db.AgregarSinId(this.turnos, turnoAgregar);
  }

  ActualizarEstadoTurno(nuevoEstado: string, id:string){
    let turnoActualizado = {
      estado: nuevoEstado,
    };
    return this.db.Actualizar(this.turnos, id, turnoActualizado);
  }

  ActualizarProfesional(profesional: Profesional){
    let profesionalActualizado={
      correo: profesional.correo,
      aprobado: profesional.aprobado,
      especialidades: profesional.especialidades
    };
    return this.db.Actualizar(this.coleccionUsuarios, profesional.correo, profesionalActualizado);
  }

  AprobarProfesional(idProfesional: string){
    let profesionalAprobado={
      aprobado: true,
    };
    return this.db.Actualizar(this.coleccionUsuarios, idProfesional, profesionalAprobado);
  }

  ObtenerUsuario(idUsuario: string){
    return this.db.ObtenerUno(this.coleccionUsuarios, idUsuario).toPromise();
  }

  AgregarImagen(file: File){
    return this.db.AgregarImagen(file);
  }
  
  AgregarEspecialidad(nombre: string){
    let datoAgregar = {
      nombre: nombre
    }
    return this.db.AgregarSinId(this.especialidades, datoAgregar);
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }
  converHours(inputFormat){
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getHours()), pad(d.getMinutes())].join(':')
  }
}
