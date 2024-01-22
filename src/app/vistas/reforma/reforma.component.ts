import { Component } from '@angular/core';
import { Reforma } from 'src/app/modelo/reforma';
import { ReformaRestService } from 'src/app/services/reforma-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reforma',
  templateUrl: './reforma.component.html',
  styleUrls: ['./reforma.component.css']
})
export class ReformaComponent {
  opcionSeleccionada: string = 'GENERACION'; // Valor por defecto

  palabraBusquedaGeneracion: string;
  contadorResultadosGeneracion: number = 0;
  resultadosBusquedaGeneracion: Reforma[];
  listadoGeneracion: Reforma[];
  //listadoGeneracionTodos: Reforma[];


  /*palabraBusquedaSubtrasmicion: string;
  contadorResultadosSubtrasmicion: number = 0;
  resultadosBusquedaSubtrasmicion: Reforma[];
  listadoSubtrasmicion: Reforma[];

  palabraBusquedaDistribucion: string;
  contadorResultadosDistribucion: number = 0;
  resultadosBusquedaDistribucion: Reforma[];
  listadoDistribucion: Reforma[];


  palabraBusquedaAlumbrado: string;
  contadorResultadosAlumbrado: number = 0;
  resultadosBusquedaAlumbrado: Reforma[];
  listadoAlumbrado: Reforma[];


  palabraBusquedaAcometidasMedidores: string;
  contadorResultadosAcometidasMedidores: number = 0;
  resultadosBusquedaAcometidasMedidores: Reforma[];
  listadoAcometidasMedidores: Reforma[];


  palabraBusquedaInversiones: string;
  contadorResultadosInversiones: number = 0;
  resultadosBusquedaInversiones: Reforma[];
  listadoInversiones: Reforma[];*/

  id_PPRO_CODIGO_UNICO: number;






  constructor(private service: ReformaRestService, private sharedService: SharedIDService) { 
    this.id_PPRO_CODIGO_UNICO = sharedService.getCodigoUnico();
  }


  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('reforma');
  
    if (!DATA) {
      console.error('Element with id "reforma" not found.');
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
      docResult.save(`${new Date().toISOString()}reforma.pdf`);
    });
  }

  downloadExel(): void {
    const name = 'reforma.xlsx';  
    let element = document.getElementById('reforma');
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
        (generacion.prefoin_VALOR_TOTAL_PROYECTO_R && generacion.prefoin_VALOR_TOTAL_PROYECTO_R.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.prefoin_REFORMA && generacion.prefoin_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.prefoin_PRESUPUESTO_REFORMA && generacion.prefoin_PRESUPUESTO_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.prefoin_ANIO && generacion.prefoin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
    });

    this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;



    if (this.resultadosBusquedaGeneracion.length === 0) {

      return;

    }
  }

  /*buscarPalabraSubtrasmicion(palabra: string) {


    this.resultadosBusquedaSubtrasmicion = this.listadoSubtrasmicion.filter(subtrasmicion => {
      return (subtrasmicion.ppro_CODIGO_RAPIDO && subtrasmicion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.prefoin_VALOR_TOTAL_PROYECTO_R && subtrasmicion.prefoin_VALOR_TOTAL_PROYECTO_R.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.prefoin_REFORMA && subtrasmicion.prefoin_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.prefoin_PRESUPUESTO_REFORMA && subtrasmicion.prefoin_PRESUPUESTO_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.prefoin_ANIO && subtrasmicion.prefoin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))
     
  });

    this.contadorResultadosSubtrasmicion = this.resultadosBusquedaSubtrasmicion.length;

    if (this.resultadosBusquedaSubtrasmicion.length === 0) {

      return;

    }
  }

  buscarPalabraDistribucion(palabra: string) {


    this.resultadosBusquedaDistribucion = this.listadoDistribucion.filter(distribucion => {
      return (distribucion.ppro_CODIGO_RAPIDO && distribucion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.prefoin_VALOR_TOTAL_PROYECTO_R && distribucion.prefoin_VALOR_TOTAL_PROYECTO_R.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.prefoin_REFORMA && distribucion.prefoin_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.prefoin_PRESUPUESTO_REFORMA && distribucion.prefoin_PRESUPUESTO_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.prefoin_ANIO && distribucion.prefoin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
     

  });

    this.contadorResultadosDistribucion = this.resultadosBusquedaDistribucion.length;

    if (this.resultadosBusquedaDistribucion.length === 0) {

      return;

    }
  }

  buscarPalabraAlumbrado(palabra: string) {


    this.resultadosBusquedaAlumbrado = this.listadoAlumbrado.filter(alumbrado => {
      return (alumbrado.ppro_CODIGO_RAPIDO && alumbrado.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.prefoin_VALOR_TOTAL_PROYECTO_R && alumbrado.prefoin_VALOR_TOTAL_PROYECTO_R.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.prefoin_REFORMA && alumbrado.prefoin_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.prefoin_PRESUPUESTO_REFORMA && alumbrado.prefoin_PRESUPUESTO_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.prefoin_ANIO && alumbrado.prefoin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
     

  });

    this.contadorResultadosAlumbrado = this.resultadosBusquedaAlumbrado.length;

    if (this.resultadosBusquedaAlumbrado.length === 0) {

      return;

    }
  }

  buscarPalabraAcometidas(palabra: string) {


    this.resultadosBusquedaAcometidasMedidores = this.listadoAcometidasMedidores.filter(acometidas => {
      return (acometidas.ppro_CODIGO_RAPIDO && acometidas.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.prefoin_VALOR_TOTAL_PROYECTO_R && acometidas.prefoin_VALOR_TOTAL_PROYECTO_R.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.prefoin_REFORMA && acometidas.prefoin_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.prefoin_PRESUPUESTO_REFORMA && acometidas.prefoin_PRESUPUESTO_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.prefoin_ANIO && acometidas.prefoin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
     

  });

    this.contadorResultadosAcometidasMedidores = this.resultadosBusquedaAcometidasMedidores.length;

    if (this.resultadosBusquedaAcometidasMedidores.length === 0) {

      return;

    }
  }

  buscarPalabraInversiones(palabra: string) {


  this.resultadosBusquedaInversiones = this.listadoInversiones.filter(inversiones => {
    return (inversiones.ppro_CODIGO_RAPIDO && inversiones.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.prefoin_VALOR_TOTAL_PROYECTO_R && inversiones.prefoin_VALOR_TOTAL_PROYECTO_R.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.prefoin_REFORMA && inversiones.prefoin_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.prefoin_PRESUPUESTO_REFORMA && inversiones.prefoin_PRESUPUESTO_REFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.prefoin_ANIO && inversiones.prefoin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

});

    this.contadorResultadosInversiones = this.resultadosBusquedaInversiones.length;

    if (this.resultadosBusquedaInversiones.length === 0) {

      return;

    }
  }*/

  listarGeneracion() {
    this.service.getListarReforma1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.listadoGeneracion = data;
        //console.log(this.listadoGeneracion);

      })
  }

  /*listarGeneracionActual() {
    this.service.getListarReforma1()
      .subscribe(data => {
        const añoActual = new Date().getFullYear();

        // Filtrar los datos donde paste_TOTAL_VIVIENDA_PLANI sea igual al año actual
        this.listadoGeneracion = data.filter((item: { prefoin_ANIO: string; }) => item.prefoin_ANIO === añoActual.toString());

        // Mostrar los datos filtrados en la consola
        console.log(this.listadoGeneracion);
      });
  }*/


  listarTodosGeneracion() {
    this.service.getListarReforma1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.resultadosBusquedaGeneracion = data;
        this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;
        this.palabraBusquedaGeneracion = '';
      })
  }


/*  listarTodosSubtrasmicion(): void {
    this.service.getListarReforma2()
      .subscribe(data => {
        this.resultadosBusquedaSubtrasmicion = data;
        this.contadorResultadosSubtrasmicion = this.resultadosBusquedaSubtrasmicion.length;
        this.palabraBusquedaSubtrasmicion = '';
      })
  }

  listarSubtrasmicion() {
    this.service.getListarReforma2()
      .subscribe(data => {
        this.listadoSubtrasmicion = data;
      })
  }

  listarTodosDistribucion(): void {
    this.service.getListarReforma3()
      .subscribe(data => {
        this.resultadosBusquedaDistribucion = data;
        this.contadorResultadosDistribucion = this.resultadosBusquedaDistribucion.length;
        this.palabraBusquedaDistribucion = '';
      })
  }

  listarDistribucion() {
    this.service.getListarReforma3()
      .subscribe(data => {
        this.listadoDistribucion = data;
      })
  }

  listarTodosAlumbrado(): void {
    this.service.getListarReforma4()
      .subscribe(data => {
        this.resultadosBusquedaAlumbrado = data;
        this.contadorResultadosAlumbrado = this.resultadosBusquedaAlumbrado.length;
        this.palabraBusquedaAlumbrado = '';
      })
  }

  listarAlumbrado() {
    this.service.getListarReforma4()
      .subscribe(data => {
        this.listadoAlumbrado = data;
      })
  }


  listarTodosAcometidas(): void {
    this.service.getListarReforma5()
      .subscribe(data => {
        this.resultadosBusquedaAcometidasMedidores = data;
        this.contadorResultadosAcometidasMedidores = this.resultadosBusquedaAcometidasMedidores.length;
        this.palabraBusquedaAcometidasMedidores = '';
      })
  }

  listarAcometidas() {
    this.service.getListarReforma5()
      .subscribe(data => {
        this.listadoAcometidasMedidores = data;
      })
  }


  listarTodosInversiones(): void {
    this.service.getListarReforma6()
      .subscribe(data => {
        this.resultadosBusquedaInversiones = data;
        this.contadorResultadosInversiones = this.resultadosBusquedaInversiones.length;
        this.palabraBusquedaInversiones = '';
      })
  }

  listarInversiones() {
    this.service.getListarReforma6()
      .subscribe(data => {
        this.listadoInversiones = data;
      })
  }*/


  openEditarModalReforma(Reforma: Reforma) {
  }
}
