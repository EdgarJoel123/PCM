import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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

  guardarDatosUsuario(datos: any) {
    localStorage.setItem('userData', JSON.stringify(datos));
    console.log(datos);
    
  }

  validarUsuario(formulario: any) {
    const url = 'https://app.eeasa.com.ec/WSSisgerhServices/rest/security/validarUsuario';
    const cuenta = btoa(formulario.username);
    const clave = btoa(formulario.password);

    const params = {
      inDsgus_cuenta: cuenta,
      inDsgus_clave: clave
    };

    this.http.get(url, { params }).subscribe(
      (response: any) => {
        if (response.STATE === 'OK') {
          alert("Usuario Válido");
          const username = formulario.username;
          console.log(username);

          // Obtener información del usuario
          this.gestionUserService.getUsername(username).subscribe(
            (userData: any[]) => {
              if (userData.length === 0) {
                throw new Error('El usuario no existe');
              } else {
                console.log(userData[0].id_ROL);

                // Obtener información del rol asociado al usuario
                this.gestionUserService.getIdRol(userData[0].id_ROL).subscribe(
                  (rolData: any[]) => {
                    //console.log('rolData:', rolData);
                    alert("Su rol de usuario es  "+ rolData[0].nombre_ROL)

                    // Guardar la información del rol en el servicio de gestión de usuarios
                    this.guardarDatosUsuario(rolData);

                    // Marcar al usuario como autenticado
                    localStorage.setItem('isLoggedIn', 'true');

                    // Redirigir al usuario a la página de inicio
                    this.router.navigate(['/inicio']);
                  },
                  (error) => {
                    console.error(error);
                    alert('Error al obtener la información del rol');
                  }
                );
              }
            },
            (error) => {
              console.error(error);
              alert('Error al obtener la información del usuario');
            }
          );
        } else {
          throw new Error('Usuario no válido, revise su username o su contraseña');
        }
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
