import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  claseMsje: string;
  mensajeMostrar: string;
  perfiles = ["profesional", "paciente"];
  perfilElegido: string;
  urlPrimerImg: string;
  urlSegundaImg: string;
  // especialidades = ["Odontologia", "Pediatra"];
  especialidades = Array<string>();
  especialidadesElegidas: Array<string>;
  coleccionProfesionales: string;
  coleccionPacientes: string;
  fileFoto: File;
  fileFotoDos: File;
  respuestaCaptcha: string;
  constructor(private auth: AuthService, private db: ManejadorDbService, private cloud: CloudFirestoreService) {
    this.usuario = new Usuario();
    this.especialidadesElegidas = new Array<string>();
   }

  async ngOnInit(){
    this.cloud.ObtenerTodosTiempoReal("especialidades").subscribe(snap=>{
      this.especialidades = [];
      snap.forEach(rta=>{
        let especialidad = rta.payload.doc.get("nombre");
        this.especialidades.push(especialidad);
      })
    });
  }

  async Registrar(){    
    if(this.usuario.correo && this.usuario.clave && this.usuario.nombre && this.usuario.apellido){
      if(this.respuestaCaptcha){
        if(this.perfilElegido=="paciente"){
          if(this.urlPrimerImg && this.urlSegundaImg){
            this.RegistrarFirebase();
          }
          else{
            this.claseMsje = "alert alert-danger";
            this.mensajeMostrar = "Debe cargar dos fotos de perfil";
          }
        }
        else{
          //  PROFESIONAL
          if(this.especialidadesElegidas.length==0){
            this.claseMsje = "alert alert-danger";
            this.mensajeMostrar = "Debe elegir al menos una especialidad";
          }
          else{
            await this.RegistrarFirebase();
          }
        }
      }
      else{
        this.claseMsje = "alert alert-danger";
        this.mensajeMostrar = "Complete el captcha";
      }
    }
    else{
      this.claseMsje = "alert alert-danger";
      this.mensajeMostrar = "Complete todos los campos";
    }
  }

  async RegistrarFirebase(){
    try{
      await this.auth.RegistrarUsuario(this.usuario);      
      let emailUser = (await this.auth.ObtenerActual()).email;
      if(this.perfilElegido=="paciente"){
        await this.auth.EnviarMailVerificacion();
        let paciente = new Paciente();
        let urlFoto = await this.db.AgregarImagen(this.fileFoto);
        let urlFotoDos = await this.db.AgregarImagen(this.fileFotoDos);
        paciente.correo = emailUser;
        paciente.foto = urlFoto;
        paciente.fotoDos = urlFotoDos;
        paciente.nombre = this.usuario.nombre;
        paciente.apellido = this.usuario.apellido;
        this.db.AgregarPaciente(paciente);
        this.mensajeMostrar = "Se envio un email a su correo para confirmar registro, por favor revise su correo";
      }
      else{
        let profesional = new Profesional();
        profesional.correo = emailUser;
        profesional.especialidades = this.especialidadesElegidas;
        profesional.nombre = this.usuario.nombre;
        profesional.apellido = this.usuario.apellido;
        this.db.AgregarProfesional(profesional);
        this.mensajeMostrar = "Cuenta creada exitosamente, solo falta aprobacion de administrador para ejercer";
      }
      this.claseMsje = "alert alert-success";
      
    }
    catch(error){
      this.claseMsje= "alert alert-danger";
      switch (error.code) {
        case 'auth/invalid-email':
          this.mensajeMostrar = "Ingrese un correo electronico valido";
          break;
        case 'auth/weak-password':
          this.mensajeMostrar = "La contraseña debe tener al menos 6 caracteres";
          break;
        case 'auth/email-already-in-use':
          this.mensajeMostrar = "Este mail ya esta registrado, use otro";
          break;
        default:
          this.mensajeMostrar = "Error inesperado: "+error.message;
          break;
      }
    }
  }

  CargaImagen(targetFile){
    this.urlPrimerImg = URL.createObjectURL(targetFile.files[0]);
    let imgPerfil = <HTMLInputElement>document.getElementById("imgPerfil");
    imgPerfil.src = this.urlPrimerImg;
    this.fileFoto = targetFile.files[0];
  }

  CargarAlternativa(targetFile){
    this.urlSegundaImg = URL.createObjectURL(targetFile.files[0]);
    let imgPerfil = <HTMLInputElement>document.getElementById("imgPerfilDos");
    imgPerfil.src = this.urlSegundaImg;
    this.fileFotoDos = targetFile.files[0];
  }

  ElegirCheck(elegido){
    if(elegido.checked){
      this.especialidadesElegidas.push(elegido.value);
    }
    else{
      let posicion = this.especialidadesElegidas.indexOf(elegido.value)
      this.especialidadesElegidas.splice(posicion, 1);
    }
  }

  /* CAPTCHA */
  resolved(captchaResponse: string){
    this.respuestaCaptcha = captchaResponse;
  }
}
