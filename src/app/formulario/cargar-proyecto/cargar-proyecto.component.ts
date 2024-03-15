import { Component, OnInit } from '@angular/core';
import { PrincipalRestService } from 'src/app/services/principal-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import { NgModel } from '@angular/forms';
import { Proyecto } from 'src/app/modelo/principal';

@Component({
  selector: 'app-cargar-proyecto',
  templateUrl: './cargar-proyecto.component.html',
  styleUrls: ['./cargar-proyecto.component.css']
})
export class CargarProyectoComponent implements OnInit {


  ppro_NOMBRE_PROY: string;

  anio_proyecto: string;
  monto_proyecto: string;

  menuVisible: boolean = false; // Asegúrate de declarar menuVisible y asignarle un valor inicial
  proyectos: Proyecto[];


  selectNombre: String;

  constructor(private servicePrincipal: PrincipalRestService, private sharedService: SharedIDService) { }

  ngOnInit() {
    // Recuperar el valor al inicializar el componente
    this.sharedService.getCodigoUnico();
    this.ppro_NOMBRE_PROY = this.sharedService.getNombreProyecto();

    this.listarProyectos();
  }


  seleccionarNombre(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectNombre = (target.value);

    //console.log('Departamento seleccionado:', this.selectNombre);

  }


  listarProyectos() {
    this.servicePrincipal.getListarProyectos()
      .subscribe(data => {
        this.proyectos = data;
        //console.log(this.proyectos);
        

      })
  }


  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  

  buscarDatosCodigoRapido() {
    this.servicePrincipal.getListarCodigoUnico(this.selectNombre).subscribe(
      (response: any) => {
        if (response && response.length > 0 && response[0].ppro_NOMBRE_PROY) {
          const codigoUnico = response[0].id_PPRO_CODIGO_UNICO;
          const nombreProyecto = response[0].ppro_NOMBRE_PROY;
          const anio = response[0].ppro_ANIO_CALIFICACION_EJECU;
          const monto = response[0].ppro_MONTO_APRO_ESTUDI_COSTOS;

          console.log('Código único obtenido:', codigoUnico);
          console.log('Nombre del proyecto obtenido:', nombreProyecto);
          console.log('Año:', anio);
          console.log('Monto:', monto);

          // Actualiza el valor en el servicio compartido
          this.sharedService.setCodigoUnico(codigoUnico);
          this.sharedService.setNombreProyecto(nombreProyecto);

          this.sharedService.setCodigoUnico(codigoUnico);
          this.sharedService.setNombreProyecto(nombreProyecto);

          alert("Proyecto Iniciado con Exito ")
          window.location.reload();

        } else {
          console.error('El campo ppro_NOMBRE_PROY no está presente en la respuesta.');
          this.ppro_NOMBRE_PROY = "";
          window.location.reload();
        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

}
