import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AspectosFinancieros } from 'src/app/modelo/aspectosFinacieros';
import { AspectosTecnicos } from 'src/app/modelo/aspectosTecnicos';
import { AspectosTecnicosRestService } from 'src/app/services/aspectos-tecnicos-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-insert-update-aspectos-tecnicos',
  templateUrl: './insert-update-aspectos-tecnicos.component.html',
  styleUrls: ['./insert-update-aspectos-tecnicos.component.css']
})
export class InsertUpdateAspectosTecnicosComponent {



  //aspectos tecnicos
  paste_VIVIENDAS_CON_SERVICIO_E: number;
  paste_VIVIENDAS_CON_SERVICIO_P: number;
  paste_VIVIENDAS_SIN_SERVICIO_E: number;
  paste__PO_IN_SUB_DISTRI_NUEV_E: number;
  paste_VIVIENDAS_SIN_SERVICIO_P: number;
  paste__PO_IN_SUB_DISTRI_NUEV_P: number;
  paste_AV_EJECUTADO: number;
  paste_MV_EJECUTADO: number;
  paste_BV_EJECUTADO: number;
  paste_BV_PLANFIICADO: number;
  paste_MEDIDORES_EJEC: number;
  paste_MEDIDORES_PLANI: number;
  paste_ACOMO_MEDI_EJEC: number;
  paste_MV_PLANFIICADO: number;
  paste_AV_PLANFIICADO: number;
  ptipeam_TIPO_PER_AMBIENTAL: string;
  paste_TOTAL_VIVIENDA_PLANI: number;
  paste_TRAN_DISTRIBUCION_EJEC: number;
  paste_PO_IN_TRAN__DIST_PLANI: number;
  paste_EMPLE_DIRE_GENERA: number;
  paste_BENEFI_DIRECT_EJEC: number;
  paste_BENEFI_DIRECT_PLANI: number;
  paste_LUMINARIA_NUEVAS_EJEC: number;
  paste_LUMINARIA_NUEVAS_PLANI: number;
  paste_TRAN_DISTRIBUCION_PLANI: number;
  paste_TOTAL_VIVIENDA_EJEC: number;
  paste_PO_IN_TRAN__DIST_EJEC: number;
  paste_ACOMO_MEDI_PLANI: number;
  paste_SUBE_DISTRI_NUEV_PLANI: number;
  paste_SUBE_DISTRI_NUEV_EJEC: number;
  nombre_proyecto: string;
  codigo_rapido: string;
  id_PPRO_CODIGO_UNICO_aspectos_tecnicos: number;
  id_PASTE: number;

  paste_FECHA_ASPEC_TECNICOS: string;
  paste_FECH_OB_PERM_AMBI_PLANI: Date;
  paste_FECH_OB_PERM_AMBI_EJEC: Date;

  //select Tipo ambiental 
  id_PTIPEAM: number;
  selectTipoAmbiental: number;
  tipoAmbiental: AspectosTecnicos[];


  constructor(
    private cdr: ChangeDetectorRef,
    private serviceAspectosTecnicos: AspectosTecnicosRestService,
    private sharedService: SharedIDService,
    private router: Router
  ) {
    this.id_PPRO_CODIGO_UNICO_aspectos_tecnicos = this.sharedService.getCodigoUnico();
  }



  ngOnInit() {

    this.buscarDatosAspectosTecnicos();
    this.cargarDatosAmbiental();


  }


  onSubmitAspectosTecnicos(form: any) {


    const fechaAspectosTecnicos = new Date(this.paste_FECHA_ASPEC_TECNICOS + 'T00:00:00');  // Convertir la cadena a un objeto Date
    const fechaPermAmbiPlani = new Date(this.paste_FECH_OB_PERM_AMBI_PLANI + 'T00:00:00');
    const fechaPermAmbiEjec = new Date(this.paste_FECH_OB_PERM_AMBI_EJEC + 'T00:00:00');




    if (form.valid) {
      const nuevoAspectosTecnicos = new AspectosTecnicos(fechaAspectosTecnicos,
        this.selectTipoAmbiental,
        this.paste_BENEFI_DIRECT_PLANI,
        this.paste_BENEFI_DIRECT_EJEC,
        this.paste_VIVIENDAS_CON_SERVICIO_P,
        this.paste_VIVIENDAS_CON_SERVICIO_E,
        this.paste_VIVIENDAS_SIN_SERVICIO_P,
        this.paste_VIVIENDAS_SIN_SERVICIO_E,
        this.paste_TOTAL_VIVIENDA_PLANI,
        this.paste_TOTAL_VIVIENDA_EJEC,
        this.paste_LUMINARIA_NUEVAS_PLANI,
        this.paste_LUMINARIA_NUEVAS_EJEC,
        this.paste_AV_PLANFIICADO,
        this.paste_AV_EJECUTADO,
        this.paste_MV_PLANFIICADO,
        this.paste_MV_EJECUTADO,
        this.paste_BV_PLANFIICADO,
        this.paste_BV_EJECUTADO,
        this.paste_ACOMO_MEDI_PLANI,
        this.paste_ACOMO_MEDI_EJEC,
        this.paste_MEDIDORES_PLANI,
        this.paste_MEDIDORES_EJEC,
        this.paste_TRAN_DISTRIBUCION_EJEC,
        this.paste_TRAN_DISTRIBUCION_PLANI,
        this.paste_PO_IN_TRAN__DIST_PLANI,
        this.paste_PO_IN_TRAN__DIST_EJEC,
        this.paste_SUBE_DISTRI_NUEV_PLANI,
        this.paste_SUBE_DISTRI_NUEV_EJEC,
        this.paste__PO_IN_SUB_DISTRI_NUEV_P,
        this.paste__PO_IN_SUB_DISTRI_NUEV_E,
        fechaPermAmbiPlani,
        fechaPermAmbiEjec,
        this.paste_EMPLE_DIRE_GENERA,
        this.id_PPRO_CODIGO_UNICO_aspectos_tecnicos);

      this.serviceAspectosTecnicos.insertaAspectosTecnicos(nuevoAspectosTecnicos).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Aspectos tecnicos creados correctamente') {
            alert("ASPECTOS TECNICOS CREADOS CON ÉXITO");
            //form.reset();

            this.router.navigate(['aspectosTecnicos']);
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LOS ASPECTOS TECNICOS");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS ASPECTOS TECNICOS");
          form.reset();
          //window.location.reload();
        }
      );
    }
  }
  isNumeric(value: any): boolean {
    return !isNaN(value);
  }

  cargarDatosAmbiental() {
    this.serviceAspectosTecnicos.getListarTipoAmbiental().subscribe(
      (data) => {
        this.tipoAmbiental = data;
        //console.log(this.tipoAmbiental);
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  seleccionarTipoAmbiental(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoAmbiental = parseFloat(target.value);

    console.log('Tipo de amabiental seleccionado:', this.selectTipoAmbiental);

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


  buscarDatosAspectosTecnicos() {
    this.serviceAspectosTecnicos.getListarAspectosTecnicos2(this.id_PPRO_CODIGO_UNICO_aspectos_tecnicos).subscribe(
      (response: any) => {
        //console.log('Datos de aspectos tecnicos:', response);
        //console.log("id_PASTE:", response[0].id_PASTE);
        if (response && response.length && response[0].id_PASTE !== 0) {
          this.paste_FECHA_ASPEC_TECNICOS = this.formatoFechaActual();
          this.ptipeam_TIPO_PER_AMBIENTAL = response[0].ptipeam_TIPO_PER_AMBIENTAL;
          this.paste_BENEFI_DIRECT_PLANI = response[0].paste_BENEFI_DIRECT_PLANI;
          this.paste_BENEFI_DIRECT_EJEC = response[0].paste_BENEFI_DIRECT_EJEC;
          this.paste_VIVIENDAS_CON_SERVICIO_P = response[0].paste_VIVIENDAS_CON_SERVICIO_P;
          this.paste_VIVIENDAS_CON_SERVICIO_E = response[0].paste_VIVIENDAS_CON_SERVICIO_E;
          this.paste_VIVIENDAS_SIN_SERVICIO_P = response[0].paste_VIVIENDAS_SIN_SERVICIO_P;
          this.paste_VIVIENDAS_SIN_SERVICIO_E = response[0].paste_VIVIENDAS_SIN_SERVICIO_E;
          this.paste_TOTAL_VIVIENDA_PLANI = response[0].paste_TOTAL_VIVIENDA_PLANI;
          this.paste_TOTAL_VIVIENDA_EJEC = response[0].paste_TOTAL_VIVIENDA_EJEC;
          this.paste_LUMINARIA_NUEVAS_PLANI = response[0].paste_LUMINARIA_NUEVAS_PLANI;
          this.paste_LUMINARIA_NUEVAS_EJEC = response[0].paste_LUMINARIA_NUEVAS_EJEC;
          this.paste_AV_PLANFIICADO = response[0].paste_AV_PLANFIICADO;
          this.paste_AV_EJECUTADO = response[0].paste_AV_EJECUTADO;
          this.paste_MV_PLANFIICADO = response[0].paste_MV_PLANFIICADO;
          this.paste_MV_EJECUTADO = response[0].paste_MV_EJECUTADO;
          this.paste_BV_PLANFIICADO = response[0].paste_BV_PLANFIICADO;
          this.paste_BV_EJECUTADO = response[0].paste_BV_EJECUTADO;
          this.paste_ACOMO_MEDI_PLANI = response[0].paste_ACOMO_MEDI_PLANI;
          this.paste_ACOMO_MEDI_EJEC = response[0].paste_ACOMO_MEDI_EJEC;
          this.paste_MEDIDORES_PLANI = response[0].paste_MEDIDORES_PLANI;
          this.paste_MEDIDORES_EJEC = response[0].paste_MEDIDORES_EJEC;
          this.paste_TRAN_DISTRIBUCION_EJEC = response[0].paste_TRAN_DISTRIBUCION_EJEC;
          this.paste_TRAN_DISTRIBUCION_PLANI = response[0].paste_TRAN_DISTRIBUCION_PLANI;
          this.paste_PO_IN_TRAN__DIST_PLANI = response[0].paste_PO_IN_TRAN__DIST_PLANI;
          this.paste_PO_IN_TRAN__DIST_EJEC = response[0].paste_PO_IN_TRAN__DIST_EJEC;
          this.paste_SUBE_DISTRI_NUEV_PLANI = response[0].paste_SUBE_DISTRI_NUEV_PLANI;
          this.paste_SUBE_DISTRI_NUEV_EJEC = response[0].paste_SUBE_DISTRI_NUEV_EJEC;
          this.paste__PO_IN_SUB_DISTRI_NUEV_P = response[0].paste__PO_IN_SUB_DISTRI_NUEV_P;
          this.paste__PO_IN_SUB_DISTRI_NUEV_E = response[0].paste__PO_IN_SUB_DISTRI_NUEV_E;
          this.paste_FECH_OB_PERM_AMBI_PLANI = response[0].paste_FECH_OB_PERM_AMBI_PLANI;
          this.paste_FECH_OB_PERM_AMBI_EJEC = response[0].paste_FECH_OB_PERM_AMBI_EJEC;
          this.paste_EMPLE_DIRE_GENERA = response[0].paste_EMPLE_DIRE_GENERA;
          this.id_PTIPEAM = response[0].id_PTIPEAM;

          this.selectTipoAmbiental = response[0].id_PTIPEAM;


          this.id_PASTE = response[0].id_PASTE;


          console.log(this.paste_FECHA_ASPEC_TECNICOS);

        } else {
          this.paste_FECHA_ASPEC_TECNICOS = this.formatoFechaActual();
          alert("Todavía no existe ningún aspecto técnico, ingréselos");


        }
      },
      (error) => {

        console.error('Error al obtener los datos:', error);
      }
    );
  }


  actualizarAspectosTecnicos(form: any) {

    const fechaAspectosTecnicos = new Date(this.paste_FECHA_ASPEC_TECNICOS);
    const fechaAmbienPlani = new Date(this.paste_FECH_OB_PERM_AMBI_PLANI);
    const fechaAmbienEjec = new Date(this.paste_FECH_OB_PERM_AMBI_EJEC);

    if (form.valid) {
      const aspectosTecnicos: AspectosTecnicos = {

        paste_VIVIENDAS_CON_SERVICIO_E: this.paste_VIVIENDAS_CON_SERVICIO_E,
        paste_VIVIENDAS_CON_SERVICIO_P: this.paste_VIVIENDAS_CON_SERVICIO_P,
        paste_VIVIENDAS_SIN_SERVICIO_E: this.paste_VIVIENDAS_SIN_SERVICIO_E,
        paste__PO_IN_SUB_DISTRI_NUEV_E: this.paste__PO_IN_SUB_DISTRI_NUEV_E,
        paste_VIVIENDAS_SIN_SERVICIO_P: this.paste_VIVIENDAS_SIN_SERVICIO_P,
        paste__PO_IN_SUB_DISTRI_NUEV_P: this.paste__PO_IN_SUB_DISTRI_NUEV_P,
        id_PTIPEAM: this.selectTipoAmbiental,
        paste_AV_EJECUTADO: this.paste_AV_EJECUTADO,
        paste_MV_EJECUTADO: this.paste_MV_EJECUTADO,
        paste_BV_EJECUTADO: this.paste_BV_EJECUTADO,
        paste_BV_PLANFIICADO: this.paste_BV_PLANFIICADO,
        paste_MEDIDORES_EJEC: this.paste_MEDIDORES_EJEC,
        paste_MEDIDORES_PLANI: this.paste_MEDIDORES_EJEC,
        /*nulo*/id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO_aspectos_tecnicos,
        paste_ACOMO_MEDI_EJEC: this.paste_ACOMO_MEDI_EJEC,
        paste_MV_PLANFIICADO: this.paste_MV_PLANFIICADO,
        paste_AV_PLANFIICADO: this.paste_AV_PLANFIICADO,
        ptipeam_TIPO_PER_AMBIENTAL: this.ptipeam_TIPO_PER_AMBIENTAL,
        paste_TOTAL_VIVIENDA_PLANI: this.paste_TOTAL_VIVIENDA_PLANI,
        paste_FECH_OB_PERM_AMBI_EJEC: fechaAmbienEjec,
        paste_TRAN_DISTRIBUCION_EJEC: this.paste_TRAN_DISTRIBUCION_EJEC,
        paste_PO_IN_TRAN__DIST_PLANI: this.paste_PO_IN_TRAN__DIST_PLANI,
        paste_EMPLE_DIRE_GENERA: this.paste_EMPLE_DIRE_GENERA,
        paste_BENEFI_DIRECT_EJEC: this.paste_BENEFI_DIRECT_EJEC,
        paste_FECHA_ASPEC_TECNICOS: fechaAspectosTecnicos,
        paste_BENEFI_DIRECT_PLANI: this.paste_BENEFI_DIRECT_PLANI,
        paste_LUMINARIA_NUEVAS_EJEC: this.paste_LUMINARIA_NUEVAS_EJEC,
        paste_LUMINARIA_NUEVAS_PLANI: this.paste_LUMINARIA_NUEVAS_PLANI,
        paste_TRAN_DISTRIBUCION_PLANI: this.paste_TRAN_DISTRIBUCION_PLANI,
        paste_FECH_OB_PERM_AMBI_PLANI: fechaAmbienPlani,
        paste_TOTAL_VIVIENDA_EJEC: this.paste_TOTAL_VIVIENDA_EJEC,
        paste_PO_IN_TRAN__DIST_EJEC: this.paste_PO_IN_TRAN__DIST_EJEC,
        paste_ACOMO_MEDI_PLANI: this.paste_ACOMO_MEDI_PLANI,
        paste_SUBE_DISTRI_NUEV_PLANI: this.paste_SUBE_DISTRI_NUEV_PLANI,
        paste_SUBE_DISTRI_NUEV_EJEC: this.paste_SUBE_DISTRI_NUEV_EJEC,
        id_PASTE: this.id_PASTE,
        ppro_CODIGO_RAPIDO: "",



      };

      this.serviceAspectosTecnicos.updateAspectosTecnicos(aspectosTecnicos).subscribe(
        (response: any) => {
          if (response && response.message === 'Aspectos tecnicos actualizados correctamente') {
            alert("DATOS DE LOS ASPECTOS TECNICOS ACTUALIZADOS CON ÉXITO");

            this.router.navigate(['aspectosTecnicos']);

          } else {
            alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LOS ASPECTOS TECNICOS");
            //form.reset();
          }
        },
        error => {
          console.error("Error al actualizar", error);
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LOS ASPECTOS TECNICOS");
          ///form.reset();
        }
      );
    }
  }


  confirmarActualizacion(form: NgForm): void {
    if (window.confirm('¿Estás seguro de que deseas actualizar el registro?')) {
      this.actualizarAspectosTecnicos(form);
    }
  }


}
