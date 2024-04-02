import { Component } from '@angular/core';
import { Modulo } from 'src/app/modelo_usuarios/modulo';
import { Operacion } from 'src/app/modelo_usuarios/operaciones';
import { Rol } from 'src/app/modelo_usuarios/rol';
import { Detalle } from 'src/app/modelo_usuarios/rolOpe';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';

@Component({
  selector: 'app-creacion-detalle',
  templateUrl: './creacion-detalle.component.html',
  styleUrl: './creacion-detalle.component.css'
})
export class CreacionDetalleComponent {

  idRolSeleccion: number;
  idModuloSeleccion: number;
  idOperacionSeleccion: number;

  operaciones: Operacion[];
  roles: Rol[];
  modulos:  Modulo[];




  constructor(private service: GestionUsuariosService){}


  
  ngOnInit(): void {
    // this.currentFormIndex = Number(sessionStorage.getItem('currentFormIndex')) || 0; // Recuperar el índice almacenado o establecerlo en 0 si no hay ninguno
    
     this.cargarRoles();
     this.cargarModulos();
     this.cargarOperaciones();
 
   }


   cargarRoles(): void {
    this.service.getListarRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener los roles:', error);
      }
    );
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

  onFormSubmitRolOperacion(form: any) {
    if (form.valid) {
      const nuevaRolOperacion = new Detalle(this.idRolSeleccion, this.idOperacionSeleccion);
  
      this.service.insertarRolOpreaciones(nuevaRolOperacion).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Detalle creado correctamente') {
            alert("ASIGNADO CON ÉXITO");
            form.reset();
            window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO ASIGNAR");
            form.reset();
          }
        },
        error => {
          alert("NO SE PUDO ASIGNAR");
          form.reset();
        }
      );
    }
  }

  cargarOperaciones(): void {
    this.service.getOpreacionModulos(this.idModuloSeleccion).subscribe(
      (data) => {
        this.operaciones = data;
      },
      (error) => {
        console.error('Error al obtener las operaciones:', error);
      }
    );
  }


  seleccionarRol(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idRolSeleccion = parseFloat(target.value);

    console.log('Rol seleccionado:', this.idRolSeleccion);
  }

  seleccionarModulo(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idModuloSeleccion = parseFloat(target.value);
  
    console.log('Módulo seleccionado:', this.idModuloSeleccion);
  
    // Llamada al servicio para cargar las operaciones del módulo seleccionado
    this.cargarOperaciones(); // Agrega esta línea para cargar las operaciones
  }

  seleccionarOperacion(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idOperacionSeleccion = parseFloat(target.value);

    console.log('Operacion selccionada:', this.idOperacionSeleccion);
    

  }



}
