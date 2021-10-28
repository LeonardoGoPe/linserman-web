import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
    ) {}
  
  /**
   * Dado el estado de la sesion de authentication si es nulo, redirige al login
   * y si hay una sesion activa(loggeado) permite acceder al home (true).
   * @param next 
   * @param state 
   * @returns true si tiene acceso a la pantalla (home), falso caso contrario.
   */


   canActivate() {
    this.authService.autoLogin()
    if (!this.authService.isLogged) {
        console.log('No estás logueado');
        this.router.navigate(['/login']);
        return false;
    }

    return true;
}
  
}
