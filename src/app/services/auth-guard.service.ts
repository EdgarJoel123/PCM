// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutentificacionService } from './autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AutentificacionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];

    // Obtener roles del servicio de autenticación
    const roles = this.authService.getRoles();

    // Permitir el acceso si el usuario tiene cualquier rol excepto 'admin'
    const allowAccess = !roles.includes('admin');

    if (allowAccess) {
      return true;
    } else {
      // Redirigir a una página de acceso denegado si tiene el rol 'admin'
      this.router.navigate(['/acceso-denegado']);
      return false;
    }
  }
}
