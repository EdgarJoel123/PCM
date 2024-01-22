import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AspectosFinancieros } from 'src/app/modelo/aspectosFinacieros';
import { AspectosFinancierosRestService } from 'src/app/services/aspectos-financieros-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-aspectos-finacieros',
  templateUrl: './aspectos-finacieros.component.html',
  styleUrls: ['./aspectos-finacieros.component.css']
})
export class AspectosFinancierosComponent {

  
  opcionSeleccionada: string = 'GENERACION'; // Valor por defecto

  palabraBusquedaGeneracion: string;
  contadorResultadosGeneracion: number = 0;
  resultadosBusquedaGeneracion: AspectosFinancieros[];
  listadoGeneracion: AspectosFinancieros[];
  //listadoGeneracionTodos: AspectosFinancieros[];

/*
  palabraBusquedaSubtrasmicion: string;
  contadorResultadosSubtrasmicion: number = 0;
  resultadosBusquedaSubtrasmicion: AspectosFinancieros[];
  listadoSubtrasmicion: AspectosFinancieros[];

  palabraBusquedaDistribucion: string;
  contadorResultadosDistribucion: number = 0;
  resultadosBusquedaDistribucion: AspectosFinancieros[];
  listadoDistribucion: AspectosFinancieros[];


  palabraBusquedaAlumbrado: string;
  contadorResultadosAlumbrado: number = 0;
  resultadosBusquedaAlumbrado: AspectosFinancieros[];
  listadoAlumbrado: AspectosFinancieros[];


  palabraBusquedaAcometidasMedidores: string;
  contadorResultadosAcometidasMedidores: number = 0;
  resultadosBusquedaAcometidasMedidores: AspectosFinancieros[];
  listadoAcometidasMedidores: AspectosFinancieros[];


  palabraBusquedaInversiones: string;
  contadorResultadosInversiones: number = 0;
  resultadosBusquedaInversiones: AspectosFinancieros[];
  listadoInversiones: AspectosFinancieros[];*/



  id_PPRO_CODIGO_UNICO: number;


  constructor(private service: AspectosFinancierosRestService, private sharedService: SharedIDService) { 
    this.id_PPRO_CODIGO_UNICO = sharedService.getCodigoUnico();
  }


  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('aspectosFinancieros');
  
    if (!DATA) {
      console.error('Element with id "aspectosFinancieros" not found.');
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
      docResult.save(`${new Date().toISOString()}aspectosFinancieros.pdf`);
    });
  }

  downloadExel(): void {
    const name = 'aspectosFinancieros.xlsx';  
    let element = document.getElementById('aspectosFinancieros');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book,name);
  }

  ngOnInit() {

    this.listarGeneracion();
   /* this.listarSubtrasmicion();
    this.listarDistribucion();
    this.listarAlumbrado();
    this.listarAcometidas();
    this.listarInversiones();


    // this.listarGeneracionActual();*/



  }

  buscarPalabraGeneracion(palabra: string) {

    this.resultadosBusquedaGeneracion = this.listadoGeneracion.filter(generacion => {
      return (generacion.ppro_CODIGO_RAPIDO && generacion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_FECHA && generacion.pasfina_FECHA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_PRESU_CODIFICADO && generacion.pasfina_PRESU_CODIFICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_DEVENGADO && generacion.pasfina_DEVENGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_EJECUTADO && generacion.pasfina_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_ASIGNACION_INICIAL && generacion.pasfina_ASIGNACION_INICIAL.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_REFORMAS && generacion.pasfina_REFORMAS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_PRE_COMPROMISO && generacion.pasfina_PRE_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_COMPROMISO && generacion.pasfina_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_EJECUTADO_PAGADO && generacion.pasfina_EJECUTADO_PAGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pasfina_ANTICIPO_NO_AMORTI && generacion.pasfina_ANTICIPO_NO_AMORTI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
    });

    this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;



    if (this.resultadosBusquedaGeneracion.length === 0) {

      return;

    }
  }

 /* buscarPalabraSubtrasmicion(palabra: string) {


    this.resultadosBusquedaSubtrasmicion = this.listadoSubtrasmicion.filter(subtrasmicion => {
      return (subtrasmicion.ppro_CODIGO_RAPIDO && subtrasmicion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_FECHA && subtrasmicion.pasfina_FECHA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_PRESU_CODIFICADO && subtrasmicion.pasfina_PRESU_CODIFICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_DEVENGADO && subtrasmicion.pasfina_DEVENGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_EJECUTADO && subtrasmicion.pasfina_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_ASIGNACION_INICIAL && subtrasmicion.pasfina_ASIGNACION_INICIAL.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_REFORMAS && subtrasmicion.pasfina_REFORMAS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_PRE_COMPROMISO && subtrasmicion.pasfina_PRE_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_COMPROMISO && subtrasmicion.pasfina_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_EJECUTADO_PAGADO && subtrasmicion.pasfina_EJECUTADO_PAGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pasfina_ANTICIPO_NO_AMORTI && subtrasmicion.pasfina_ANTICIPO_NO_AMORTI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
  });

    this.contadorResultadosSubtrasmicion = this.resultadosBusquedaSubtrasmicion.length;

    if (this.resultadosBusquedaSubtrasmicion.length === 0) {

      return;

    }
  }

  buscarPalabraDistribucion(palabra: string) {


    this.resultadosBusquedaDistribucion = this.listadoDistribucion.filter(distribucion => {
      return (distribucion.ppro_CODIGO_RAPIDO && distribucion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_FECHA && distribucion.pasfina_FECHA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_PRESU_CODIFICADO && distribucion.pasfina_PRESU_CODIFICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_DEVENGADO && distribucion.pasfina_DEVENGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_EJECUTADO && distribucion.pasfina_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_ASIGNACION_INICIAL && distribucion.pasfina_ASIGNACION_INICIAL.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_REFORMAS && distribucion.pasfina_REFORMAS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_PRE_COMPROMISO && distribucion.pasfina_PRE_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_COMPROMISO && distribucion.pasfina_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_EJECUTADO_PAGADO && distribucion.pasfina_EJECUTADO_PAGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pasfina_ANTICIPO_NO_AMORTI && distribucion.pasfina_ANTICIPO_NO_AMORTI.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))
  });

    this.contadorResultadosDistribucion = this.resultadosBusquedaDistribucion.length;

    if (this.resultadosBusquedaDistribucion.length === 0) {

      return;

    }
  }

  buscarPalabraAlumbrado(palabra: string) {


    this.resultadosBusquedaAlumbrado = this.listadoAlumbrado.filter(alumbrado => {
      return (alumbrado.ppro_CODIGO_RAPIDO && alumbrado.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_FECHA && alumbrado.pasfina_FECHA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_PRESU_CODIFICADO && alumbrado.pasfina_PRESU_CODIFICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_DEVENGADO && alumbrado.pasfina_DEVENGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_EJECUTADO && alumbrado.pasfina_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_ASIGNACION_INICIAL && alumbrado.pasfina_ASIGNACION_INICIAL.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_REFORMAS && alumbrado.pasfina_REFORMAS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_PRE_COMPROMISO && alumbrado.pasfina_PRE_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_COMPROMISO && alumbrado.pasfina_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_EJECUTADO_PAGADO && alumbrado.pasfina_EJECUTADO_PAGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pasfina_ANTICIPO_NO_AMORTI && alumbrado.pasfina_ANTICIPO_NO_AMORTI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
  });

    this.contadorResultadosAlumbrado = this.resultadosBusquedaAlumbrado.length;

    if (this.resultadosBusquedaAlumbrado.length === 0) {

      return;

    }
  }

  buscarPalabraAcometidas(palabra: string) {


    this.resultadosBusquedaAcometidasMedidores = this.listadoAcometidasMedidores.filter(acometidas => {
      return (acometidas.ppro_CODIGO_RAPIDO && acometidas.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_FECHA && acometidas.pasfina_FECHA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_PRESU_CODIFICADO && acometidas.pasfina_PRESU_CODIFICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_DEVENGADO && acometidas.pasfina_DEVENGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_EJECUTADO && acometidas.pasfina_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_ASIGNACION_INICIAL && acometidas.pasfina_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_REFORMAS && acometidas.pasfina_REFORMAS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_PRE_COMPROMISO && acometidas.pasfina_PRE_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_COMPROMISO && acometidas.pasfina_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_EJECUTADO_PAGADO && acometidas.pasfina_EJECUTADO_PAGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pasfina_ANTICIPO_NO_AMORTI && acometidas.pasfina_ANTICIPO_NO_AMORTI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
  });

    this.contadorResultadosAcometidasMedidores = this.resultadosBusquedaAcometidasMedidores.length;

    if (this.resultadosBusquedaAcometidasMedidores.length === 0) {

      return;

    }
  }

  buscarPalabraInversiones(palabra: string) {


  this.resultadosBusquedaInversiones = this.listadoInversiones.filter(inversiones => {
    return (inversiones.ppro_CODIGO_RAPIDO && inversiones.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_FECHA && inversiones.pasfina_FECHA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_PRESU_CODIFICADO && inversiones.pasfina_PRESU_CODIFICADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_DEVENGADO && inversiones.pasfina_DEVENGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_EJECUTADO && inversiones.pasfina_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_EJECUTADO && inversiones.pasfina_EJECUTADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_REFORMAS && inversiones.pasfina_REFORMAS.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_PRE_COMPROMISO && inversiones.pasfina_PRE_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_COMPROMISO && inversiones.pasfina_COMPROMISO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_EJECUTADO_PAGADO && inversiones.pasfina_EJECUTADO_PAGADO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pasfina_ANTICIPO_NO_AMORTI && inversiones.pasfina_ANTICIPO_NO_AMORTI.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
});

    this.contadorResultadosInversiones = this.resultadosBusquedaInversiones.length;

    if (this.resultadosBusquedaInversiones.length === 0) {

      return;

    }
  }*/

  listarGeneracion() {
    this.service.getListarAspectosFinancieros1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.listadoGeneracion = data;
        //console.log(this.listadoGeneracion);

      })
  }



  /*listarGeneracionActual() {
    this.service.getListarAspectosFinancieros1()
      .subscribe(data => {
        const añoActual = new Date().getFullYear();

        // Filtrar los datos donde pasfina_COMPROMISO sea igual al año actual
        this.listadoGeneracion = data.filter((item: { pasfina_EJECUTADO: string; }) => item.pasfina_EJECUTADO === añoActual.toString());

        // Mostrar los datos filtrados en la consola
        console.log(this.listadoGeneracion);
      });
  }*/


  listarTodosGeneracion() {
    this.service.getListarAspectosFinancieros1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.resultadosBusquedaGeneracion = data;
        this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;
        this.palabraBusquedaGeneracion = '';
      })
  }


/*  listarTodosSubtrasmicion(): void {
    this.service.getListarAspectosFinancieros2()
      .subscribe(data => {
        this.resultadosBusquedaSubtrasmicion = data;
        this.contadorResultadosSubtrasmicion = this.resultadosBusquedaSubtrasmicion.length;
        this.palabraBusquedaSubtrasmicion = '';
      })
  }

  listarSubtrasmicion() {
    this.service.getListarAspectosFinancieros2()
      .subscribe(data => {
        this.listadoSubtrasmicion = data;
      })
  }

  listarTodosDistribucion(): void {
    this.service.getListarAspectosFinancieros3()
      .subscribe(data => {
        this.resultadosBusquedaDistribucion = data;
        this.contadorResultadosDistribucion = this.resultadosBusquedaDistribucion.length;
        this.palabraBusquedaDistribucion = '';
      })
  }

  listarDistribucion() {
    this.service.getListarAspectosFinancieros3()
      .subscribe(data => {
        this.listadoDistribucion = data;
      })
  }

  listarTodosAlumbrado(): void {
    this.service.getListarAspectosFinancieros4()
      .subscribe(data => {
        this.resultadosBusquedaAlumbrado = data;
        this.contadorResultadosAlumbrado = this.resultadosBusquedaAlumbrado.length;
        this.palabraBusquedaAlumbrado = '';
      })
  }

  listarAlumbrado() {
    this.service.getListarAspectosFinancieros4()
      .subscribe(data => {
        this.listadoAlumbrado = data;
      })
  }


  listarTodosAcometidas(): void {
    this.service.getListarAspectosFinancieros5()
      .subscribe(data => {
        this.resultadosBusquedaAcometidasMedidores = data;
        this.contadorResultadosAcometidasMedidores = this.resultadosBusquedaAcometidasMedidores.length;
        this.palabraBusquedaAcometidasMedidores = '';
      })
  }

  listarAcometidas() {
    this.service.getListarAspectosFinancieros5()
      .subscribe(data => {
        this.listadoAcometidasMedidores = data;
      })
  }


  listarTodosInversiones(): void {
    this.service.getListarAspectosFinancieros6()
      .subscribe(data => {
        this.resultadosBusquedaInversiones = data;
        this.contadorResultadosInversiones = this.resultadosBusquedaInversiones.length;
        this.palabraBusquedaInversiones = '';
      })
  }

  listarInversiones() {
    this.service.getListarAspectosFinancieros6()
      .subscribe(data => {
        this.listadoInversiones = data;
      })
  }*/


  openEditarModalAspectosFinancieros(AspectosFinancieros: AspectosFinancieros) {
  }

}
