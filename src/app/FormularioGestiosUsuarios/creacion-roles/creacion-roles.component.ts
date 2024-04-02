import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/modelo_usuarios/rol';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';

@Component({
  selector: 'app-creacion-roles',
  templateUrl: './creacion-roles.component.html',
  styleUrl: './creacion-roles.component.css'
})
export class CreacionRolesComponent {

  descripcion_ROL: string;
  nombre_ROL: string;

  constructor(private service: GestionUsuariosService, private router: Router){}



  onFormSubmitRol(form: any) {
    if (form.valid) {
      const nuevoRolprueba = new Rol(this.descripcion_ROL.toUpperCase(), this.nombre_ROL.toUpperCase());
  
      this.service.insertarRol(nuevoRolprueba).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Rol creado correctamente') {
            alert("ROL CREADO CON ÉXITO");
            form.reset();
            window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR EL ROL");
            form.reset();
            window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR EL ROL");
          form.reset();
          window.location.reload();
        }
      );
    }
  }

  permitirSoloLetras(event: any) {
    const inputChar = String.fromCharCode(event.keyCode);
    const pattern = /[a-zA-Z\s]/;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
