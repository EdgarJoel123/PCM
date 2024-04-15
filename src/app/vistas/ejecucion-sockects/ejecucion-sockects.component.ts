import { Component, OnInit } from '@angular/core';
import { EjecucionProyecto } from 'src/app/modelo/ejecucionProyecto';
import { EjecucionRestService } from 'src/app/services/ejecucion-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { WebSocketService } from 'src/app/services/web-socket-service.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-ejecucion-sockects',
  templateUrl: './ejecucion-sockects.component.html',
  styleUrls: ['./ejecucion-sockects.component.css']
})
export class EjecucionSockectsComponent implements OnInit {

  opcionSeleccionada: string = 'GENERACION'; // Valor por defecto

  palabraBusquedaGeneracion: string;
  contadorResultadosGeneracion: number = 0;
  resultadosBusquedaGeneracion: EjecucionProyecto[];
  listadoGeneracion: EjecucionProyecto[];



  id_PPRO_CODIGO_UNICO: number;


  tienePermisoListar: boolean = false;
  tienePermisoIngresarBoton: boolean = false;



  constructor(private service: EjecucionRestService, private sharedService: SharedIDService, private websocketService: WebSocketService) {
    this.id_PPRO_CODIGO_UNICO = sharedService.getCodigoUnico();
  }




  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('ejecucionProyecto');

    if (!DATA) {
      console.error('Element with id "ejecucionProyecto" not found.');
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
      docResult.save(`${new Date().toISOString()}ejecucionProyecto.pdf`);
    });
  }

  downloadExel(): void {
    const name = 'ejecucionProyecto.xlsx';
    let element = document.getElementById('ejecucionProyecto');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, name);
  }

  ngOnInit() {
    this.listarGeneracion();

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Verificar permisos para cada operación
    userData.forEach((operacion: any) => {
      if (operacion.id_MODULO === 42) {
        if (operacion.id_OPERACION === 54) {
          this.tienePermisoListar = true;
        }
        if (operacion.id_OPERACION === 55) {
          this.tienePermisoIngresarBoton = true;
        }
      }
    });

  }

  



  buscarPalabraGeneracion(palabra: string) {

    this.resultadosBusquedaGeneracion = this.listadoGeneracion.filter(generacion => {
      return (generacion.ppro_CODIGO_RAPIDO && generacion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pejecp_AVANCE_EJECU_FISICA_PRO && generacion.pejecp_AVANCE_EJECU_FISICA_PRO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pejecp_AVANCE_EJECU_TOTAL_PRO && generacion.pejecp_AVANCE_EJECU_TOTAL_PRO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pejecp_FECHA_INICIO_PRO && generacion.pejecp_FECHA_INICIO_PRO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pejecp_FECHA_PROG_FINA_PRO && generacion.pejecp_FECHA_PROG_FINA_PRO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pejecp_FECHA_FINAL_PRO && generacion.pejecp_FECHA_FINAL_PRO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pestpro_ESTADO_PRO && generacion.pestpro_ESTADO_PRO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.petaejepro_ETAPA_EJE_PROYEC && generacion.petaejepro_ETAPA_EJE_PROYEC.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))
    });

    this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;



    if (this.resultadosBusquedaGeneracion.length === 0) {

      return;

    }
  }

  listarGeneracion() {
    this.service.getListarEjecucionProyecto1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.listadoGeneracion = data;
      });
  }


  
 /* private subscribeToWebSocketUpdates() {
    this.websocketService.getEjecucionProyectoUpdates()
      .subscribe(updatedEjecucionProyectos => {
        this.listadoGeneracion = updatedEjecucionProyectos;
      });
  }*/



  listarTodosGeneracion() {
    this.service.getListarEjecucionProyecto1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.resultadosBusquedaGeneracion = data;
        this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;
        this.palabraBusquedaGeneracion = '';
      })
  }


  openEditarModalEjecucionProyecto(EjecucionProyecto: EjecucionProyecto) {
  }

}
