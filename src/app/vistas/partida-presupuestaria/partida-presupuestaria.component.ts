import { Component } from '@angular/core';
import { PartidaPresupuestaria } from 'src/app/modelo/partidaPresupuestaria';
import { PartidaPresupuestariaRestService } from 'src/app/services/partida-presupuestaria-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-partida-presupuestaria',
  templateUrl: './partida-presupuestaria.component.html',
  styleUrls: ['./partida-presupuestaria.component.css']
})
export class PartidaPresupuestariaComponent {
  opcionSeleccionada: string = 'GENERACION'; // Valor por defecto

  palabraBusquedaGeneracion: string;
  contadorResultadosGeneracion: number = 0;
  resultadosBusquedaGeneracion: PartidaPresupuestaria[];
  listadoGeneracion: PartidaPresupuestaria[];


  id_PPRO_CODIGO_UNICO: number;



  ptipapre_TIPO_PAR_PRESUPUESTAR: string;
  ppart_PARTIDA_PRESUPUESTARIA: string;
  id_PTIPAPRE: number;
  ppro_CODIGO_RAPIDO: string;
  id_PPART: number;
  ppart_FECHA: Date;

  ppart_CODIGO_PARTIDA: string;
  ppart_MONTO_PARTIDA: number;

  selectTipoPartida: number;


  tipoPartida: PartidaPresupuestaria[];


  constructor(private service: PartidaPresupuestariaRestService, private sharedService: SharedIDService, private servicePartidaPrespuestaria: PartidaPresupuestariaRestService) {
    this.id_PPRO_CODIGO_UNICO = sharedService.getCodigoUnico();
  }




  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('partidaPresupuestaria');

    if (!DATA) {
      console.error('Element with id "partidaPresupuestaria" not found.');
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
      docResult.save(`${new Date().toISOString()}partidaPresupuestaria.pdf`);
    });
  }

  downloadExel(): void {
    const name = 'partidaPresupuestaria.xlsx';
    let element = document.getElementById('partidaPresupuestaria');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, name);
  }

  ngOnInit() {

    this.listarGeneracion();
    this.cargarDatosPartidaPresupuestaria();



  }

  buscarPalabraGeneracion(palabra: string) {

    this.resultadosBusquedaGeneracion = this.listadoGeneracion.filter(generacion => {
      return (generacion.ppro_CODIGO_RAPIDO && generacion.ppro_CODIGO_RAPIDO.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppart_PARTIDA_PRESUPUESTARIA && generacion.ppart_PARTIDA_PRESUPUESTARIA.toString().toLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ptipapre_TIPO_PAR_PRESUPUESTAR && generacion.ptipapre_TIPO_PAR_PRESUPUESTAR.toString().toLowerCase().includes(palabra.toLocaleLowerCase()))

    });

    this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;



    if (this.resultadosBusquedaGeneracion.length === 0) {

      return;

    }
  }


  listarGeneracion() {
    this.service.getListarPartidaPresupuestaria1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.listadoGeneracion = data;

        this.id_PPART = data[0].id_PPART;
        this.id_PTIPAPRE = data[0].id_PTIPAPRE;

        this.seleccionarPartidaPrespuestaria = data[0].id_PTIPAPRE;

        // console.log(this.listadoGeneracion);

      })
  }



  listarTodosGeneracion() {
    this.service.getListarPartidaPresupuestaria1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.resultadosBusquedaGeneracion = data;
        this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;
        this.palabraBusquedaGeneracion = '';
      })
  }




  openEditarModalPartidaPresupuestaria(partidaPresupuestaria: PartidaPresupuestaria) {

    this.id_PPART = partidaPresupuestaria.id_PPART;
    this.ppart_FECHA = partidaPresupuestaria.ppart_FECHA;
    this.ppart_CODIGO_PARTIDA = partidaPresupuestaria.ppart_CODIGO_PARTIDA;
    this.ppart_PARTIDA_PRESUPUESTARIA = partidaPresupuestaria.ppart_PARTIDA_PRESUPUESTARIA;
    this.ppart_MONTO_PARTIDA = partidaPresupuestaria.ppart_MONTO_PARTIDA;
    this.id_PTIPAPRE = partidaPresupuestaria.id_PTIPAPRE;


  }


  cargarDatosPartidaPresupuestaria() {
    this.servicePartidaPrespuestaria.getListarTipoPartida().subscribe(
      (data) => {
        this.tipoPartida = data;
        //console.log(this.tipoPlan);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  seleccionarPartidaPrespuestaria(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoPartida = parseFloat(target.value);

    console.log('Tipo de seleccionado:', this.selectTipoPartida);

  }


  actualizarPartidaPresupuestaria() {


    
    const fechaPartidaPresuestaria = new Date(this.ppart_FECHA);

    
    const partidaPresupuestaria: PartidaPresupuestaria ={

      ptipapre_TIPO_PAR_PRESUPUESTAR: this.ptipapre_TIPO_PAR_PRESUPUESTAR,
      ppart_PARTIDA_PRESUPUESTARIA: this.ppart_PARTIDA_PRESUPUESTARIA.toUpperCase(),
      id_PTIPAPRE: this.id_PTIPAPRE,
      id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO,
      ppro_CODIGO_RAPIDO: " ",
      id_PPART: this.id_PPART,
      ppart_FECHA: fechaPartidaPresuestaria,
      ppart_CODIGO_PARTIDA: this.ppart_CODIGO_PARTIDA.toUpperCase(),
      ppart_MONTO_PARTIDA: this.ppart_MONTO_PARTIDA
    };

    this.servicePartidaPrespuestaria.updatePartidaPresupuestaria(partidaPresupuestaria).subscribe(
      (response: any) => {
        if (response && response.message === 'Partida presupuestaria actualizada correctamente') {
          alert("DATOS DE LA PARTIDA PRESUPUESTARIA ACTUALIZADOS CON EXITO");
          window.location.reload();
          
        }else{
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LA PARTIDA PRESPUESTARIA");
        }
      },
      error => {
        console.error("erro", error);
        alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LA PARTIDA PRESPUESTARIA");

      }
    )

    


  }
}
