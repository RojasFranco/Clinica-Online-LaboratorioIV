import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { ManejadorDbService } from 'src/app/servicios/manejador-db.service';

@Component({
  selector: 'app-administrador-alta',
  templateUrl: './administrador-alta.component.html',
  styleUrls: ['./administrador-alta.component.css']
})
export class AdministradorAltaComponent implements OnInit {

  usuario: Usuario;
  claseMsje: string;
  mensajeMostrar: string;
  constructor(private auth: AuthService, private db: ManejadorDbService) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
  }

  async Agregar(){    
    if(this.usuario.correo && this.usuario.clave && this.usuario.nombre && this.usuario.apellido){
      try{
        await this.auth.RegistrarUsuario(this.usuario);
        let adminNuevo = new Administrador();
        adminNuevo.nombre = this.usuario.nombre;
        adminNuevo.apellido = this.usuario.apellido;
        adminNuevo.correo = this.usuario.correo;
        this.db.AgregarAdministrador(adminNuevo);
        this.mensajeMostrar = "Administrador creado exitosamente";
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
    else{
      this.claseMsje = "alert alert-danger";
      this.mensajeMostrar = "Complete todos los campos";
    }
  }

}
