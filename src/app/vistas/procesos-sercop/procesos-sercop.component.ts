import { Component } from '@angular/core';
import { ProcesosSercop } from 'src/app/modelo/procesosSercop';
import { ProcesosSercopRestService } from 'src/app/services/procesos-sercop-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-procesos-sercop',
  templateUrl: './procesos-sercop.component.html',
  styleUrls: ['./procesos-sercop.component.css']
})
export class ProcesosSercopComponent {
  opcionSeleccionada: string = 'GENERACION'; // Valor por defecto

  palabraBusquedaGeneracion: string;
  contadorResultadosGeneracion: number = 0;
  resultadosBusquedaGeneracion: ProcesosSercop[];
  listadoGeneracion: ProcesosSercop[];


  ppro_CODIGO_RAPIDO: string;
  pproser_PROCESOS_SERCOP:string;
  id_PPROSER:number;
  pproser_FECHA: string;

  pproser_CODIGO_SERCOP: string;

  id_PPRO_CODIGO_UNICO_procesos_sercop: number;

  id_PPRO_CODIGO_UNICO: number;




  tienePermisoListar: boolean = false;
  tienePermisoIngresarBoton: boolean = false;
  tienePermisoEditar: boolean = false;



  constructor(private service: ProcesosSercopRestService, private sharedService: SharedIDService, private servicePorocesosSercop: ProcesosSercopRestService) { 
    this.id_PPRO_CODIGO_UNICO = sharedService.getCodigoUnico();
    this.id_PPRO_CODIGO_UNICO_procesos_sercop = this.sharedService.getCodigoUnico();
   
  }


  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('procesosSercop');
  
    if (!DATA) {
      console.error('Element with id "procesosSercop" not found.');
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
      docResult.save(`${new Date().toISOString()}procesosSercop.pdf`);
    });
  }

  downloadExel(): void {
    const name = 'procesosSercop.xlsx';  
    let element = document.getElementById('procesosSercop');
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
      if (operacion.id_MODULO === 49) {
        if (operacion.id_OPERACION === 71) {
          this.tienePermisoListar = true;
        }
        if (operacion.id_OPERACION === 74) {
          this.tienePermisoIngresarBoton = true;
        }

        if (operacion.id_OPERACION === 73) {
          this.tienePermisoEditar = true;
        }
      }
    });

  }

  buscarPalabraGeneracion(palabra: string) {

    this.resultadosBusquedaGeneracion = this.listadoGeneracion.filter(generacion => {
      return (generacion.ppro_CODIGO_RAPIDO && generacion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pproser_PROCESOS_SERCOP && generacion.pproser_PROCESOS_SERCOP.toString().toLowerCase().includes(palabra.toLocaleLowerCase()) ||
        (generacion.pproser_CODIGO_SERCOP && generacion.pproser_CODIGO_SERCOP.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) )

    });

    this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;



    if (this.resultadosBusquedaGeneracion.length === 0) {

      return;

    }
  }

  listarGeneracion() {
    this.service.getListarProcesosSercop1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.listadoGeneracion = data;

        this.id_PPROSER = data[0].id_PPROSER;
       // console.log(this.id_PPROSER);

        console.log(this.listadoGeneracion);
        

      })
  }
  listarTodosGeneracion() {
    this.service.getListarProcesosSercop1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.resultadosBusquedaGeneracion = data;
        this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;
        this.palabraBusquedaGeneracion = '';
      })
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

  openEditarModalProcesosSercop(procesosSercop: ProcesosSercop) {


    this.id_PPROSER = procesosSercop.id_PPROSER;
    this.pproser_FECHA = this.formatoFechaActual();
    this.pproser_CODIGO_SERCOP = procesosSercop.pproser_CODIGO_SERCOP;
    this.pproser_PROCESOS_SERCOP = procesosSercop.pproser_PROCESOS_SERCOP;

  }



  actualizarProcesosSercop() {

    const fechaProcesosSercop = new Date(this.pproser_FECHA);


      const sercop: ProcesosSercop = {
        ppro_CODIGO_RAPIDO: "",
        id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO_procesos_sercop,
        id_PPROSER: this.id_PPROSER,
        pproser_PROCESOS_SERCOP: this.pproser_PROCESOS_SERCOP.toUpperCase(),
        pproser_FECHA: fechaProcesosSercop,
        pproser_CODIGO_SERCOP: this.pproser_CODIGO_SERCOP.toUpperCase()
      };
  
      this.servicePorocesosSercop.updateProcesosSercop(sercop).subscribe(
        (response: any) => {
          if (response && response.message === 'Procesos de la SERCOP actualizados correctamente') {
            alert("DATOS DE PROCESOS SERCOP ACTUALIZADOS CON ÉXITO");

            window.location.reload();



          } else {
            alert("NO SE PUDO ACTUALIZAR LOS DATOS DE PROCESOS SERCOP");

          }
        },
        error => {
          console.error("Error al actualizar procesos SERCOP:", error);
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DE PROCESOS SERCOP");

        }
      );
  
  }

}
