import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/modelo_usuarios/modulo';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';

@Component({
  selector: 'app-creacion-modulos',
  templateUrl: './creacion-modulos.component.html',
  styleUrl: './creacion-modulos.component.css'
})
export class CreacionModulosComponent {


  nombre_MODULO:string;
  descripcion_MODULO: string;

  constructor(private service: GestionUsuariosService, private router: Router){}

  onFormSubmitModulo(form: any) {
    if (form.valid) {
      const nuevoModulo = new Modulo(this.nombre_MODULO.toUpperCase(), this.descripcion_MODULO.toUpperCase());
  
      this.service.insertarModulo(nuevoModulo).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Módulo creado correctamente') {
            alert("MÓDULO CREADO CON ÉXITO");

            this.router.navigate(['']);
          
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR EL MÓDULO");
            form.reset();
          }
        },
        error => {
          alert("NO SE PUDO CREAR EL MÓDULO");
          window.location.reload();
          form.reset();
        }
      );
    }
  }

}
