import { Component } from '@angular/core';
import { Proforma } from 'src/app/modelo/proforma';
import { ProformaRestService } from 'src/app/services/proforma-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent {
  opcionSeleccionada: string = 'GENERACION'; // Valor por defecto

  palabraBusquedaGeneracion: string;
  contadorResultadosGeneracion: number = 0;
  resultadosBusquedaGeneracion: Proforma[];
  listadoGeneracion: Proforma[];

  id_PPRO_CODIGO_UNICO: number;

  tienePermisoListar: boolean = false;
  tienePermisoIngresarBoton: boolean = false;



  constructor(private service: ProformaRestService, private sharedService: SharedIDService) { 
    this.id_PPRO_CODIGO_UNICO = sharedService.getCodigoUnico();
  }


    
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('proforma');
  
    if (!DATA) {
      console.error('Element with id "proforma" not found.');
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
      docResult.save(`${new Date().toISOString()}proforma.pdf`);
    });
  }

  downloadExel(): void {
    const name = 'proforma.xlsx';  
    let element = document.getElementById('proforma');
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
      if (operacion.id_MODULO === 46) {
        if (operacion.id_OPERACION === 58) {
          this.tienePermisoListar = true;
        }
        if (operacion.id_OPERACION === 59) {
          this.tienePermisoIngresarBoton = true;
        }
      }
    });


  }

  buscarPalabraGeneracion(palabra: string) {

    this.resultadosBusquedaGeneracion = this.listadoGeneracion.filter(generacion => {
      return (generacion.ppro_CODIGO_RAPIDO && generacion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pproin_VALOR_TOTAL_PROYECTO_PR && generacion.pproin_VALOR_TOTAL_PROYECTO_PR.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pproin_PROFORMA && generacion.pproin_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pproin_PRESUPUESTO_PROFORMA && generacion.pproin_PRESUPUESTO_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pproin_ANIO && generacion.pproin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
    });

    this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;



    if (this.resultadosBusquedaGeneracion.length === 0) {

      return;

    }
  }

 /* buscarPalabraSubtrasmicion(palabra: string) {


    this.resultadosBusquedaSubtrasmicion = this.listadoSubtrasmicion.filter(subtrasmicion => {
      return (subtrasmicion.ppro_CODIGO_RAPIDO && subtrasmicion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pproin_VALOR_TOTAL_PROYECTO_PR && subtrasmicion.pproin_VALOR_TOTAL_PROYECTO_PR.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pproin_PROFORMA && subtrasmicion.pproin_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pproin_PRESUPUESTO_PROFORMA && subtrasmicion.pproin_PRESUPUESTO_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (subtrasmicion.pproin_ANIO && subtrasmicion.pproin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))
     
  });

    this.contadorResultadosSubtrasmicion = this.resultadosBusquedaSubtrasmicion.length;

    if (this.resultadosBusquedaSubtrasmicion.length === 0) {

      return;

    }
  }

  buscarPalabraDistribucion(palabra: string) {


    this.resultadosBusquedaDistribucion = this.listadoDistribucion.filter(distribucion => {
      return (distribucion.ppro_CODIGO_RAPIDO && distribucion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pproin_VALOR_TOTAL_PROYECTO_PR && distribucion.pproin_VALOR_TOTAL_PROYECTO_PR.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pproin_PROFORMA && distribucion.pproin_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pproin_PRESUPUESTO_PROFORMA && distribucion.pproin_PRESUPUESTO_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (distribucion.pproin_ANIO && distribucion.pproin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
     

  });

    this.contadorResultadosDistribucion = this.resultadosBusquedaDistribucion.length;

    if (this.resultadosBusquedaDistribucion.length === 0) {

      return;

    }
  }

  buscarPalabraAlumbrado(palabra: string) {


    this.resultadosBusquedaAlumbrado = this.listadoAlumbrado.filter(alumbrado => {
      return (alumbrado.ppro_CODIGO_RAPIDO && alumbrado.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pproin_VALOR_TOTAL_PROYECTO_PR && alumbrado.pproin_VALOR_TOTAL_PROYECTO_PR.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pproin_PROFORMA && alumbrado.pproin_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pproin_PRESUPUESTO_PROFORMA && alumbrado.pproin_PRESUPUESTO_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (alumbrado.pproin_ANIO && alumbrado.pproin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
     

  });

    this.contadorResultadosAlumbrado = this.resultadosBusquedaAlumbrado.length;

    if (this.resultadosBusquedaAlumbrado.length === 0) {

      return;

    }
  }

  buscarPalabraAcometidas(palabra: string) {


    this.resultadosBusquedaAcometidasMedidores = this.listadoAcometidasMedidores.filter(acometidas => {
      return (acometidas.ppro_CODIGO_RAPIDO && acometidas.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pproin_VALOR_TOTAL_PROYECTO_PR && acometidas.pproin_VALOR_TOTAL_PROYECTO_PR.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pproin_PROFORMA && acometidas.pproin_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pproin_PRESUPUESTO_PROFORMA && acometidas.pproin_PRESUPUESTO_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
      (acometidas.pproin_ANIO && acometidas.pproin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) 
     

  });

    this.contadorResultadosAcometidasMedidores = this.resultadosBusquedaAcometidasMedidores.length;

    if (this.resultadosBusquedaAcometidasMedidores.length === 0) {

      return;

    }
  }

  buscarPalabraInversiones(palabra: string) {


  this.resultadosBusquedaInversiones = this.listadoInversiones.filter(inversiones => {
    return (inversiones.ppro_CODIGO_RAPIDO && inversiones.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pproin_VALOR_TOTAL_PROYECTO_PR && inversiones.pproin_VALOR_TOTAL_PROYECTO_PR.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pproin_PROFORMA && inversiones.pproin_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pproin_PRESUPUESTO_PROFORMA && inversiones.pproin_PRESUPUESTO_PROFORMA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
    (inversiones.pproin_ANIO && inversiones.pproin_ANIO.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

});

    this.contadorResultadosInversiones = this.resultadosBusquedaInversiones.length;

    if (this.resultadosBusquedaInversiones.length === 0) {

      return;

    }
  }*/

  listarGeneracion() {
    this.service.getListarProforma1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.listadoGeneracion = data;
        console.log(this.listadoGeneracion);

      })
  }

  /*listarGeneracionActual() {
    this.service.getListarProforma1()
      .subscribe(data => {
        const añoActual = new Date().getFullYear();

        // Filtrar los datos donde paste_TOTAL_VIVIENDA_PLANI sea igual al año actual
        this.listadoGeneracion = data.filter((item: { pproin_ANIO: string; }) => item.pproin_ANIO === añoActual.toString());

        // Mostrar los datos filtrados en la consola
        console.log(this.listadoGeneracion);
      });
  }*/


  listarTodosGeneracion() {
    this.service.getListarProforma1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.resultadosBusquedaGeneracion = data;
        this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;
        this.palabraBusquedaGeneracion = '';
      })
  }


 /* listarTodosSubtrasmicion(): void {
    this.service.getListarProforma2()
      .subscribe(data => {
        this.resultadosBusquedaSubtrasmicion = data;
        this.contadorResultadosSubtrasmicion = this.resultadosBusquedaSubtrasmicion.length;
        this.palabraBusquedaSubtrasmicion = '';
      })
  }

  listarSubtrasmicion() {
    this.service.getListarProforma2()
      .subscribe(data => {
        this.listadoSubtrasmicion = data;
      })
  }

  listarTodosDistribucion(): void {
    this.service.getListarProforma3()
      .subscribe(data => {
        this.resultadosBusquedaDistribucion = data;
        this.contadorResultadosDistribucion = this.resultadosBusquedaDistribucion.length;
        this.palabraBusquedaDistribucion = '';
      })
  }

  listarDistribucion() {
    this.service.getListarProforma3()
      .subscribe(data => {
        this.listadoDistribucion = data;
      })
  }

  listarTodosAlumbrado(): void {
    this.service.getListarProforma4()
      .subscribe(data => {
        this.resultadosBusquedaAlumbrado = data;
        this.contadorResultadosAlumbrado = this.resultadosBusquedaAlumbrado.length;
        this.palabraBusquedaAlumbrado = '';
      })
  }

  listarAlumbrado() {
    this.service.getListarProforma4()
      .subscribe(data => {
        this.listadoAlumbrado = data;
      })
  }


  listarTodosAcometidas(): void {
    this.service.getListarProforma5()
      .subscribe(data => {
        this.resultadosBusquedaAcometidasMedidores = data;
        this.contadorResultadosAcometidasMedidores = this.resultadosBusquedaAcometidasMedidores.length;
        this.palabraBusquedaAcometidasMedidores = '';
      })
  }

  listarAcometidas() {
    this.service.getListarProforma5()
      .subscribe(data => {
        this.listadoAcometidasMedidores = data;
      })
  }


  listarTodosInversiones(): void {
    this.service.getListarProforma6()
      .subscribe(data => {
        this.resultadosBusquedaInversiones = data;
        this.contadorResultadosInversiones = this.resultadosBusquedaInversiones.length;
        this.palabraBusquedaInversiones = '';
      })
  }

  listarInversiones() {
    this.service.getListarProforma6()
      .subscribe(data => {
        this.listadoInversiones = data;
      })
  }
*/

  openEditarModalProforma(Proforma: Proforma) {
  }

}
