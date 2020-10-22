import { Injectable } from '@angular/core';
import { Administrador } from '../clases/administrador';
import { Paciente } from '../clases/paciente';
import { Profesional } from '../clases/profesional';
import { CloudFirestoreService } from './cloud-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ManejadorDbService {

  private coleccionUsuarios: string;
  private especialidades: string;

  constructor(private db: CloudFirestoreService) { 
    this.coleccionUsuarios = "usuarios";
    this.especialidades = "especialidades";
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
}
