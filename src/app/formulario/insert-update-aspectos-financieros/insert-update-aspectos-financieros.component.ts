import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AspectosFinancieros } from 'src/app/modelo/aspectosFinacieros';
import { AspectosFinancierosRestService } from 'src/app/services/aspectos-financieros-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-insert-update-aspectos-financieros',
  templateUrl: './insert-update-aspectos-financieros.component.html',
  styleUrls: ['./insert-update-aspectos-financieros.component.css']
})
export class InsertUpdateAspectosFinancierosComponent {

  //aspectos financieros
  pasfina_FECHA: string;
  pasfina_COMPROMISO: number;
  pasfina_REFORMAS: number;
  pasfina_EJECUTADO: number;
  id_PPRO_CODIGO_UNICO: number;
  pasfina_DEVENGADO: number;
  pasfina_PRESU_CODIFICADO: number;
  pasfina_ANTICIPO_NO_AMORTI: number;
  pasfina_PRE_COMPROMISO: number;
  pasfina_EJECUTADO_PAGADO: number;
  pasfina_ASIGNACION_INICIAL: number;
  id_PASFINA: number;

  id_PPRO_CODIGO_UNICO_aspectos_finacieros: number;

  
  total_trasferido: number;

  tienePermisoCrear: boolean = false;
  tienePermisoActualizar: boolean = false;

  constructor(private serviceAspectosFinacieros: AspectosFinancierosRestService, private sharedService: SharedIDService, private router: Router) { 
    this.id_PPRO_CODIGO_UNICO_aspectos_finacieros = sharedService.getCodigoUnico();
  }

  ngOnInit() {

    this.buscarDatosAspectosFinancieros();
  
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Verificar permisos para cada operación
    userData.forEach((operacion: any) => {
      if (operacion.id_MODULO === 41) {
        if (operacion.id_OPERACION === 52) {
          this.tienePermisoCrear = true;
        }
        if (operacion.id_OPERACION === 53) {
          this.tienePermisoActualizar = true;
        }
      }
    });



  }

  

  onSubmitAspectosFinancieros(form: any) {


    const fechaAspectosFinancieros = new Date(this.pasfina_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria




    if (form.valid) {
      const nuevoAspectosFinacieros = new AspectosFinancieros(this.id_PPRO_CODIGO_UNICO_aspectos_finacieros,
        this.pasfina_PRESU_CODIFICADO,
        this.pasfina_DEVENGADO,
        this.pasfina_EJECUTADO,
        this.pasfina_ASIGNACION_INICIAL,
        this.pasfina_REFORMAS,
        this.pasfina_PRE_COMPROMISO,
        this.pasfina_COMPROMISO,
        this.pasfina_EJECUTADO_PAGADO,
        this.pasfina_ANTICIPO_NO_AMORTI,
        fechaAspectosFinancieros
      );

      this.serviceAspectosFinacieros.insertaAspectosFinacieros(nuevoAspectosFinacieros).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Aspectos tecnicos creados correctamente') {
            alert("ASPECTOS FINACIEROS CREADOS CON ÉXITO");
            //form.reset();
            //window.location.reload();

            this.router.navigate(['aspectosFinancieros']);
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LOS ASPECTOS FINACIEROS");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS ASPECTOS FINACIEROS");
          form.reset();
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
  
  buscarDatosAspectosFinancieros() {
    this.serviceAspectosFinacieros.getListarAspectosFinancieros2(this.id_PPRO_CODIGO_UNICO_aspectos_finacieros).subscribe(
      (response: any) => {
        //console.log('Datos de aspectos financieros:', response);

        // Verifica si hay datos en el array y si ppro_NOMBRE_PROY está presente
        if (response && response.length && response[0].id_PASFINA !==0) {
          this.pasfina_PRESU_CODIFICADO = response[0].pasfina_PRESU_CODIFICADO;
          this.pasfina_DEVENGADO = response[0].pasfina_DEVENGADO;
          this.pasfina_EJECUTADO = response[0].pasfina_EJECUTADO;
          this.pasfina_ASIGNACION_INICIAL = response[0].pasfina_ASIGNACION_INICIAL;
          this.pasfina_REFORMAS = response[0].pasfina_REFORMAS;
          this.pasfina_PRE_COMPROMISO = response[0].pasfina_PRE_COMPROMISO;
          this.pasfina_COMPROMISO = response[0].pasfina_COMPROMISO;
          this.pasfina_EJECUTADO_PAGADO = response[0].pasfina_EJECUTADO_PAGADO;
          this.pasfina_ANTICIPO_NO_AMORTI = response[0].pasfina_ANTICIPO_NO_AMORTI;
          this.pasfina_FECHA = this.formatoFechaActual();

          this.id_PASFINA = response[0].id_PASFINA

          this.total_trasferido = this.pasfina_EJECUTADO + this.pasfina_ANTICIPO_NO_AMORTI;


          console.log(this.pasfina_EJECUTADO);


          console.log(this.total_trasferido);


        } else {
          this.pasfina_FECHA = this.formatoFechaActual();
          alert("Todavia no existe ningun aspecto financiero, ingreselos")

        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }


  actualizarAspectosFinancieros(form: any){

    const fechaAspectosFinancieros = new Date(this.pasfina_FECHA);

    if (form.valid) {
      const aspectosFinacieros: AspectosFinancieros = {


        pasfina_FECHA: fechaAspectosFinancieros,
        pasfina_COMPROMISO: this.pasfina_COMPROMISO,
        pasfina_REFORMAS: this.pasfina_REFORMAS,
        pasfina_EJECUTADO: this.pasfina_EJECUTADO,
        /*nulo*/id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO,
        pasfina_DEVENGADO: this.pasfina_DEVENGADO,
        pasfina_PRESU_CODIFICADO: this.pasfina_PRESU_CODIFICADO,
        pasfina_ANTICIPO_NO_AMORTI: this.pasfina_ANTICIPO_NO_AMORTI,
        pasfina_PRE_COMPROMISO: this.pasfina_PRE_COMPROMISO,
        pasfina_EJECUTADO_PAGADO: this.pasfina_EJECUTADO_PAGADO,
        pasfina_ASIGNACION_INICIAL: this.pasfina_ASIGNACION_INICIAL,
        id_PASFINA: this.id_PASFINA,
        ppro_CODIGO_RAPIDO : ""
      };

      this.serviceAspectosFinacieros.updateAspectosFinancieros(aspectosFinacieros).subscribe(
        (response: any) => {
          if (response && response.message === 'Aspectos Financieros actualizados correctamente') {
            alert("DATOS DE LOS ASPECTOS FINANCIEROS ACTUALIZADOS CON ÉXITO");

            this.router.navigate(['aspectosFinancieros']);

          } else {
            alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LOS ASPECTOS FINANCIEROS");
            form.reset();
          }
        },
        error => {
          console.error("Error al actualizar", error);
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LOS ASPECTOS FINANCIEROS");
          form.reset();
        }
      );
    }

  }

  confirmarActualizacion(form: NgForm): void {
    if (window.confirm('¿Estás seguro de que deseas actualizar el registro?')) {
      this.actualizarAspectosFinancieros(form);
    }
  }

}
