import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePartidaPresupuestaria } from 'src/app/modelo/detallePartidaPrepuestaria';
import { PartidaPresupuestaria } from 'src/app/modelo/partidaPresupuestaria';
import { PartidaPresupuestariaRestService } from 'src/app/services/partida-presupuestaria-rest.service';
import { PrincipalRestService } from 'src/app/services/principal-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-insert-update-partida-presupuestaria',
  templateUrl: './insert-update-partida-presupuestaria.component.html',
  styleUrls: ['./insert-update-partida-presupuestaria.component.css']
})
export class InsertUpdatePartidaPresupuestariaComponent {

  //partida prepuestaria 
  ptipapre_TIPO_PAR_PRESUPUESTAR: string;
  ppart_PARTIDA_PRESUPUESTARIA: string;
  id_PTIPAPRE: number;
  id_PPART: number;
  ppart_FECHA: string;
  //select tipo de partida presupuestaria 

  selectTipoPartida: number;
  tipoPartida: PartidaPresupuestaria[];


  ID_PPRO_CODIGO_UNICO_partida: number;
  ID_PPRO_CODIGO_UNICO: number;

  nombre_proyecto_CODIGO: string;

  ppart_CODIGO_PARTIDA: string;
  ppart_MONTO_PARTIDA: number;



  //partida
  partidas: PartidaPresupuestaria[];


  detallesPartidasAsignadas: DetallePartidaPresupuestaria[]; // Define una propiedad para almacenar los detalles de las partidas asignadas al proyecto



  constructor(private servicePrincipal: PrincipalRestService, private servicePartidaPrespuestaria: PartidaPresupuestariaRestService, private sharedService: SharedIDService, private router: Router) {
    this.ID_PPRO_CODIGO_UNICO = this.sharedService.getCodigoUnico();
    this.nombre_proyecto_CODIGO = this.sharedService.getNombreProyecto();
    this.ppart_FECHA = this.formatoFechaActual();

  }

  ngOnInit(): void {
    this.listarDatosProyecto();
    this.cargarDatosPartidaPresupuestaria();
    this.listarPartidaPresupuestaria();
    this.listarPartidaDetalle()
    // this.buscarDatosPartidaPresupuestaria();
  }


  listarDatosProyecto() {
    this.servicePrincipal.getListarProyectos1(this.ID_PPRO_CODIGO_UNICO)
      .subscribe(data => {

        //console.log(data[0].ppro_ANIO_CALIFICACION_EJECU);

        this.ppart_CODIGO_PARTIDA = data[0].ppro_CODIGO_RAPIDO;
        //this.pproin_VALOR_TOTAL_PROYECTO_PR = data[0].ppro_MONTO_APRO_ESTUDI_COSTOS;
        //this.pproin_PROFORMA = data[0].ppro_MONTO_APRO_ESTUDI_COSTOS;
  



       // console.log(this.ppart_CODIGO_PARTIDA); // verifica si hay datos
      })
  }


  listarPartidaDetalle() {
    this.servicePartidaPrespuestaria.getListarPartidaPresupuestariaDetalle()
      .subscribe(data => {
        this.detallesPartidasAsignadas = data;
        //console.log(this.detallesPartidasAsignadas);

      })
  }



  listarPartidaPresupuestaria() {
    this.servicePartidaPrespuestaria.getListarPartidaPresupuestaria()
      .subscribe(data => {
        this.partidas = data;
       // console.log(this.partidas);

      })
  }


  onSubmitDetallePartidaPresupuestaria(form: any) {
    if (form.valid) {
        // Realizar una verificación antes de enviar la solicitud al servidor
        
        
        if (this.partidaYaAsignada()) {
            alert("La partida presupuestaria ya ha sido asignada a este proyecto.");
            return; // Detener el proceso de asignación
        }

        const DetallePartida = new DetallePartidaPresupuestaria(
            this.ID_PPRO_CODIGO_UNICO,
            this.ID_PPRO_CODIGO_UNICO_partida
        );

        this.servicePartidaPrespuestaria.insertaDetallePartidaPresuestaria(DetallePartida).subscribe(
            (response: any) => {
                if (response && response.message === 'Detalle Partida Presupuestaria creada correctamente') {
                    alert("PARTIDA PRESUPUESTARIA ASIGNADA CON ÉXITO");
                    this.router.navigate(['partipaPresupuestaria']);
                } else {
                    alert("NO SE PUDO ASIGNAR LA PARTIDA PRESUPUESTARIA");
                }
            },
            error => {
                alert("NO SE PUDO ASIGNAR LA PARTIDA PRESUPUESTARIA");
            }
        );
    }
}

partidaYaAsignada(): boolean {
  // Suponiendo que this.ID_PPRO_CODIGO_UNICO y this.ID_PPRO_CODIGO_UNICO_partida representan el proyecto y la partida que se intenta asignar
  const proyecto = this.ID_PPRO_CODIGO_UNICO;
  const partida = this.ID_PPRO_CODIGO_UNICO_partida;

  // Verificar si la partida ya está asignada al proyecto
  for (const detalle of this.detallesPartidasAsignadas) {
      if (detalle.id_PPRO_CODIGO_UNICO === proyecto && detalle.id_PPART === partida) {
          // La partida ya está asignada a este proyecto
          return true;
      }
  }

  // La partida no está asignada a este proyecto
  return false;
}


  
  onSubmitPartidaPresupuestaria(form: any) {

    const fechaPartidaPresupuestaria = new Date(this.ppart_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria


    if (form.valid) {
      const partidaPresupuestaria = new PartidaPresupuestaria(
        this.selectTipoPartida,
        this.ppart_PARTIDA_PRESUPUESTARIA.toUpperCase(),
        fechaPartidaPresupuestaria,
        this.ppart_CODIGO_PARTIDA,
        this.ppart_MONTO_PARTIDA

      );

      this.servicePartidaPrespuestaria.insertaPartidaPresuestaria(partidaPresupuestaria).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Partida Presupuestaria creada correctamente') {
            alert("DATOS DE LA PARTIDA PRESUPUESTARIA CREADOS CON ÉXITO");
            //form.reset();
            window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LOS DATOS DE LA PARTIDA PRESUPUESTARIA");
            form.reset();
         
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS DATOS DE LA PARTIDA PRESUPUESTARIA");
          //form.reset();
          //window.location.reload();
        }
      );
    }
  }


  cargarDatosPartidaPresupuestaria() {
    this.servicePartidaPrespuestaria.getListarTipoPartida().subscribe(
      (data) => {
        this.tipoPartida = data;
        //console.log(this.tipoPlan);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  seleccionarPartidaPrespuestaria(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoPartida = parseFloat(target.value);

    console.log('Tipo de seleccionado:', this.selectTipoPartida);

  }


  seleccionarPartidaPresupuestaria(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.ID_PPRO_CODIGO_UNICO_partida = parseFloat(target.value);

    console.log(' seleccionado:', this.ID_PPRO_CODIGO_UNICO_partida);

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

  buscarDatosPartidaPresupuestaria() {
    this.servicePartidaPrespuestaria.getListarPartidaPresupuestaria2(this.ID_PPRO_CODIGO_UNICO).subscribe(
      (response: any) => {
        console.log('Datos de proforma:', response);

        // Verifica si hay datos en el array y si ppro_NOMBRE_PROY está presente
        if (response && response.length) {
          // this.paste_FECHA_ASPEC_TECNICOS = this.formatoFechaActual();
          this.ppart_PARTIDA_PRESUPUESTARIA = response[0].ppart_PARTIDA_PRESUPUESTARIA;
          this.ppart_FECHA = this.formatoFechaActual();
          this.id_PTIPAPRE = response[0].id_PTIPAPRE;
          this.ID_PPRO_CODIGO_UNICO_partida = response[0].id_PPART;
          this.selectTipoPartida = response[0].id_PTIPAPRE;

          //console.log(this.ID_PPRO_CODIGO_UNICO_partida);


        } else {
          alert("Todavia no existe ninguna Proforma, ingresela")

        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


}
