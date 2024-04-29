import { Component } from '@angular/core';
import { DetalleResponsableTecnico } from 'src/app/modelo/detalleResponsableTecnico';
import { ResponsableTecnico } from 'src/app/modelo/responsableTecnico';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { PrincipalRestService } from 'src/app/services/principal-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-insert-update-responsable-tecnico',
  templateUrl: './insert-update-responsable-tecnico.component.html',
  styleUrls: ['./insert-update-responsable-tecnico.component.css']
})
export class InsertUpdateResponsableTecnicoComponent {

  username_name: string;
  id_PRETE: number;
  prete_NOMBRES: String;
  prete_APELLIDOS: String;
  prete_DERTAMENTO_PER: String;
  prete_DMPER_NUMERO_ROL: String;
  prete_DMPER_CODIGO: String;
  responsables: ResponsableTecnico[];

  fech_DETALLE_RES: string;


  ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido: number;
  ID_PPRO_CODIGO_UNICO_responsable: number;

  nombre_proyecto_CODIGO: string;




  tienePermisoIngresar: boolean = false;
  tienePermisoAsignar: boolean = false;


  detalleResponsableTecnico: DetalleResponsableTecnico[];


  constructor(private servicePrincipal: PrincipalRestService, private sharedService: SharedIDService, private serviceAuto: AutentificacionService) {

    this.ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido = this.sharedService.getCodigoUnico();
    this.nombre_proyecto_CODIGO = this.sharedService.getNombreProyecto();
    this.fech_DETALLE_RES = this.formatoFechaActual();

  }




  listarResponsableTecnico() {
    this.servicePrincipal.getListarResponsableTecnico()
      .subscribe(data => {
        this.responsables = data;
        //console.log(this.responsables);

      })
  }

  ngOnInit(): void {

    this.listarResponsableTecnico();
    this.listarResponsableTecnicoDetalle();

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Verificar permisos para cada operación
    userData.forEach((operacion: any) => {
      if (operacion.id_MODULO === 39) {
        if (operacion.id_OPERACION === 76) {
          this.tienePermisoIngresar = true;
        }
        if (operacion.id_OPERACION === 77) {
          this.tienePermisoAsignar = true;
        }
      }
    });



  }


  formatoFechaActual(): string {
    const fechaActual = new Date();
    // Obtener componentes de la fecha
    const year = fechaActual.getFullYear();
    const month = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    const day = ('0' + fechaActual.getDate()).slice(-2);

    // Formatear la fecha como "yyyy-MM-dd"
    return `${year}-${month}-${day}`;
  }

  onSubmitResponsableTecnico(form: any) {
    if (form.valid) {
      // Crear el objeto ResponsableTecnico
      const responsable = new ResponsableTecnico(
        this.prete_NOMBRES,
        this.prete_APELLIDOS,
        this.prete_DERTAMENTO_PER,
        this.prete_DMPER_NUMERO_ROL,
        this.prete_DMPER_CODIGO
      );

      // Verificar existencia del código antes de insertar
      this.servicePrincipal.verificarExistenciaResponsable(this.prete_DMPER_CODIGO).subscribe(
        (existe: boolean) => {
          if (existe) {
            alert("Este Responsable Técnico ya existe");
            form.reset();
          } else {
            // Insertar responsable técnico solo si no existe
            this.servicePrincipal.insertarResponsableTecnico(responsable).subscribe(
              (response: any) => {
                if (response && response.message === 'Responsable Tecnico creado correctamente') {
                  alert("DATOS DEL RESPONSABLE TECNICO CREADOS CON ÉXITO");
                  form.reset();
                  window.location.reload();
                } else {
                  alert("NO SE PUDO CREAR LOS DATOS DEL RESPONSABLE TECNICO");
                  form.reset();
                  window.location.reload();
                }
              },
              error => {
                alert("NO SE PUDO CREAR LOS DATOS DEL RESPONSABLE TECNICO");
                form.reset();
                //window.location.reload();
              }
            );
          }
        },
        error => {
          alert("Error al verificar la existencia del código");
        }
      );
    }
  }



  listarResponsableTecnicoDetalle() {
    this.servicePrincipal.getListarResponsableTecnicoDetalle()
      .subscribe(data => {
        this.detalleResponsableTecnico = data;
      // console.log(this.detalleResponsableTecnico);

      })
  }


  responsableYaAsignado(): boolean {
    // Suponiendo que this.ID_PPRO_CODIGO_UNICO y this.ID_PPRO_CODIGO_UNICO_partida representan el proyecto y la partida que se intenta asignar
    const proyecto = this.ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido;
    const responsable = this.ID_PPRO_CODIGO_UNICO_responsable;

    // Verificar si la partida ya está asignada al proyecto
    for (const detalle of this.detalleResponsableTecnico) {

    
   // console.log(detalle.id_PPRO_CODIGO_UNICO);

   // console.log(detalle.id_PRETE);
    
    
      if (detalle.id_PPRO_CODIGO_UNICO === proyecto && detalle.id_PRETE === responsable) {
        // La partida ya está asignada a este proyecto
        return true;
      }
    }

    // La partida no está asignada a este proyecto
    return false;
  }

  onSubmitDetalleResponsableTecnico(form: any) {

    const fechaDetalleResponsable = new Date(this.fech_DETALLE_RES + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria

    if (form.valid) {


      if (this.responsableYaAsignado()) {
        alert("Este responsable tecnico ya esta asignado");
        return;
      }


      const Detalleresponsable = new DetalleResponsableTecnico(
        this.ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido,
        this.ID_PPRO_CODIGO_UNICO_responsable,
        fechaDetalleResponsable
      );

      this.servicePrincipal.insertarDetalleResponsableTecnico(Detalleresponsable).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Dettale Responsable Tecnico creado correctamente') {
            alert(" RESPONSABLE TECNICO ASIGNADO CON ÉXITO");
            form.reset();
            window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO ASIGNAR EL RESPONSABLE TECNICO");
            // form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO ASIGNAR EL RESPONSABLE TECNICO");
          form.reset();
          //window.location.reload();
        }
      );
    }
  }


  seleccionarResponsableTecnico(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.ID_PPRO_CODIGO_UNICO_responsable = parseFloat(target.value);

    //console.log(' seleccionado:', this.ID_PPRO_CODIGO_UNICO_responsable);

  }


  buscarDatosUser() {
    const username = this.username_name;

    const token = this.serviceAuto.getToken();

    this.servicePrincipal.getDatosResponsable(username, token).subscribe(
      (response: any) => {
        if (Object.keys(response.DATA).length === 0) {
          // El objeto devuelto está vacío, muestra un alert al usuario
          alert("NO SE ENCONTRARON DATOS DE ESTE USUARIO. REVISELO");
          this.username_name = "";
        } else {
          console.log('Datos de usuario:', response);
          this.prete_NOMBRES = response.DATA.NOMBRES;
          this.prete_APELLIDOS = response.DATA.APELLIDOS;
          this.prete_DERTAMENTO_PER = response.DATA.DEPARTAMENTO;
          this.prete_DMPER_NUMERO_ROL = response.DATA.DMPER_NUMERO_ROL;
          this.prete_DMPER_CODIGO = response.DATA.DMPER_CODIGO;

          console.log(this.prete_DMPER_CODIGO);
        }
      },
      (error) => {
        // Maneja errores aquí
        console.error('Error al obtener datos de usuario:', error);
        alert("NO SE ENCONTRARON DATOS DE ESTE USUARIO. REVISELO");
        this.username_name = "";
      }
    );

    console.log(token);
    console.log(username);
  }

}
