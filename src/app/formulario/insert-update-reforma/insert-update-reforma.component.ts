import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reforma } from 'src/app/modelo/reforma';
import { PrincipalRestService } from 'src/app/services/principal-rest.service';
import { ProformaRestService } from 'src/app/services/proforma-rest.service';
import { ReformaRestService } from 'src/app/services/reforma-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-insert-update-reforma',
  templateUrl: './insert-update-reforma.component.html',
  styleUrls: ['./insert-update-reforma.component.css']
})
export class InsertUpdateReformaComponent {



  //reforma
  prefoin_VALOR_TOTAL_PROYECTO_R: number;
  prefoin_PRESUPUESTO_REFORMA: number;
  prefoin_ANIO: string;
  id_PPRO_CODIGO_UNICO_reforma: number;
  prefoin_REFORMA: number;
  id_PREFOIN: number;
  codigo_rapido_re: string;
  nombre_proyecto_re: string;
  prefoin_FECHA: string;


  //anio
  currentYear: number; // Definir propiedad en la clase




  constructor(private serviceProforma: ProformaRestService, private servicePrincipal: PrincipalRestService,private serviceReforma: ReformaRestService, private sharedService: SharedIDService, private router: Router) {
    this.id_PPRO_CODIGO_UNICO_reforma = this.sharedService.getCodigoUnico();

  }


  ngOnInit() {
    this.buscarDatosReforma();
    this.listarDatosProyecto();
    this.buscarDatosProforma(); 
  }

  listarDatosProyecto() {
    this.servicePrincipal.getListarProyectos1(this.id_PPRO_CODIGO_UNICO_reforma)
      .subscribe(data => {

        //console.log(data[0].ppro_ANIO_CALIFICACION_EJECU);

        this.prefoin_ANIO = data[0].ppro_ANIO_CALIFICACION_EJECU;
        this.prefoin_VALOR_TOTAL_PROYECTO_R = data[0].ppro_MONTO_APRO_ESTUDI_COSTOS;
      })
  }

  onSubmitReforma(form: any) {

    const fechaReforma = new Date(this.prefoin_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria


    if (form.valid) {
      const reforma = new Reforma(
        this.id_PPRO_CODIGO_UNICO_reforma,
        this.prefoin_VALOR_TOTAL_PROYECTO_R,
        this.prefoin_REFORMA,
        this.prefoin_PRESUPUESTO_REFORMA,
        this.prefoin_ANIO,
        fechaReforma
      );

      this.serviceReforma.insertaReforma(reforma).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Reforma creada correctamente') {
            alert("DATOS DE REFORMA CREADOS CON ÉXITO");

            this.router.navigate(['reforma']);
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LOS DATOS DE LA REFORMA");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS DATOS DE LA REFORMA");
          //form.reset();
          //window.location.reload();
        }
      );
    }
  }


  onKeyPressAnioReforma(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^\d+$/.test(charStr) || this.prefoin_ANIO?.length >= 4) {
      event.preventDefault();
    }
  }

  onYearChangeAnioReforma() {
    const year = parseInt(this.prefoin_ANIO);
    if (year > this.currentYear) {
      alert('El año no puede ser mayor al actual');
      this.prefoin_ANIO = '';
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


  buscarDatosProforma() {
    this.serviceProforma.getListarProforma2(this.id_PPRO_CODIGO_UNICO_reforma).subscribe(
      (response: any) => {
        console.log('Datos de proforma:', response);

        // Verifica si hay datos en el array y si ppro_NOMBRE_PROY está presente
        if (response && response.length) {
 
          this.prefoin_REFORMA = response[0].pproin_PRESUPUESTO_PROFORMA;

        
    


        } else {
          alert("Todavia no existe ninguna Proforma, ingresela")

        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  buscarDatosReforma() {
    this.serviceReforma.getListarReforma2(this.id_PPRO_CODIGO_UNICO_reforma).subscribe(
      (response: any) => {
        //console.log('Datos de proforma:', response);

        // Verifica si hay datos en el array y si ppro_NOMBRE_PROY está presente
        if (response && response.length) {
          // this.paste_FECHA_ASPEC_TECNICOS = this.formatoFechaActual();
          this.prefoin_ANIO = response[0].prefoin_ANIO;
          this.prefoin_VALOR_TOTAL_PROYECTO_R = response[0].prefoin_VALOR_TOTAL_PROYECTO_R;
          this.prefoin_REFORMA = response[0].prefoin_REFORMA;
          this.prefoin_PRESUPUESTO_REFORMA = response[0].prefoin_PRESUPUESTO_REFORMA;
          this.prefoin_FECHA = this.formatoFechaActual();
          this.id_PREFOIN = response[0].id_PREFOIN;

          this.listarDatosProyecto();
         this.buscarDatosProforma();


          console.log(this.id_PREFOIN);




        } else {
          alert("Todavia no existe ninguna Proforma, ingresela")

        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  actualizarReforma(form: any) {
    const fechaReforma = new Date(this.prefoin_FECHA);

    if (form.valid) {
      const reforma: Reforma = {

        prefoin_VALOR_TOTAL_PROYECTO_R: this.prefoin_VALOR_TOTAL_PROYECTO_R,
        prefoin_PRESUPUESTO_REFORMA: this.prefoin_PRESUPUESTO_REFORMA,
        prefoin_ANIO: this.prefoin_ANIO,
       /** valor nulo*/ id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO_reforma,
      /** valor nulo*/ ppro_CODIGO_RAPIDO: "",
        prefoin_REFORMA: this.prefoin_REFORMA,
        id_PREFOIN: this.id_PREFOIN,
        prefoin_FECHA: fechaReforma,

      };

      this.serviceReforma.updateReforma(reforma).subscribe(
        (response: any) => {
          if (response && response.message === 'Reforma actualizada correctamente') {
            alert("DATOS DE LA REFORMA ACTUALIZADOS CON ÉXITO");

            this.router.navigate(['reforma']);

          } else {
            alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LA REFORMA");
            //form.reset();
          }
        },
        error => {
          console.error("Error al actualizar", error);
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LA REFORMA");
          //form.reset();
        }
      );
    }
  }


}
