import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ManejadorDbService } from './manejador-db.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalGuard implements CanActivate {
  constructor(private auth: AuthService, private db: ManejadorDbService, private router: Router){

  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Promise<boolean>{
      let user = await this.auth.ObtenerActual();      
      if(user){
        let usuario = await this.db.ObtenerUsuario(user.email);
        if(usuario.get("aprobado")){
          return true;
        }
        else{
          this.router.navigate(["noAprobado"]);
          return false;
        }
      }
      this.router.navigate(['login']);
      return false;          
  }    
}
