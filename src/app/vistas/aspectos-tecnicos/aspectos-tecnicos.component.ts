import { Component } from '@angular/core';
import { AspectosTecnicos } from 'src/app/modelo/aspectosTecnicos';
import { AspectosTecnicosRestService } from 'src/app/services/aspectos-tecnicos-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-aspectos-tecnicos',
  templateUrl: './aspectos-tecnicos.component.html',
  styleUrls: ['./aspectos-tecnicos.component.css']
})
export class AspectosTecnicosComponent {


  opcionSeleccionada: string = 'GENERACION'; // Valor por defecto

  palabraBusquedaGeneracion: string;
  contadorResultadosGeneracion: number = 0;
  resultadosBusquedaGeneracion: AspectosTecnicos[];
  listadoGeneracion: AspectosTecnicos[];
  //listadoGeneracionTodos: AspectosTecnicos[];


 /* palabraBusquedaSubtrasmicion: string;
  contadorResultadosSubtrasmicion: number = 0;
  resultadosBusquedaSubtrasmicion: AspectosTecnicos[];
  listadoSubtrasmicion: AspectosTecnicos[];

  palabraBusquedaDistribucion: string;
  contadorResultadosDistribucion: number = 0;
  resultadosBusquedaDistribucion: AspectosTecnicos[];
  listadoDistribucion: AspectosTecnicos[];


  palabraBusquedaAlumbrado: string;
  contadorResultadosAlumbrado: number = 0;
  resultadosBusquedaAlumbrado: AspectosTecnicos[];
  listadoAlumbrado: AspectosTecnicos[];


  palabraBusquedaAcometidasMedidores: string;
  contadorResultadosAcometidasMedidores: number = 0;
  resultadosBusquedaAcometidasMedidores: AspectosTecnicos[];
  listadoAcometidasMedidores: AspectosTecnicos[];


  palabraBusquedaInversiones: string;
  contadorResultadosInversiones: number = 0;
  resultadosBusquedaInversiones: AspectosTecnicos[];
  listadoInversiones: AspectosTecnicos[];*/



  id_PPRO_CODIGO_UNICO: number;

  constructor(private service: AspectosTecnicosRestService, private sharedService: SharedIDService) { 
    this.id_PPRO_CODIGO_UNICO = sharedService.getCodigoUnico();
  }

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('aspectosTecnicos');
  
    if (!DATA) {
      console.error('Element with id "aspectosTecnicos" not found.');
      return;
    }
  
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
  
    html2canvas(DATA, options).then((canvas) => {
  
      const img = canvas.toDataURL('image/PNG');
  
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_aspectosTecnicos.pdf`);
    });
  }

  downloadExel(): void {
    const name = 'aspectosTecnicos.xlsx';  
    let element = document.getElementById('aspectosTecnicos');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book,name);
  }
  

  ngOnInit() {

    this.listarGeneracion();
    /*this.listarSubtrasmicion();
    this.listarDistribucion();
    this.listarAlumbrado();
    this.listarAcometidas();
    this.listarInversiones();


    // this.listarGeneracionActual();*/



  }

  buscarPalabraGeneracion(palabra: string) {

    this.resultadosBusquedaGeneracion = this.listadoGeneracion.filter(generacion => {
      return (generacion.ppro_CODIGO_RAPIDO && generacion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_FECHA_ASPEC_TECNICOS && generacion.paste_FECHA_ASPEC_TECNICOS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_BENEFI_DIRECT_PLANI && generacion.paste_BENEFI_DIRECT_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_BENEFI_DIRECT_EJEC && generacion.paste_BENEFI_DIRECT_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_VIVIENDAS_CON_SERVICIO_P && generacion.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_VIVIENDAS_CON_SERVICIO_P && generacion.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_VIVIENDAS_SIN_SERVICIO_P && generacion.paste_VIVIENDAS_SIN_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_VIVIENDAS_SIN_SERVICIO_E && generacion.paste_VIVIENDAS_SIN_SERVICIO_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_TOTAL_VIVIENDA_PLANI && generacion.paste_TOTAL_VIVIENDA_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_TOTAL_VIVIENDA_EJEC && generacion.paste_TOTAL_VIVIENDA_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_LUMINARIA_NUEVAS_PLANI && generacion.paste_LUMINARIA_NUEVAS_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_LUMINARIA_NUEVAS_EJEC && generacion.paste_LUMINARIA_NUEVAS_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_AV_PLANFIICADO && generacion.paste_AV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_AV_EJECUTADO && generacion.paste_AV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_MV_PLANFIICADO && generacion.paste_MV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_MV_EJECUTADO && generacion.paste_MV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_BV_PLANFIICADO && generacion.paste_BV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_BV_EJECUTADO && generacion.paste_BV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_ACOMO_MEDI_PLANI && generacion.paste_ACOMO_MEDI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_ACOMO_MEDI_EJEC && generacion.paste_ACOMO_MEDI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_MEDIDORES_PLANI && generacion.paste_MEDIDORES_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_MEDIDORES_EJEC && generacion.paste_MEDIDORES_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_TRAN_DISTRIBUCION_EJEC && generacion.paste_TRAN_DISTRIBUCION_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_TRAN_DISTRIBUCION_PLANI && generacion.paste_TRAN_DISTRIBUCION_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_PO_IN_TRAN__DIST_PLANI && generacion.paste_PO_IN_TRAN__DIST_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_PO_IN_TRAN__DIST_EJEC && generacion.paste_PO_IN_TRAN__DIST_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_SUBE_DISTRI_NUEV_PLANI && generacion.paste_SUBE_DISTRI_NUEV_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_SUBE_DISTRI_NUEV_EJEC && generacion.paste_SUBE_DISTRI_NUEV_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste__PO_IN_SUB_DISTRI_NUEV_P && generacion.paste__PO_IN_SUB_DISTRI_NUEV_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste__PO_IN_SUB_DISTRI_NUEV_E && generacion.paste__PO_IN_SUB_DISTRI_NUEV_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ptipeam_TIPO_PER_AMBIENTAL && generacion.ptipeam_TIPO_PER_AMBIENTAL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_FECH_OB_PERM_AMBI_PLANI && generacion.paste_FECH_OB_PERM_AMBI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_FECH_OB_PERM_AMBI_EJEC && generacion.paste_FECH_OB_PERM_AMBI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.paste_EMPLE_DIRE_GENERA && generacion.paste_EMPLE_DIRE_GENERA.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

    });

    this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;



    if (this.resultadosBusquedaGeneracion.length === 0) {

      return;

    }
  }

 /* buscarPalabraSubtrasmicion(palabra: string) {


    this.resultadosBusquedaSubtrasmicion = this.listadoSubtrasmicion.filter(subtrasmicion => {
      return (subtrasmicion.ppro_CODIGO_RAPIDO && subtrasmicion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_FECHA_ASPEC_TECNICOS && subtrasmicion.paste_FECHA_ASPEC_TECNICOS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_BENEFI_DIRECT_PLANI && subtrasmicion.paste_BENEFI_DIRECT_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_BENEFI_DIRECT_EJEC && subtrasmicion.paste_BENEFI_DIRECT_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_VIVIENDAS_CON_SERVICIO_P && subtrasmicion.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_VIVIENDAS_CON_SERVICIO_P && subtrasmicion.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_VIVIENDAS_SIN_SERVICIO_P && subtrasmicion.paste_VIVIENDAS_SIN_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_VIVIENDAS_SIN_SERVICIO_E && subtrasmicion.paste_VIVIENDAS_SIN_SERVICIO_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_TOTAL_VIVIENDA_PLANI && subtrasmicion.paste_TOTAL_VIVIENDA_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_TOTAL_VIVIENDA_EJEC && subtrasmicion.paste_TOTAL_VIVIENDA_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_LUMINARIA_NUEVAS_PLANI && subtrasmicion.paste_LUMINARIA_NUEVAS_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_LUMINARIA_NUEVAS_EJEC && subtrasmicion.paste_LUMINARIA_NUEVAS_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_AV_PLANFIICADO && subtrasmicion.paste_AV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_AV_EJECUTADO && subtrasmicion.paste_AV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_MV_PLANFIICADO && subtrasmicion.paste_MV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_MV_EJECUTADO && subtrasmicion.paste_MV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_BV_PLANFIICADO && subtrasmicion.paste_BV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_BV_EJECUTADO && subtrasmicion.paste_BV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_ACOMO_MEDI_PLANI && subtrasmicion.paste_ACOMO_MEDI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_ACOMO_MEDI_EJEC && subtrasmicion.paste_ACOMO_MEDI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_MEDIDORES_PLANI && subtrasmicion.paste_MEDIDORES_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_MEDIDORES_EJEC && subtrasmicion.paste_MEDIDORES_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_TRAN_DISTRIBUCION_EJEC && subtrasmicion.paste_TRAN_DISTRIBUCION_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_TRAN_DISTRIBUCION_PLANI && subtrasmicion.paste_TRAN_DISTRIBUCION_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_PO_IN_TRAN__DIST_PLANI && subtrasmicion.paste_PO_IN_TRAN__DIST_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_PO_IN_TRAN__DIST_EJEC && subtrasmicion.paste_PO_IN_TRAN__DIST_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_SUBE_DISTRI_NUEV_PLANI && subtrasmicion.paste_SUBE_DISTRI_NUEV_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_SUBE_DISTRI_NUEV_EJEC && subtrasmicion.paste_SUBE_DISTRI_NUEV_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste__PO_IN_SUB_DISTRI_NUEV_P && subtrasmicion.paste__PO_IN_SUB_DISTRI_NUEV_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste__PO_IN_SUB_DISTRI_NUEV_E && subtrasmicion.paste__PO_IN_SUB_DISTRI_NUEV_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.ptipeam_TIPO_PER_AMBIENTAL && subtrasmicion.ptipeam_TIPO_PER_AMBIENTAL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_FECH_OB_PERM_AMBI_PLANI && subtrasmicion.paste_FECH_OB_PERM_AMBI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_FECH_OB_PERM_AMBI_EJEC && subtrasmicion.paste_FECH_OB_PERM_AMBI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.paste_EMPLE_DIRE_GENERA && subtrasmicion.paste_EMPLE_DIRE_GENERA.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

  });

    this.contadorResultadosSubtrasmicion = this.resultadosBusquedaSubtrasmicion.length;

    if (this.resultadosBusquedaSubtrasmicion.length === 0) {

      return;

    }
  }

  buscarPalabraDistribucion(palabra: string) {


    this.resultadosBusquedaDistribucion = this.listadoDistribucion.filter(distribucion => {
      return (distribucion.ppro_CODIGO_RAPIDO && distribucion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_FECHA_ASPEC_TECNICOS && distribucion.paste_FECHA_ASPEC_TECNICOS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_BENEFI_DIRECT_PLANI && distribucion.paste_BENEFI_DIRECT_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_BENEFI_DIRECT_EJEC && distribucion.paste_BENEFI_DIRECT_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_VIVIENDAS_CON_SERVICIO_P && distribucion.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_VIVIENDAS_CON_SERVICIO_P && distribucion.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_VIVIENDAS_SIN_SERVICIO_P && distribucion.paste_VIVIENDAS_SIN_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_VIVIENDAS_SIN_SERVICIO_E && distribucion.paste_VIVIENDAS_SIN_SERVICIO_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_TOTAL_VIVIENDA_PLANI && distribucion.paste_TOTAL_VIVIENDA_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_TOTAL_VIVIENDA_EJEC && distribucion.paste_TOTAL_VIVIENDA_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_LUMINARIA_NUEVAS_PLANI && distribucion.paste_LUMINARIA_NUEVAS_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_LUMINARIA_NUEVAS_EJEC && distribucion.paste_LUMINARIA_NUEVAS_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_AV_PLANFIICADO && distribucion.paste_AV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_AV_EJECUTADO && distribucion.paste_AV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_MV_PLANFIICADO && distribucion.paste_MV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_MV_EJECUTADO && distribucion.paste_MV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_BV_PLANFIICADO && distribucion.paste_BV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_BV_EJECUTADO && distribucion.paste_BV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_ACOMO_MEDI_PLANI && distribucion.paste_ACOMO_MEDI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_ACOMO_MEDI_EJEC && distribucion.paste_ACOMO_MEDI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_MEDIDORES_PLANI && distribucion.paste_MEDIDORES_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_MEDIDORES_EJEC && distribucion.paste_MEDIDORES_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_TRAN_DISTRIBUCION_EJEC && distribucion.paste_TRAN_DISTRIBUCION_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_TRAN_DISTRIBUCION_PLANI && distribucion.paste_TRAN_DISTRIBUCION_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_PO_IN_TRAN__DIST_PLANI && distribucion.paste_PO_IN_TRAN__DIST_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_PO_IN_TRAN__DIST_EJEC && distribucion.paste_PO_IN_TRAN__DIST_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_SUBE_DISTRI_NUEV_PLANI && distribucion.paste_SUBE_DISTRI_NUEV_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_SUBE_DISTRI_NUEV_EJEC && distribucion.paste_SUBE_DISTRI_NUEV_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste__PO_IN_SUB_DISTRI_NUEV_P && distribucion.paste__PO_IN_SUB_DISTRI_NUEV_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste__PO_IN_SUB_DISTRI_NUEV_E && distribucion.paste__PO_IN_SUB_DISTRI_NUEV_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.ptipeam_TIPO_PER_AMBIENTAL && distribucion.ptipeam_TIPO_PER_AMBIENTAL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_FECH_OB_PERM_AMBI_PLANI && distribucion.paste_FECH_OB_PERM_AMBI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_FECH_OB_PERM_AMBI_EJEC && distribucion.paste_FECH_OB_PERM_AMBI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.paste_EMPLE_DIRE_GENERA && distribucion.paste_EMPLE_DIRE_GENERA.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

  });

    this.contadorResultadosDistribucion = this.resultadosBusquedaDistribucion.length;

    if (this.resultadosBusquedaDistribucion.length === 0) {

      return;

    }
  }

  buscarPalabraAlumbrado(palabra: string) {


    this.resultadosBusquedaAlumbrado = this.listadoAlumbrado.filter(alumbrado => {
      return (alumbrado.ppro_CODIGO_RAPIDO && alumbrado.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_FECHA_ASPEC_TECNICOS && alumbrado.paste_FECHA_ASPEC_TECNICOS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_BENEFI_DIRECT_PLANI && alumbrado.paste_BENEFI_DIRECT_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_BENEFI_DIRECT_EJEC && alumbrado.paste_BENEFI_DIRECT_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_VIVIENDAS_CON_SERVICIO_P && alumbrado.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_VIVIENDAS_CON_SERVICIO_P && alumbrado.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_VIVIENDAS_SIN_SERVICIO_P && alumbrado.paste_VIVIENDAS_SIN_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_VIVIENDAS_SIN_SERVICIO_E && alumbrado.paste_VIVIENDAS_SIN_SERVICIO_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_TOTAL_VIVIENDA_PLANI && alumbrado.paste_TOTAL_VIVIENDA_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_TOTAL_VIVIENDA_EJEC && alumbrado.paste_TOTAL_VIVIENDA_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_LUMINARIA_NUEVAS_PLANI && alumbrado.paste_LUMINARIA_NUEVAS_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_LUMINARIA_NUEVAS_EJEC && alumbrado.paste_LUMINARIA_NUEVAS_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_AV_PLANFIICADO && alumbrado.paste_AV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_AV_EJECUTADO && alumbrado.paste_AV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_MV_PLANFIICADO && alumbrado.paste_MV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_MV_EJECUTADO && alumbrado.paste_MV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_BV_PLANFIICADO && alumbrado.paste_BV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_BV_EJECUTADO && alumbrado.paste_BV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_ACOMO_MEDI_PLANI && alumbrado.paste_ACOMO_MEDI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_ACOMO_MEDI_EJEC && alumbrado.paste_ACOMO_MEDI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_MEDIDORES_PLANI && alumbrado.paste_MEDIDORES_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_MEDIDORES_EJEC && alumbrado.paste_MEDIDORES_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_TRAN_DISTRIBUCION_EJEC && alumbrado.paste_TRAN_DISTRIBUCION_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_TRAN_DISTRIBUCION_PLANI && alumbrado.paste_TRAN_DISTRIBUCION_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_PO_IN_TRAN__DIST_PLANI && alumbrado.paste_PO_IN_TRAN__DIST_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_PO_IN_TRAN__DIST_EJEC && alumbrado.paste_PO_IN_TRAN__DIST_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_SUBE_DISTRI_NUEV_PLANI && alumbrado.paste_SUBE_DISTRI_NUEV_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_SUBE_DISTRI_NUEV_EJEC && alumbrado.paste_SUBE_DISTRI_NUEV_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste__PO_IN_SUB_DISTRI_NUEV_P && alumbrado.paste__PO_IN_SUB_DISTRI_NUEV_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste__PO_IN_SUB_DISTRI_NUEV_E && alumbrado.paste__PO_IN_SUB_DISTRI_NUEV_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.ptipeam_TIPO_PER_AMBIENTAL && alumbrado.ptipeam_TIPO_PER_AMBIENTAL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_FECH_OB_PERM_AMBI_PLANI && alumbrado.paste_FECH_OB_PERM_AMBI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_FECH_OB_PERM_AMBI_EJEC && alumbrado.paste_FECH_OB_PERM_AMBI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.paste_EMPLE_DIRE_GENERA && alumbrado.paste_EMPLE_DIRE_GENERA.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

  });

    this.contadorResultadosAlumbrado = this.resultadosBusquedaAlumbrado.length;

    if (this.resultadosBusquedaAlumbrado.length === 0) {

      return;

    }
  }

  buscarPalabraAcometidas(palabra: string) {


    this.resultadosBusquedaAcometidasMedidores = this.listadoAcometidasMedidores.filter(acometidas => {
      return (acometidas.ppro_CODIGO_RAPIDO && acometidas.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_FECHA_ASPEC_TECNICOS && acometidas.paste_FECHA_ASPEC_TECNICOS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_BENEFI_DIRECT_PLANI && acometidas.paste_BENEFI_DIRECT_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_BENEFI_DIRECT_EJEC && acometidas.paste_BENEFI_DIRECT_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_VIVIENDAS_CON_SERVICIO_P && acometidas.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_VIVIENDAS_CON_SERVICIO_P && acometidas.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_VIVIENDAS_SIN_SERVICIO_P && acometidas.paste_VIVIENDAS_SIN_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_VIVIENDAS_SIN_SERVICIO_E && acometidas.paste_VIVIENDAS_SIN_SERVICIO_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_TOTAL_VIVIENDA_PLANI && acometidas.paste_TOTAL_VIVIENDA_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_TOTAL_VIVIENDA_EJEC && acometidas.paste_TOTAL_VIVIENDA_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_LUMINARIA_NUEVAS_PLANI && acometidas.paste_LUMINARIA_NUEVAS_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_LUMINARIA_NUEVAS_EJEC && acometidas.paste_LUMINARIA_NUEVAS_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_AV_PLANFIICADO && acometidas.paste_AV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_AV_EJECUTADO && acometidas.paste_AV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_MV_PLANFIICADO && acometidas.paste_MV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_MV_EJECUTADO && acometidas.paste_MV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_BV_PLANFIICADO && acometidas.paste_BV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_BV_EJECUTADO && acometidas.paste_BV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_ACOMO_MEDI_PLANI && acometidas.paste_ACOMO_MEDI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_ACOMO_MEDI_EJEC && acometidas.paste_ACOMO_MEDI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_MEDIDORES_PLANI && acometidas.paste_MEDIDORES_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_MEDIDORES_EJEC && acometidas.paste_MEDIDORES_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_TRAN_DISTRIBUCION_EJEC && acometidas.paste_TRAN_DISTRIBUCION_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_TRAN_DISTRIBUCION_PLANI && acometidas.paste_TRAN_DISTRIBUCION_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_PO_IN_TRAN__DIST_PLANI && acometidas.paste_PO_IN_TRAN__DIST_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_PO_IN_TRAN__DIST_EJEC && acometidas.paste_PO_IN_TRAN__DIST_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_SUBE_DISTRI_NUEV_PLANI && acometidas.paste_SUBE_DISTRI_NUEV_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_SUBE_DISTRI_NUEV_EJEC && acometidas.paste_SUBE_DISTRI_NUEV_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste__PO_IN_SUB_DISTRI_NUEV_P && acometidas.paste__PO_IN_SUB_DISTRI_NUEV_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste__PO_IN_SUB_DISTRI_NUEV_E && acometidas.paste__PO_IN_SUB_DISTRI_NUEV_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.ptipeam_TIPO_PER_AMBIENTAL && acometidas.ptipeam_TIPO_PER_AMBIENTAL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_FECH_OB_PERM_AMBI_PLANI && acometidas.paste_FECH_OB_PERM_AMBI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_FECH_OB_PERM_AMBI_EJEC && acometidas.paste_FECH_OB_PERM_AMBI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.paste_EMPLE_DIRE_GENERA && acometidas.paste_EMPLE_DIRE_GENERA.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

  });

    this.contadorResultadosAcometidasMedidores = this.resultadosBusquedaAcometidasMedidores.length;

    if (this.resultadosBusquedaAcometidasMedidores.length === 0) {

      return;

    }
  }

  buscarPalabraInversiones(palabra: string) {


  this.resultadosBusquedaInversiones = this.listadoInversiones.filter(inversiones => {
    return (inversiones.ppro_CODIGO_RAPIDO && inversiones.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_FECHA_ASPEC_TECNICOS && inversiones.paste_FECHA_ASPEC_TECNICOS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_BENEFI_DIRECT_PLANI && inversiones.paste_BENEFI_DIRECT_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_BENEFI_DIRECT_EJEC && inversiones.paste_BENEFI_DIRECT_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_VIVIENDAS_CON_SERVICIO_P && inversiones.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_VIVIENDAS_CON_SERVICIO_P && inversiones.paste_VIVIENDAS_CON_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_VIVIENDAS_SIN_SERVICIO_P && inversiones.paste_VIVIENDAS_SIN_SERVICIO_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_VIVIENDAS_SIN_SERVICIO_E && inversiones.paste_VIVIENDAS_SIN_SERVICIO_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_TOTAL_VIVIENDA_PLANI && inversiones.paste_TOTAL_VIVIENDA_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_TOTAL_VIVIENDA_EJEC && inversiones.paste_TOTAL_VIVIENDA_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_LUMINARIA_NUEVAS_PLANI && inversiones.paste_LUMINARIA_NUEVAS_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_LUMINARIA_NUEVAS_EJEC && inversiones.paste_LUMINARIA_NUEVAS_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_AV_PLANFIICADO && inversiones.paste_AV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_AV_EJECUTADO && inversiones.paste_AV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_MV_PLANFIICADO && inversiones.paste_MV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_MV_EJECUTADO && inversiones.paste_MV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_BV_PLANFIICADO && inversiones.paste_BV_PLANFIICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_BV_EJECUTADO && inversiones.paste_BV_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_ACOMO_MEDI_PLANI && inversiones.paste_ACOMO_MEDI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_ACOMO_MEDI_EJEC && inversiones.paste_ACOMO_MEDI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_MEDIDORES_PLANI && inversiones.paste_MEDIDORES_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_MEDIDORES_EJEC && inversiones.paste_MEDIDORES_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_TRAN_DISTRIBUCION_EJEC && inversiones.paste_TRAN_DISTRIBUCION_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_TRAN_DISTRIBUCION_PLANI && inversiones.paste_TRAN_DISTRIBUCION_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_PO_IN_TRAN__DIST_PLANI && inversiones.paste_PO_IN_TRAN__DIST_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_PO_IN_TRAN__DIST_EJEC && inversiones.paste_PO_IN_TRAN__DIST_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_SUBE_DISTRI_NUEV_PLANI && inversiones.paste_SUBE_DISTRI_NUEV_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_SUBE_DISTRI_NUEV_EJEC && inversiones.paste_SUBE_DISTRI_NUEV_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste__PO_IN_SUB_DISTRI_NUEV_P && inversiones.paste__PO_IN_SUB_DISTRI_NUEV_P.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste__PO_IN_SUB_DISTRI_NUEV_E && inversiones.paste__PO_IN_SUB_DISTRI_NUEV_E.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.ptipeam_TIPO_PER_AMBIENTAL && inversiones.ptipeam_TIPO_PER_AMBIENTAL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_FECH_OB_PERM_AMBI_PLANI && inversiones.paste_FECH_OB_PERM_AMBI_PLANI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_FECH_OB_PERM_AMBI_EJEC && inversiones.paste_FECH_OB_PERM_AMBI_EJEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.paste_EMPLE_DIRE_GENERA && inversiones.paste_EMPLE_DIRE_GENERA.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

});

    this.contadorResultadosInversiones = this.resultadosBusquedaInversiones.length;

    if (this.resultadosBusquedaInversiones.length === 0) {

      return;

    }
  }*/

  listarGeneracion() {
    this.service.getListarAspectosTecnicos1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.listadoGeneracion = data;
        //console.log(this.listadoGeneracion);

      })
  }

  /*listarGeneracionActual() {
    this.service.getListarAspectosTecnicos1()
      .subscribe(data => {
        const añoActual = new Date().getFullYear();

        // Filtrar los datos donde paste_TOTAL_VIVIENDA_PLANI sea igual al año actual
        this.listadoGeneracion = data.filter((item: { paste_VIVIENDAS_CON_SERVICIO_P: string; }) => item.paste_VIVIENDAS_CON_SERVICIO_P === añoActual.toString());

        // Mostrar los datos filtrados en la consola
        console.log(this.listadoGeneracion);
      });
  }*/


  listarTodosGeneracion() {
    this.service.getListarAspectosTecnicos1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.resultadosBusquedaGeneracion = data;
        this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;
        this.palabraBusquedaGeneracion = '';
      })
  }


 /* listarTodosSubtrasmicion(): void {
    this.service.getListarAspectosTecnicos2()
      .subscribe(data => {
        this.resultadosBusquedaSubtrasmicion = data;
        this.contadorResultadosSubtrasmicion = this.resultadosBusquedaSubtrasmicion.length;
        this.palabraBusquedaSubtrasmicion = '';
      })
  }

  listarSubtrasmicion() {
    this.service.getListarAspectosTecnicos2()
      .subscribe(data => {
        this.listadoSubtrasmicion = data;
      })
  }

  listarTodosDistribucion(): void {
    this.service.getListarAspectosTecnicos3()
      .subscribe(data => {
        this.resultadosBusquedaDistribucion = data;
        this.contadorResultadosDistribucion = this.resultadosBusquedaDistribucion.length;
        this.palabraBusquedaDistribucion = '';
      })
  }

  listarDistribucion() {
    this.service.getListarAspectosTecnicos3()
      .subscribe(data => {
        this.listadoDistribucion = data;
      })
  }

  listarTodosAlumbrado(): void {
    this.service.getListarAspectosTecnicos4()
      .subscribe(data => {
        this.resultadosBusquedaAlumbrado = data;
        this.contadorResultadosAlumbrado = this.resultadosBusquedaAlumbrado.length;
        this.palabraBusquedaAlumbrado = '';
      })
  }

  listarAlumbrado() {
    this.service.getListarAspectosTecnicos4()
      .subscribe(data => {
        this.listadoAlumbrado = data;
      })
  }


  listarTodosAcometidas(): void {
    this.service.getListarAspectosTecnicos5()
      .subscribe(data => {
        this.resultadosBusquedaAcometidasMedidores = data;
        this.contadorResultadosAcometidasMedidores = this.resultadosBusquedaAcometidasMedidores.length;
        this.palabraBusquedaAcometidasMedidores = '';
      })
  }

  listarAcometidas() {
    this.service.getListarAspectosTecnicos5()
      .subscribe(data => {
        this.listadoAcometidasMedidores = data;
      })
  }


  listarTodosInversiones(): void {
    this.service.getListarAspectosTecnicos6()
      .subscribe(data => {
        this.resultadosBusquedaInversiones = data;
        this.contadorResultadosInversiones = this.resultadosBusquedaInversiones.length;
        this.palabraBusquedaInversiones = '';
      })
  }

  listarInversiones() {
    this.service.getListarAspectosTecnicos6()
      .subscribe(data => {
        this.listadoInversiones = data;
      })
  }
*/

  openEditarModalAspectosTecnicos(AspectosTecnicos: AspectosTecnicos) {
  }

}
