import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proforma } from 'src/app/modelo/proforma';
import { ProformaRestService } from 'src/app/services/proforma-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-insert-update-proforma',
  templateUrl: './insert-update-proforma.component.html',
  styleUrls: ['./insert-update-proforma.component.css']
})
export class InsertUpdateProformaComponent {


  //proforma

  pproin_VALOR_TOTAL_PROYECTO_PR: number;
  pproin_PRESUPUESTO_PROFORMA: number;
  pproin_ANIO: string;
  id_PPRO_CODIGO_UNICO_proforma: number;
  pproin_PROFORMA: number;
  id_PPROIN: number;
  pproin_FECHA: string;
  //anio
  currentYear: number; // Definir propiedad en la clase


  constructor(private serviceProforma: ProformaRestService, private sharedService: SharedIDService, private router: Router) {
    this.id_PPRO_CODIGO_UNICO_proforma = this.sharedService.getCodigoUnico();

  }

  ngOnInit() {
    this.buscarDatosProforma();
  }

  onSubmitProfroma(form: any) {

    const fechaProforma = new Date(this.pproin_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria

    if (form.valid) {
      const proforma = new Proforma(
        this.id_PPRO_CODIGO_UNICO_proforma,
        this.pproin_VALOR_TOTAL_PROYECTO_PR,
        this.pproin_PROFORMA,
        this.pproin_PRESUPUESTO_PROFORMA,
        this.pproin_ANIO,
        fechaProforma
      );

      this.serviceProforma.insertaProforma(proforma).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Proforma creada correctamente') {
            alert("DATOS DE PROFORMA CREADOS CON ÉXITO");
            //form.reset();
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor

            this.router.navigate(['proforma']);

          } else {
            alert("NO SE PUDO CREAR LOS DATOS DE LA PROFORMA");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS DATOS DE LA PROFORMA");
          form.reset();
          //window.location.reload();
        }
      );
    }
  }

  onKeyPressAnioProforma(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^\d+$/.test(charStr) || this.pproin_ANIO?.length >= 4) {
      event.preventDefault();
    }
  }

  onYearChangeAnioProforma() {
    const year = parseInt(this.pproin_ANIO);
    if (year > this.currentYear) {
      alert('El año no puede ser mayor al actual');
      this.pproin_ANIO = '';
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
    this.serviceProforma.getListarProforma2(this.id_PPRO_CODIGO_UNICO_proforma).subscribe(
      (response: any) => {
        console.log('Datos de proforma:', response);

        // Verifica si hay datos en el array y si ppro_NOMBRE_PROY está presente
        if (response && response.length) {
          // this.paste_FECHA_ASPEC_TECNICOS = this.formatoFechaActual();
          this.pproin_ANIO = response[0].pproin_ANIO;
          this.pproin_VALOR_TOTAL_PROYECTO_PR = response[0].pproin_VALOR_TOTAL_PROYECTO_PR;
          this.pproin_PROFORMA = response[0].pproin_PROFORMA;
          this.pproin_PRESUPUESTO_PROFORMA = response[0].pproin_PRESUPUESTO_PROFORMA;
          this.pproin_FECHA = this.formatoFechaActual();
          this.id_PPROIN =  response[0].id_PPROIN;


          console.log(this.id_PPROIN);


        } else {
          alert("Todavia no existe ninguna Proforma, ingresela")

        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }



  actualizarProforma(form: any) {
    const fechaProforma = new Date(this.pproin_FECHA);

    if (form.valid) {
      const proforma: Proforma = {

        pproin_VALOR_TOTAL_PROYECTO_PR: this.pproin_VALOR_TOTAL_PROYECTO_PR, 
        pproin_PRESUPUESTO_PROFORMA: this.pproin_PRESUPUESTO_PROFORMA,
        pproin_ANIO: this.pproin_ANIO,
         /** valor nulo*/  id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO_proforma,
         /** valor nulo*/  ppro_CODIGO_RAPIDO: "",
        pproin_PROFORMA: this.pproin_PROFORMA,
        id_PPROIN: this.id_PPROIN,
        pproin_FECHA: fechaProforma,

     

      };

      this.serviceProforma.updateProforma(proforma).subscribe(
        (response: any) => {
          if (response && response.message === 'Proforma actualizada correctamente') {
            alert("DATOS DE LA PROFORMA ACTUALIZADOS CON ÉXITO");

          
            this.router.navigate(['proforma']);

          } else {
            alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LA PROFORMA");
            //form.reset();
          }
        },
        error => {
          console.error("Error al actualizar", error);
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LA PROFORMA");
          //form.reset();
        }
      );
    }
  }
}
