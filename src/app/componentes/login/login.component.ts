import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  claseMsje: string;
  mensajeMostrar: string;
  solicitudReenvio: boolean = false;  
  constructor(private auth: AuthService, private db: ManejadorDbService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  async Ingresar(){
    this.solicitudReenvio = false;
    // alert
    if(this.usuario.correo && this.usuario.clave){
      try{
        await this.auth.LoguearUsuario(this.usuario);
        let usuarioActual = await this.auth.ObtenerActual();

        let userIdentificado = (await this.db.ObtenerUsuario(usuarioActual.email)).data();
        let rolUsuario = userIdentificado.rol;

        if(rolUsuario=="paciente"){
          if(await this.auth.VerificoMail()){
            this.router.navigate(['paciente']);
          }
          else{
            this.claseMsje = "alert alert-danger";
            this.mensajeMostrar = "Tiene que validar su cuenta, verifique su casilla de correo";
            this.solicitudReenvio = true;
          }
        }
        else if(rolUsuario=="profesional"){
          this.router.navigate(['profesional']);
        }
        else{ //TODO ADMINISTRADOR
          this.router.navigate(['administrador']);
        }


      }
      catch(error){
        this.claseMsje = "alert alert-danger";
        switch (error.code) {
          case 'auth/invalid-email':
            this.mensajeMostrar = "Ingrese un correo valido"
            break;
          case 'auth/user-not-found':
            this.mensajeMostrar = "Este correo no esta registrado, registrese";
            break;
          case 'auth/wrong-password':
            this.mensajeMostrar = "La contraseña no es correcta"
            break;
          default:
            this.mensajeMostrar = "Error inesperado: "+error.message;
            break;
        }
      }
    }
    else{
      this.claseMsje = "alert alert-danger";
      this.mensajeMostrar = "Complete los campos";
    }
  }

  async ReenviarMail(){
    await this.auth.EnviarMailVerificacion();
    this.solicitudReenvio = false;
  }

  CargarAdmin(){
    this.usuario.correo = "admin@admin.com";
    this.usuario.clave = "clave1234";
  }

  CargarPaciente(){
    this.usuario.correo = "Rojas.Franco.93@gmail.com";
    this.usuario.clave = "clave1234";
  }

  CargarProfesional(){
    this.usuario.correo = "profesional@profesional.com";
    this.usuario.clave = "clave1234";
  }

}
