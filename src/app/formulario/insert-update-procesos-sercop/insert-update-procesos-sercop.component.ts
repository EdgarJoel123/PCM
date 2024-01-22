import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesosSercop } from 'src/app/modelo/procesosSercop';
import { ProcesosSercopRestService } from 'src/app/services/procesos-sercop-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-insert-update-procesos-sercop',
  templateUrl: './insert-update-procesos-sercop.component.html',
  styleUrls: ['./insert-update-procesos-sercop.component.css']
})
export class InsertUpdateProcesosSercopComponent {

  //procesos sercop

  id_PPRO_CODIGO_UNICO_procesos_sercop: number;
  pproser_PROCESOS_SERCOP: string;
  id_PPROSER: number;
  pproser_FECHA: string;
  pproser_CODIGO_SERCOP: string;

  constructor(private servicePorocesosSercop: ProcesosSercopRestService, private sharedService: SharedIDService, private router: Router) {
    this.id_PPRO_CODIGO_UNICO_procesos_sercop = this.sharedService.getCodigoUnico();
    this.id_PPROSER = this.sharedService.getCodigoUnico();
    this.pproser_FECHA = this.formatoFechaActual();

  }

  ngOnInit() {
   // this.buscarDatosProcesosSercop();
  }


  onSubmitProcesosSercop(form: any) {


    const fechaProcesosSercop = new Date(this.pproser_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria

    if (form.valid) {
      const sercop = new ProcesosSercop(
        this.id_PPRO_CODIGO_UNICO_procesos_sercop,
        this.pproser_PROCESOS_SERCOP.toUpperCase(),
        fechaProcesosSercop,
        this.pproser_CODIGO_SERCOP.toUpperCase(),
      );

      this.servicePorocesosSercop.insertarProcesosSercop(sercop).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Procesos sercop creados correctamente') {
            alert("DATOS DE PROCESOS SERCOP CREADOS CON ÉXITO");

            this.router.navigate(['procesosSercop']);
            //form.reset();
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor

          } else {
            alert("NO SE PUDO CREAR LOS DATOS DE PROCESOS SERCOP");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS DATOS DE PROCESOS SERCOP");
          //form.reset();
          //window.location.reload();
        }
      );
    }
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


  buscarDatosProcesosSercop() {
    this.servicePorocesosSercop.getListarProcesosSercop2(this.id_PPRO_CODIGO_UNICO_procesos_sercop).subscribe(
      (response: any) => {
        console.log('Datos de proforma:', response);

        // Verifica si hay datos en el array y si ppro_NOMBRE_PROY está presente
        if (response && response.length) {
          // this.paste_FECHA_ASPEC_TECNICOS = this.formatoFechaActual();
          this.pproser_PROCESOS_SERCOP = response[0].pproser_PROCESOS_SERCOP;
          this.pproser_FECHA = this.formatoFechaActual();
          this.id_PPROSER = response[0].id_PPROSER;


         // console.log(this.pproser_FECHA);


        } else {
          alert("Todavia no existe ninguna Proforma, ingresela")

        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }



  actualizarProcesosSercop(form: any) {

    const fechaProcesosSercop = new Date(this.pproser_FECHA);

    if (form.valid) {
      const sercop: ProcesosSercop = {
        ppro_CODIGO_RAPIDO: "",
        id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO_procesos_sercop,
        id_PPROSER: this.id_PPROSER,
        pproser_PROCESOS_SERCOP: this.pproser_PROCESOS_SERCOP.toUpperCase(),
        pproser_FECHA: fechaProcesosSercop,
        pproser_CODIGO_SERCOP: this.pproser_CODIGO_SERCOP
      };
  
      this.servicePorocesosSercop.updateProcesosSercop(sercop).subscribe(
        (response: any) => {
          if (response && response.message === 'Procesos de la SERCOP actualizados correctamente') {
            alert("DATOS DE PROCESOS SERCOP ACTUALIZADOS CON ÉXITO");



          } else {
            alert("NO SE PUDO ACTUALIZAR LOS DATOS DE PROCESOS SERCOP");
          }
        },
        error => {
          console.error("Error al actualizar procesos SERCOP:", error);
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DE PROCESOS SERCOP");
          form.reset();
        }
      );
    }
  }
  
  
  

}




