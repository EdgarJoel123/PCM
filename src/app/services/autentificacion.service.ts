// autentificacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  private token: string;

  constructor(private router: Router, private http: HttpClient) {
    this.token = localStorage.getItem('authToken') || '';
  }

  canActivate(): boolean {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');

    if (isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

// autentificacion.service.ts
// ... (código existente)

validarUsuario(formulario: any) {
  const url = 'https://app.eeasa.com.ec/WSSisgerhServices/rest/security/validarUsuario';
  const cuenta = btoa(formulario.username);
  const clave = btoa(formulario.password);

  const params = {
    inDsgus_cuenta: cuenta,
    inDsgus_clave: clave
  };

  this.http.get(url, { params }).pipe(
    map((response: any) => {
      console.log(response.TOKEN);

      // Supongamos que si el nombre de usuario es "ivargas", asignamos automáticamente el rol de "admin"
      const roles = (formulario.username.toLowerCase() === 'dcadme') ? ['admin'] : [];

      // Guardar roles en el almacenamiento local
      localStorage.setItem('roles', JSON.stringify(roles));

      this.setToken(response.TOKEN);

      // Mostrar un alert según el rol del usuario
      this.mostrarMensajeSegunRol(roles);

      return {
        MESSAGE: response.MESSAGE,
        STATE: response.STATE,
        TOKEN: response.TOKEN
      };
    })
  ).subscribe(
    (loginInstance: any) => {
      console.log(loginInstance.MESSAGE);
      alert(loginInstance.MESSAGE);
      if (loginInstance.STATE === 'OK') {
        localStorage.setItem('token', loginInstance.TOKEN);
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(["inicio"]);
      } else {
        // Limpiar campos de usuario y contraseña
        formulario.username = '';
        formulario.password = '';
      }
    },
    (error) => {
      console.error(error);
      alert(error.MESSAGE);
      // Limpiar campos de usuario y contraseña
      formulario.username = '';
      formulario.password = '';
    }
  );
}

private mostrarMensajeSegunRol(roles: string[]): void {
  if (roles.includes('admin')) {
    alert('¡Usted es administrador!');
  }
  // Agrega más casos según tus roles
}


  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getRoles(): string[] {
    // Obtener roles del almacenamiento local
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }


  // autentificacion.service.ts
// ... (código existente)

hasRole(role: string): boolean {
  const roles = this.getRoles();
  return roles.includes(role);
}


}
