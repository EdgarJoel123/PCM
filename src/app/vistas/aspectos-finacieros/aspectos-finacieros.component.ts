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



  id_PPRO_CODIGO_UNICO: number;

  total_trasferido: number;


  tienePermisoListar: boolean = false;
  tienePermisoIngresarBoton: boolean = false;


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
  
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Verificar permisos para cada operación
    userData.forEach((operacion: any) => {
      if (operacion.id_MODULO === 41) {
        if (operacion.id_OPERACION === 50) {
          this.tienePermisoListar = true;
        }
        if (operacion.id_OPERACION === 51) {
          this.tienePermisoIngresarBoton = true;
        }
      }
    });



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

  listarGeneracion() {
    this.service.getListarAspectosFinancieros1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.listadoGeneracion = data;

        this.total_trasferido = data[0].pasfina_EJECUTADO + data[0].pasfina_ANTICIPO_NO_AMORTI;
        //console.log(this.total_trasferido);

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
