import { Component } from '@angular/core';
import { PrincipalRestService } from 'src/app/services/principal-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-eliminacion',
  templateUrl: './eliminacion.component.html',
  styleUrls: ['./eliminacion.component.css']
})
export class EliminacionComponent {
  codigo_rapido: string;
  nombre_proyecto: string;

  constructor(private servicePrincipal: PrincipalRestService, private sharedService: SharedIDService) { }

  ngOnInit() {
    // Recuperar el valor al inicializar el componente
    this.sharedService.getCodigoUnico();
    this.nombre_proyecto = this.sharedService.getNombreProyecto();
  }

  buscarDatosCodigoRapido() {
    this.servicePrincipal.getListarCodigoUnico(this.codigo_rapido).subscribe(
      (response: any) => {
        if (response && response.length > 0 && response[0].ppro_NOMBRE_PROY) {
          const codigoUnico = response[0].id_PPRO_CODIGO_UNICO;
          const nombreProyecto = response[0].ppro_NOMBRE_PROY;

          console.log('Código único obtenido:', codigoUnico);
          console.log('Nombre del proyecto obtenido:', nombreProyecto);

          // Actualiza el valor en el servicio compartido
          this.sharedService.setCodigoUnico(codigoUnico);
          this.sharedService.setNombreProyecto(nombreProyecto);

          alert("Proyecto Iniciado con Exito ")
          window.location.reload();

        } else {
          console.error('El campo ppro_NOMBRE_PROY no está presente en la respuesta.');
          alert("El código rápido que ingresó no existe. Verifíquelo.");
          this.codigo_rapido = "";
          this.nombre_proyecto = "";
          window.location.reload();
        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  openEditarModalEliminacion() {

  }



}
