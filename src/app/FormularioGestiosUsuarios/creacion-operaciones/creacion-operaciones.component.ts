import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/modelo_usuarios/modulo';
import { Operacion } from 'src/app/modelo_usuarios/operaciones';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';

@Component({
  selector: 'app-creacion-operaciones',
  templateUrl: './creacion-operaciones.component.html',
  styleUrl: './creacion-operaciones.component.css'
})
export class CreacionOperacionesComponent {

  operaciones: Operacion[];
  idModuloSeleccion: number;
  op_NOMBRE: string;
  op_DESCRIPCION: string;
  modulos:  Modulo[];

  

  constructor(private service: GestionUsuariosService, private router: Router){}

  
  ngOnInit(): void {
    // this.currentFormIndex = Number(sessionStorage.getItem('currentFormIndex')) || 0; // Recuperar el índice almacenado o establecerlo en 0 si no hay ninguno
    

     this.cargarModulos();
     this.cargarOperaciones();
 
   }

     cargarModulos(): void {
    this.service.getListarModulos().subscribe(
      (data) => {
        this.modulos= data;
      },
      (error) => {
        console.error('Error al obtener los modulos:', error);
      }
    );
  }

  onFormSubmitOperaciones(form: any) {
    if (form.valid) {
      const nuevaOperacion = new Operacion(this.idModuloSeleccion, this.op_NOMBRE.toUpperCase(), this.op_DESCRIPCION.toUpperCase());
  
      this.service.insertarOperacion(nuevaOperacion).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Operación creada correctamente') {
            alert("OPERACIÓN CREADA CON ÉXITO");
            form.reset();
            window.location.reload(); // Recargar la página
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LA OPERACIÓN");
            form.reset();
            window.location.reload(); // Recargar la página
          }
        },
        error => {
          alert("NO SE PUDO CREAR LA OPERACIÓN");
          form.reset();
          window.location.reload(); // Recargar la página
        }
      );
    }
  }

  cargarOperaciones(): void {
    this.service.getOpreacionModulos(this.idModuloSeleccion).subscribe(
      (data) => {
        this.operaciones = data;
        console.log(this.operaciones);
        
      },
      (error) => {
        console.error('Error al obtener las operaciones:', error);
      }
    );
  }

  seleccionarModulo(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idModuloSeleccion = parseFloat(target.value);
  
    console.log('Módulo seleccionado:', this.idModuloSeleccion);
  
    // Llamada al servicio para cargar las operaciones del módulo seleccionado
    this.cargarOperaciones(); // Agrega esta línea para cargar las operaciones
  }
  

}
