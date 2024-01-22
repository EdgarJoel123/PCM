import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService implements CanActivate{

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

        this.setToken(response.TOKEN);

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

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.token = token;
  }
  

  getToken(): string {
    return this.token;
  }

}
