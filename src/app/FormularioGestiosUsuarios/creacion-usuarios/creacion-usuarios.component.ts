import { Component } from '@angular/core';
import { Listar } from 'src/app/modelo_usuarios/listar';
import { Rol } from 'src/app/modelo_usuarios/rol';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';

@Component({
  selector: 'app-creacion-usuarios',
  templateUrl: './creacion-usuarios.component.html',
  styleUrl: './creacion-usuarios.component.css'
})
export class CreacionUsuariosComponent {

  idRolSeleccion: number;
  user_NAME: string;
  nomb_USUARIO: string;
  ape_USUARIO: string; // Asegúrate de que nomb_USUARIO esté declarada y tenga un valor inicial
  eliminado: string;
  bloqueado: string;
  dmper_CODIGO: string;
  dmper_NUMERO_ROL: string;

  roles: Rol[];


  constructor(private service: GestionUsuariosService, private authService: AutentificacionService){}


  ngOnInit(): void {
    // this.currentFormIndex = Number(sessionStorage.getItem('currentFormIndex')) || 0; // Recuperar el índice almacenado o establecerlo en 0 si no hay ninguno
    
     this.cargarRoles();
   //  this.cargarModulos();
     //this.cargarOperaciones();
 
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

  onFormSubmitUsuarios(form: any) {
    if (form.valid) {
      const nuevoUsuario = new Listar(
        this.idRolSeleccion,
        this.user_NAME.toUpperCase(),
        this.nomb_USUARIO.toUpperCase(),
        this.ape_USUARIO.toUpperCase(),
        this.bloqueado,
        this.eliminado,
        this.dmper_CODIGO.toUpperCase(),
        this.dmper_NUMERO_ROL.toUpperCase()
      );
  
      this.service.insertarUsuario(nuevoUsuario).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Usuario creado correctamente') {
            alert("USUARIO CREADO CON ÉXITO");
            console.log("Usuario creado exitosamente:", response);
  
            form.reset();
            window.location.reload();
            // Si deseas avanzar al siguiente formulario después de enviar, descomenta la siguiente línea
            // this.onNextForm();
          } else {
            alert("NO SE PUDO CREAR EL USUARIO");
            console.error("Error al crear usuario:", response);
  
            form.reset();  
            window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR EL USUARIO");
          console.error("Error al crear usuario:", error);
  
          form.reset();
          window.location.reload();
        }
      );
    }
  }

  seleccionarRol(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.idRolSeleccion = parseFloat(target.value);

    console.log('Rol seleccionado:', this.idRolSeleccion);
  }

  buscarDatosUser() {
    const username = this.user_NAME

    const token = this.authService.getToken();

    this.service.getDatosUser(username, token).subscribe(
     (response: any) => {
    
      console.log('Datos de usuario:', response);
        this.nomb_USUARIO = response.DATA.NOMBRES; 
        this.ape_USUARIO = response.DATA.APELLIDOS;
        this.dmper_CODIGO = response.DATA.DMPER_CODIGO;
        this.dmper_NUMERO_ROL = response.DATA.DMPER_NUMERO_ROL;

        console.log(this.nomb_USUARIO);
        
     },
     (error) => {
      // Maneja errores aquí
      console.error('Error al obtener datos de usuario:', error);
    }
  );

    console.log(token);
    console.log(username);
    
    


}

}
