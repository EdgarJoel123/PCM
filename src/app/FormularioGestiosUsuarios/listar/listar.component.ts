import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Listar } from 'src/app/modelo_usuarios/listar';
import { Modulo } from 'src/app/modelo_usuarios/modulo';
import { Operacion } from 'src/app/modelo_usuarios/operaciones';
import { Rol } from 'src/app/modelo_usuarios/rol';
import { Detalle } from 'src/app/modelo_usuarios/rolOpe';
import { GestionUsuariosService } from 'src/app/services/gestion-usuarios.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})

export class ListarComponent {


    listadoUsuarios: Listar[];
    listadoOperaciones: Operacion[];
    listadoModulos: Modulo[];
    listadoDetalle: Detalle[];
    listadoRoles: Rol[];
  
    rol: Rol = new Rol();
  
  
  
    opcionSeleccionada: string = 'detalle'; // Valor por defecto
  
  
    palabraBusquedaDetalle: string; // Agregar esta línea
    resultadosBusquedaDetalle: Detalle[];
    contadorResultadosDetalle: number = 0;
  
    palabraBusquedaRol: string; // Agregar esta línea
    resultadosBusquedaRol: Rol[];
    contadorResultadosRol: number = 0;
  
  
  
    palabraBusquedaOperaciones: string; // Agregar esta línea
    resultadosBusquedaOperaciones: Operacion[];
    contadorResultadosOperaciones: number = 0;
  
  
    palabraBusquedaModulo: string; // Agregar esta línea
    resultadosBusquedaModulo: Modulo[];
    contadorResultadosModulo: number = 0;
  
  
    palabraBusquedaUsuario: string; // Agregar esta línea
    resultadosBusquedaUsuario: Listar[];
    contadorResultadosUsuario: number = 0;
  
  
    idRol: number;
    nombreRol: string;
    descripcionRol: string;
  
    idModulo: number;
    nombreModulo: string;
    descripcionModulo: string;
  
    idModuloOpe: number;
    idOperacion: number;
    nombreOperacionMo: string;
    nombreOperacion: string;
    descripcionOperacion: string;
  
  
    idRolOpreacion: number;
    nombreRolRO: string;
    nombreOperacionRO: string;
    nombreModuloDetalle: string;
  
  
    idUsuario: number;
    username: string;
    nombreUser: string;
    apeliidoUser: string;
    bloqueadoUser: string;
    eliminadoUser: string;
    dmperUser: string;
    dmperRolUser: string;
    nombreRolUser: string;
  
  
  
  
  
  
    constructor(private service: GestionUsuariosService, private router: Router) {
      /* const idRolEditar = localStorage.getItem('id');
       this.idRol = idRolEditar ? parseInt(idRolEditar, 10) : 0;
   
       const idModulosEditar =  localStorage.getItem('id');
       this.idModulo = idModulosEditar ? parseInt(idModulosEditar, 10) : 0;*/
    }
  
  
    ngOnInit() {
  
      this.listarUsuarios();
      this.listarModulos();
      this.listarOperaciones();
      this.listarRoles();
      this.listarDetalle()
  
  
  
    }
  
    listarUsuarios() {
      this.service.getListarUsuarios()
        .subscribe(data => {
          this.listadoUsuarios = data;
        })
    }
  
    listarModulos() {
      this.service.getListarModulos()
        .subscribe(data => {
          this.listadoModulos = data;
        })
    }
  
    
  
    listarOperaciones() {
      this.service.getListarOperaciones()
        .subscribe(data => {
          this.listadoOperaciones = data;
        })
    }
  
  
    listarRoles() {
      this.service.getListarRoles()
        .subscribe(data => {
          this.listadoRoles = data;
        })
    }
  
    listarDetalle() {
      this.service.getListarDetalle()
        .subscribe(data => {
          this.listadoDetalle = data;
  
          //console.log(this.listadoDetalle);
  
        })
    }
  
  
    buscarPalabraDetalle(palabra: string) {
      //console.log('Palabra buscada:', palabra);
  
      this.resultadosBusquedaDetalle = this.listadoDetalle.filter(detalle => {
        return (detalle.descripcion_ROL && detalle.descripcion_ROL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (detalle.descripcion_MODULO && detalle.descripcion_MODULO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (detalle.op_DESCRIPCION && detalle.op_DESCRIPCION.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (detalle.op_NOMBRE && detalle.op_NOMBRE.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (detalle.nombre_MODULO && detalle.nombre_MODULO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (detalle.nombre_ROL && detalle.nombre_ROL.toLowerCase().includes(palabra.toLowerCase()));
      });
  
      //console.log('Resultados de búsqueda:', this.resultadosBusquedaDetalle);
      this.contadorResultadosDetalle = this.resultadosBusquedaDetalle.length;
  
      if (this.resultadosBusquedaDetalle.length === 0) {
        // No se encontraron resultados, no se muestra nada
        return;
      }
    }
  
  
    listarTodosDetalle(): void {
      this.service.getListarDetalle()
        .subscribe(data => {
          this.resultadosBusquedaDetalle = data;
          this.contadorResultadosDetalle = this.resultadosBusquedaDetalle.length;
          this.palabraBusquedaDetalle = '';
        })
    }
  
    buscarPalabraRoles(palabra: string) {
      //console.log('Palabra buscada:', palabra);
  
      this.resultadosBusquedaRol = this.listadoRoles.filter(Rol => {
        return (Rol.descripcion_ROL && Rol.descripcion_ROL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (Rol.nombre_ROL && Rol.nombre_ROL.toLowerCase().includes(palabra.toLowerCase()));
      });
  
      //console.log('Resultados de búsqueda:', this.resultadosBusquedaRol);
      this.contadorResultadosRol = this.resultadosBusquedaRol.length;
  
      if (this.resultadosBusquedaRol.length === 0) {
        // No se encontraron resultados, no se muestra nada
        return;
      }
    }
  
  
    listarTodosRoles(): void {
      this.service.getListarRoles()
        .subscribe(data => {
          this.resultadosBusquedaRol = data;
          this.contadorResultadosRol = this.resultadosBusquedaRol.length;
          this.palabraBusquedaRol = '';
        })
    }
  
  
    buscarPalabraOperaciones(palabra: string) {
      //console.log('Palabra buscada:', palabra);
  
      this.resultadosBusquedaOperaciones = this.listadoOperaciones.filter(Operacion => {
        return (Operacion.op_DESCRIPCION && Operacion.op_DESCRIPCION.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (Operacion.op_NOMBRE && Operacion.op_NOMBRE.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()) ||
            Operacion.nombre_MODULO && Operacion.nombre_MODULO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
      });
  
      //console.log('Resultados de búsqueda:', this.resultadosBusquedaOperaciones);
      this.contadorResultadosOperaciones = this.resultadosBusquedaOperaciones.length;
  
      if (this.resultadosBusquedaOperaciones.length === 0) {
        // No se encontraron resultados, no se muestra nada
        return;
      }
    }
  
  
    listarTodosOperaciones(): void {
      this.service.getListarOperaciones()
        .subscribe(data => {
          this.resultadosBusquedaOperaciones = data;
          this.contadorResultadosOperaciones = this.resultadosBusquedaOperaciones.length;
          this.palabraBusquedaOperaciones = '';
        })
    }
  
    buscarPalabraModulo(palabra: string) {
      //console.log('Palabra buscada:', palabra);
  
      this.resultadosBusquedaModulo = this.listadoModulos.filter(Modulo => {
        return (Modulo.descripcion_MODULO && Modulo.descripcion_MODULO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (Modulo.nombre_MODULO && Modulo.nombre_MODULO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
      });
  
      //console.log('Resultados de búsqueda:', this.resultadosBusquedaDetalle);
      this.contadorResultadosModulo = this.resultadosBusquedaModulo.length;
  
      if (this.resultadosBusquedaModulo.length === 0) {
        // No se encontraron resultados, no se muestra nada
        return;
      }
    }
  
  
    listarTodosModulo(): void {
      this.service.getListarModulos()
        .subscribe(data => {
          this.resultadosBusquedaModulo = data;
          this.contadorResultadosModulo = this.resultadosBusquedaModulo.length;
          this.palabraBusquedaModulo = '';
        })
    }
  
  
    buscarPalabraUsuarios(palabra: string) {
      //console.log('Palabra buscada:', palabra);
  
      this.resultadosBusquedaUsuario = this.listadoUsuarios.filter(Listar => {
        return (Listar.user_NAME && Listar.user_NAME.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (Listar.nomb_USUARIO && Listar.nomb_USUARIO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (Listar.ape_USUARIO && Listar.ape_USUARIO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (Listar.eliminado && Listar.eliminado.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
          (Listar.bloqueado && Listar.bloqueado.toLowerCase().includes(palabra.toLowerCase())) ||
          (Listar.dmper_CODIGO && Listar.dmper_CODIGO.toLowerCase().includes(palabra.toLowerCase())) ||
          (Listar.nombre_ROL && Listar.nombre_ROL.toLowerCase().includes(palabra.toLowerCase())) ||
          (Listar.descripcion_ROL && Listar.dmper_NUMERO_ROL.toLowerCase().includes(palabra.toLowerCase()));
      });
  
      //console.log('Resultados de búsqueda:', this.resultadosBusquedaDetalle);
      this.contadorResultadosUsuario = this.resultadosBusquedaUsuario.length;
  
      if (this.resultadosBusquedaUsuario.length === 0) {
        // No se encontraron resultados, no se muestra nada
        return;
      }
    }
  
  
    listarTodosUsuarios(): void {
      this.service.getListarUsuarios()
        .subscribe(data => {
          this.resultadosBusquedaUsuario = data;
          this.contadorResultadosUsuario = this.resultadosBusquedaUsuario.length;
          this.palabraBusquedaUsuario = '';
        })
    }
  
  
  
    openEditarModalUsuario(usuario: Listar) {
      // Asigna los valores actuales a las propiedades del formulario
  
      this.idUsuario = usuario.id_USUARIO;
      this.username = usuario.user_NAME;
      this.nombreUser = usuario.nomb_USUARIO;
      this.apeliidoUser = usuario.ape_USUARIO;
      this.bloqueadoUser = usuario.bloqueado;
      this.eliminadoUser = usuario.eliminado;
      this.dmperUser = usuario.dmper_CODIGO;
      this.dmperRolUser = usuario.dmper_NUMERO_ROL;
  
      // Encuentra el índice del módulo correspondiente en el listado de módulos
      const rolIndex = this.listadoRoles.findIndex(rol => rol.id_ROL === usuario.id_ROL);
  
  
      // Si se encontró el índice del módulo, selecciona el módulo en el <select>
      if (rolIndex !== -1) {
  
        this.nombreRolUser = this.listadoRoles[rolIndex].id_ROL.toString(); // Convertir a cadena
  
      } else {
        this.nombreRolUser = ''; // O maneja esta situación según tu lógica
  
      }
  
      console.log(usuario);
    }
  
  
    openEditarModalDetalle(detalle: Detalle) {
      this.idRolOpreacion = detalle.id_ROL_OPERACIONES;
    
      const rolIndex = this.listadoRoles.findIndex(rol => rol.id_ROL === detalle.id_ROL);
      const modulosIndex = this.listadoModulos.findIndex(modulo => modulo.id_MODULO === detalle.id_MODULO);
      const operacionIndex = this.listadoOperaciones.findIndex(operacion => operacion.id_OPERACION === detalle.id_OPERACION);
    
      if (rolIndex !== -1 && operacionIndex !== -1 && modulosIndex !== -1) {
        this.nombreRolRO = detalle.id_ROL.toString(); // Cambia this.listadoRoles[rolIndex].id_ROL.toString();
        this.nombreModuloDetalle = detalle.id_MODULO.toString(); // Cambia this.listadoModulos[modulosIndex].id_MODULO.toString();
        this.nombreOperacionRO = detalle.id_OPERACION.toString(); // Cambia this.listadoOperaciones[operacionIndex].id_OPERACION.toString();
      } else {
        this.nombreRolRO = '';
        this.nombreOperacionRO = '';
        this.nombreModuloDetalle = '';
      }
    
      console.log(detalle);
    }
    
  
  
    openEditarModalOperacion(operacion: Operacion) {
      // Asigna los valores actuales a las propiedades del formulario
  
      this.idModuloOpe = operacion.id_MODULO;
      this.idOperacion = operacion.id_OPERACION;
      this.nombreOperacion = operacion.op_NOMBRE;
      this.descripcionOperacion = operacion.op_DESCRIPCION;
  
      // Encuentra el índice del módulo correspondiente en el listado de módulos
      const moduloIndex = this.listadoModulos.findIndex(modulo => modulo.id_MODULO === operacion.id_MODULO);
  
      // Si se encontró el índice del módulo, selecciona el módulo en el <select>
      if (moduloIndex !== -1) {
        this.nombreOperacionMo = this.listadoModulos[moduloIndex].id_MODULO.toString(); // Convertir a cadena
      } else {
        this.nombreOperacionMo = ''; // O maneja esta situación según tu lógica
      }
  
      console.log(operacion);
    }
  
  
  
    openEditarModalModulo(modulo: Modulo) {
      // Asigna los valores actuales a las propiedades del formulario
      this.idModulo = modulo.id_MODULO;
      this.nombreModulo = modulo.nombre_MODULO;
      this.descripcionModulo = modulo.descripcion_MODULO;
    }
  
  
    openEditarModalRol(rol: Rol) {
      // Asigna los valores actuales a las propiedades del formulario
      this.idRol = rol.id_ROL;
      this.nombreRol = rol.nombre_ROL;
      this.descripcionRol = rol.descripcion_ROL;
    }
  
    ActualizarRol() {
      // Crea un objeto rol con los valores relevantes para la actualización
      const rolActualizado: Rol = {
        id_ROL: this.idRol,
        nombre_ROL: this.nombreRol.toUpperCase(),
        descripcion_ROL: this.descripcionRol.toUpperCase()
      };
  
      
  
      // Lógica para actualizar el rol
      this.service.updateRol(rolActualizado)
        .subscribe(
          data => {
            console.log(data);
            alert("Se actualizó el rol.");
            // Puedes cerrar el modal aquí si lo deseas
            window.location.reload();
          },
          error => {
            alert("Hubo un error en la actualización. Intenta nuevamente.");
            console.log(error);
          }
        );
    }
  
  
    ActualizarModulo() {
      // Crea un objeto rol con los valores relevantes para la actualización
      const moduloActualizar: Modulo = {
        id_MODULO: this.idModulo,
        nombre_MODULO: this.nombreModulo.toUpperCase(),
        descripcion_MODULO: this.descripcionModulo.toUpperCase()
      };
  
      // Lógica para actualizar el rol
      this.service.updateModulo(moduloActualizar)
        .subscribe(
          data => {
            console.log(data);
            alert("Se actualizó el modulo");
            // Puedes cerrar el modal aquí si lo deseas
            window.location.reload();
          },
          error => {
            alert("Hubo un error en la actualización. Intenta nuevamente.");
            console.log(error);
          }
        );
    }
  
  
    ActualizarOperacion() {
      // Crea un objeto operacion con los valores relevantes para la actualización
      const operacionActualizar: Operacion = {
        id_MODULO: parseInt(this.nombreOperacionMo), // Convertir el valor a número
        nombre_MODULO: this.nombreOperacionMo,
        id_OPERACION: this.idOperacion,
        op_NOMBRE: this.nombreOperacion.toUpperCase(),
        op_DESCRIPCION: this.descripcionOperacion.toUpperCase()
      };
  
      // Lógica para actualizar la operación
      this.service.updateOperacion(operacionActualizar)
        .subscribe(
          data => {
            console.log(data);
            alert("Se actualizó la operación");
            // Puedes cerrar el modal aquí si lo deseas
            window.location.reload();
          },
          error => {
            alert("Hubo un error en la actualización. Intenta nuevamente.");
            console.log(error);
          }
        );
    }
  
  
  
    ActualizarDetalle() {
      // Crea un objeto operacion con los valores relevantes para la actualización
      const detalleActualizar: Detalle = {
        id_ROL: parseInt(this.nombreRolRO),
        id_OPERACION: parseInt(this.nombreOperacionRO),
        id_MODULO: parseInt(this.nombreModuloDetalle),
        id_ROL_OPERACIONES: this.idRolOpreacion,
  
        nombre_ROL: this.nombreRol,
        descripcion_ROL: this.descripcionRol,
  
        op_NOMBRE: this.nombreOperacion,
        op_DESCRIPCION: this.descripcionOperacion,
  
        nombre_MODULO: this.nombreModulo,
        descripcion_MODULO: this.descripcionModulo
      };
  
      // Lógica para actualizar la operación
      this.service.updateDetalle(detalleActualizar)
        .subscribe(
          data => {
            console.log(data);
            alert("Se actualizó el Detalle");
            // Puedes cerrar el modal aquí si lo deseas
            window.location.reload();
          },
          error => {
            alert("Hubo un error en la actualización. Intenta nuevamente.");
            console.log(error);
          }
        );
    }
  
  
    ActualizarUsuario() {
      // Crea un objeto operacion con los valores relevantes para la actualización
      const usuarioActualizar: Listar = {
        id_USUARIO: this.idUsuario,
        id_ROL: parseInt(this.nombreRolUser),
        user_NAME: this.username.toUpperCase(),
        nomb_USUARIO: this.nombreUser.toUpperCase(),
        ape_USUARIO: this.apeliidoUser.toUpperCase(),
        bloqueado: this.bloqueadoUser,
        eliminado: this.eliminadoUser,
        dmper_CODIGO: this.dmperUser.toUpperCase(),
        dmper_NUMERO_ROL: this.dmperRolUser.toUpperCase(),
  
        nombre_ROL: this.nombreRol,
        descripcion_ROL: this.descripcionRol,
  
        op_NOMBRE: this.nombreOperacion,
        op_DESCRIPCION: this.descripcionOperacion,
  
        nombre_MODULO: this.nombreModulo,
        descripcion_MODULO: this.descripcionModulo
  
  
  
  
  
      };
  
      // Lógica para actualizar la operación
      this.service.updateUsuarios(usuarioActualizar)
        .subscribe(
          data => {
            console.log(data);
            alert("Se actualizó el Usuario");
            // Puedes cerrar el modal aquí si lo deseas
            window.location.reload();
          },
          error => {
            alert("Hubo un error en la actualización. Intenta nuevamente.");
            console.log(error);
          }
        );
  
    }
  
    EliminarDetalle() {
      this.service.elimnarDetalle(this.idRolOpreacion).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Asignada eliminado correctamente') {
            console.log('Detalle eliminado correctamente');
            alert('Detalle eliminado correctamente');
            window.location.reload();
          } else {
            console.error('Error al eliminar el Detalle:', response);
            alert('Error al eliminar el Detalle');
          }
        },
        error => {
          console.error('Error en la petición:', error);
        }
      );
    }
  
  
    eliminarModulo() {
  
      this.service.eliminarModulo(this.idModulo).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Módulo eliminado correctamente') {
            alert("MÓDULO ELIMINADO CON ÉXITO");
            // Realiza cualquier otra lógica necesaria aquí
          } else {
            alert("NO SE PUDO ELIMINAR EL MÓDULO");
          }
        },
        error => {
          alert("NO SE PUDO ELIMINAR EL MÓDULO");
        }
      );
    }
  
    eliminarOperacion() {
      this.service.eliminarOperacion(this.idOperacion).subscribe(
        (response: any) => {
          if (response && response.message === 'Operación eliminada correctamente') {
            alert("OPERACIÓN ELIMINADA CON ÉXITO");
            // Realiza cualquier otra lógica necesaria aquí
          } else {
            alert("NO SE PUDO ELIMINAR LA OPERACIÓN");
          }
        },
        error => {
          alert("NO SE PUDO ELIMINAR LA OPERACIÓN");
        }
      );
    }
  
    eliminarRol() {
      this.service.eliminarRol(this.idRol).subscribe(
        (response: any) => {
          if (response && response.message === 'Rol eliminado correctamente') {
            alert("ROL ELIMINADO CON ÉXITO");
            // Realiza cualquier otra lógica necesaria aquí
          } else {
            alert("NO SE PUDO ELIMINAR EL ROL");
          }
        },
        error => {
          alert("NO SE PUDO ELIMINAR EL ROL");
        }
      );
    }
  
    eliminarUsuario() {
      this.service.eliminarUsuario(this.idUsuario).subscribe(
        (response: any) => {
          if (response && response.message === 'Usuario eliminado correctamente') {
            alert("USUARIO ELIMINADO CON ÉXITO");
            // Realiza cualquier otra lógica necesaria aquí
          } else {
            alert("NO SE PUDO ELIMINAR EL USUARIO");
          }
        },
        error => {
          alert("NO SE PUDO ELIMINAR EL USUARIO");
        }
      );
    }
  
  
  
  
    cargarOperacionesPorModulo() {
      if (!this.nombreModuloDetalle) {
        // Si no se seleccionó un módulo, limpia la lista de operaciones
        this.listadoOperaciones = [];
        this.nombreOperacionRO = ''; // Cambia null a ''
        return;
      }
    
      const idModuloSeleccionado = parseInt(this.nombreModuloDetalle, 10);
    
      this.service.getOpreacionModulos(idModuloSeleccionado).subscribe(
        (operaciones: any[]) => {
          this.listadoOperaciones = operaciones;
          this.nombreOperacionRO = ''; // Cambia null a ''
        },
        (error) => {
          console.error('Error al cargar operaciones:', error);
        }
      );
    }
    
  
  
  
  }
  
