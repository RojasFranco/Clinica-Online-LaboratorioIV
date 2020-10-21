import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  ObtenerActual(){
    return this.auth.currentUser;
  }

  RegistrarUsuario(usuario: Usuario){
    return this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.clave);
  }

  LoguearUsuario(usuario: Usuario){
    return this.auth.signInWithEmailAndPassword(usuario.correo, usuario.clave);
  }

  Desloguear(){
    return this.auth.signOut();
  }

  async EnviarMailVerificacion(){
    return (await this.auth.currentUser).sendEmailVerification();
  }

  async VerificoMail(){
    return (await this.auth.currentUser).emailVerified;
  }
}
