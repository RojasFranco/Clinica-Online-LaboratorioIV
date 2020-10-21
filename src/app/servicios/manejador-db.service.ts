import { Injectable } from '@angular/core';
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
      correo: paciente.correo,
      rol: "paciente",
      foto: paciente.foto,
      fotoDos: paciente.fotoDos
    }
    return this.db.AgregarConId(this.coleccionUsuarios, paciente.correo, pacienteAgregar);
  }

  AgregarProfesional(profesional: Profesional){
    let profesionalAgregar = {
      correo: profesional.correo,
      rol: "profesional",
      aprobado: profesional.aprobado,
      especialidades: profesional.especialidades
    }
    return this.db.AgregarConId(this.coleccionUsuarios, profesional.correo, profesionalAgregar);
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
