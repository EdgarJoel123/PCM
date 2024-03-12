// autentificacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { GestionUsuariosService } from './gestion-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  private token: string;

  constructor(private router: Router, private http: HttpClient, private gestionUserService: GestionUsuariosService) {
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
    switchMap((response: any) => {
      console.log(response.TOKEN);

      this.setToken(response.TOKEN);
      
      if (response.STATE === 'OK') {
        alert("Usuario Valido")
        const username = formulario.username;
        //console.log(username);
        return this.gestionUserService.getUsername(username);
      } else {
        throw new Error('Usuario no válido revise su username o su contraseña');
      }
    }),
    // ...

    map((usernameResponseArray: any[]) => {
      const usernameResponse = usernameResponseArray[0]; // Acceder al primer elemento
      /*console.log('usernameResponse:', usernameResponse);
      console.log('id_ROL:', usernameResponse.id_ROL);*/
      if (usernameResponse.id_ROL === 1) {
        return 'Usted es un admin y tiene al sistema.';
      } else {
        return 'Usted no es un admin y no tiene acceso al sistema';
      }
    })

  ).subscribe(
    (message: any) => {
      alert(message);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/inicio']);
    },
    (error) => {
      console.error(error);
      alert(error.message);
      formulario.username = '';
      formulario.password = '';
    }
  );
}



  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }


}
