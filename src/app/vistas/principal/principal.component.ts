import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Proyecto } from 'src/app/modelo/principal';
import { PrincipalRestService } from 'src/app/services/principal-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {


  opcionSeleccionada: string = 'GENERACION'; // Valor por defecto

  palabraBusquedaGeneracion: string;
  contadorResultadosGeneracion: number = 0;
  resultadosBusquedaGeneracion: Proyecto[];
  listadoGeneracion: Proyecto[];
  listadoGeneracionTodos: Proyecto[];


  //Proyecto 
  ppro_OBSERVACIONES_JUSTIFICACI: string;
  ptipla_TIPO_PLAN: string;
  ppro_NOMBRE_PROY: string;
  ppro_ANIO_APROBACION: string;
  pdep_DEPARTAMENTO: string;
  ptipro_TIPO_PROGRAMA: string;
  ppro_OBJETIVO_PRO: string;
  ppro_CODIGO_RAPIDO: string;
  ptiper_TIPO_PERIODICIDAD: string;
  ppro_PROY_CALI_ESTUDIO_COSTOS: string;
  ppro_ANIO_CALIFICACION_EJECU: string;
  ppro_MONTO_APRO_ESTUDI_COSTOS: number;
  petafun_ETAPA_FUNCIONAL: string;
  ppro_CODIGO_ESTU_COSTOS: string;
  ppro_PROYECTO_ARRASTRE: string;
  ppro_PROCESO_CORPORATIVO_UN: string;
  ptisubp_TIPO_SUBPROGRAMA: string;
  id_PEJECP: number;
  id_PASTE: number;


     //select parroquia
     ppro_COD_PARROQUIA: string;
     selectParroquia: number;
     parroquia: Proyecto[];


  //select departamento 
  id_PDEP: number;
  selectDepartamento: number;
  departamentos: Proyecto[];


  //select tipo de plan
  id_PTIPLA: number;
  selectTipoPlan: number;
  tipoPlan: Proyecto[];

  //select tipo de periocidad
  id_PTIPER: number;
  selectTipoPeriodicidad: number;
  tipoPeriodicidad: Proyecto[];

  // selccionar etapa funcional 
  id_PETAFUN: number;
  selectEtpaFuncional: number;
  etapaFuncional: Proyecto[];


  //tipo de programa
  id_PTIPRO: number;
  tipoPrograma: Proyecto[];


  //sleccionar tipo de subprograma
  id_PTISUBP: number;
  selectTipoSubprograma: number;
  tipoSubprograma: Proyecto[];

  //anio
  currentYear: number; // Definir propiedad en la clase



  id_PPRO_CODIGO_UNICO: number;

  constructor(private servicePrincipal: PrincipalRestService, private sharedService: SharedIDService, private el: ElementRef) {
    this.id_PPRO_CODIGO_UNICO = sharedService.getCodigoUnico();
  }

  onYearChangeAnioCalficacion() {
    const year = parseInt(this.ppro_ANIO_CALIFICACION_EJECU);
    if (year > this.currentYear) {
      alert('El año no puede ser mayor al actual');
      this.ppro_ANIO_CALIFICACION_EJECU = '';
    }
  }

  onKeyPressAnioCalificacion(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^\d+$/.test(charStr) || this.ppro_ANIO_CALIFICACION_EJECU?.length >= 4) {
      event.preventDefault();
    }
  }

  onKeyPressAnioAprorbacion(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^\d+$/.test(charStr) || this.ppro_ANIO_APROBACION?.length >= 4) {
      event.preventDefault();
    }
  }

  onYearChangeAnioAporbacion() {
    const year = parseInt(this.ppro_ANIO_APROBACION);
    if (year > this.currentYear) {
      alert('El año no puede ser mayor al actual');
      this.ppro_ANIO_APROBACION = '';
    }
  }


  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('tablaPrincipal');

    if (!DATA) {
      console.error('Element with id "tablaPrincipal" not found.');
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
      docResult.save(`${new Date().toISOString()}_DatosPrincipales.pdf`);
    });
  }

  downloadExel(): void {
    const name = 'DatosPrincipales.xlsx';
    let element = document.getElementById('tablaPrincipal');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, name);
  }



  private saveBlob(blob: Blob, filename: string) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';

    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
  }



  ngOnInit() {

    this.listarGeneracion();
    this.cargarDatosParroquia();
    this.cargarDatosDepartamento();
    this.cargarDatosTipoPlan();
    this.cargarDatosTipoPeriodicidad();
    this.cargarDatosEtapaFuncional();
    this.cargarDatosTipoPrograma();



  }

  buscarPalabraGeneracion(palabra: string) {


    this.resultadosBusquedaGeneracion = this.listadoGeneracion.filter(generacion => {
      return (generacion.id_PPRO_CODIGO_UNICO && generacion.id_PPRO_CODIGO_UNICO.toLocaleString().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_CODIGO_ESTU_COSTOS && generacion.ppro_CODIGO_ESTU_COSTOS.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_NOMBRE_PROY && generacion.ppro_NOMBRE_PROY.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_ANIO_APROBACION && generacion.ppro_ANIO_APROBACION.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_PROCESO_CORPORATIVO_UN && generacion.ppro_PROCESO_CORPORATIVO_UN.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_PROYECTO_ARRASTRE && generacion.ppro_PROYECTO_ARRASTRE.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_PROY_CALI_ESTUDIO_COSTOS && generacion.ppro_PROY_CALI_ESTUDIO_COSTOS.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_ANIO_CALIFICACION_EJECU && generacion.ppro_ANIO_CALIFICACION_EJECU.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_OBJETIVO_PRO && generacion.ppro_OBJETIVO_PRO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ppro_OBSERVACIONES_JUSTIFICACI && generacion.ppro_OBSERVACIONES_JUSTIFICACI.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.petafun_ETAPA_FUNCIONAL && generacion.petafun_ETAPA_FUNCIONAL.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ptipla_TIPO_PLAN && generacion.ptipla_TIPO_PLAN.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ptiper_TIPO_PERIODICIDAD && generacion.ptiper_TIPO_PERIODICIDAD.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.ptisubp_TIPO_SUBPROGRAMA && generacion.ptisubp_TIPO_SUBPROGRAMA.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.pdep_DEPARTAMENTO && generacion.pdep_DEPARTAMENTO.toLocaleLowerCase().includes(palabra.toLocaleLowerCase())) ||
        (generacion.responsableTecnico && generacion.responsableTecnico.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()))
    });

    this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;

    if (this.resultadosBusquedaGeneracion.length === 0) {

      return;

    }
  }


  listarGeneracion() {
    this.servicePrincipal.getListarProyectos1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {

        //console.log(data[0].ppro_ANIO_CALIFICACION_EJECU);
        this.listadoGeneracion = data;

        this.id_PDEP = data[0].id_PDEP;
        this.id_PTIPLA = data[0].id_PTIPLA;
        this.id_PTIPER = data[0].id_PTIPER;
        this.id_PETAFUN = data[0].id_PETAFUN;
        this.id_PTIPRO = data[0].id_PTIPRO;
        this.id_PTISUBP = data[0].id_PTIPRO;
        this.ppro_COD_PARROQUIA = data[0].ppro_COD_PARROQUIA;
        this.ptipro_TIPO_PROGRAMA = data[0].id_PTIPRO;



        this.cargarDatosTipoSubprograma();

        console.log(this.ppro_COD_PARROQUIA); // verifica si hay datos
      })
  }

  listarTodosGeneracion(): void {
    this.servicePrincipal.getListarProyectos1(this.id_PPRO_CODIGO_UNICO)
      .subscribe(data => {
        this.resultadosBusquedaGeneracion = data;
        this.contadorResultadosGeneracion = this.resultadosBusquedaGeneracion.length;
        this.palabraBusquedaGeneracion = '';
      })
  }

  seleccionarParroquia(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectParroquia = parseFloat(target.value);

    //console.log('Tipo de Plan seleccionado:', this.selectTipoPlan);

  }

  seleccionarDepartamento(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectDepartamento = parseFloat(target.value);

    //console.log('Departamento seleccionado:', this.selectDepartamento);

  }


  seleccionarTipoPlan(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoPlan = parseFloat(target.value);

    //console.log('Tipo de Plan seleccionado:', this.selectTipoPlan);

  }

  seleccionarTipoPeriodicidad(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoPeriodicidad = parseFloat(target.value);

    //console.log('Tipo de Periocidad seleccionado:', this.selectTipoPeriodicidad);

  }


  seleccionarEtapaFuncional(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectEtpaFuncional = parseFloat(target.value);
    //console.log('Etapa Funcional seleccionado:', this.selectEtpaFuncional);

  }


  cargarDatosTipoSubprograma() {
    this.servicePrincipal.getListarTipoSubprograma(this.id_PTIPRO).subscribe(
      (data) => {
        this.tipoSubprograma = data;
        this.id_PTISUBP = data[0].id_PTISUBP;
         console.log("este" + this.id_PTISUBP);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  seleccionarTipoPrograma(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.id_PTIPRO = parseFloat(target.value);
    this.cargarDatosTipoSubprograma();
  }



  seleccionarTipoSubprograma(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoSubprograma = parseFloat(target.value);
    //console.log('Tipo de Subprograma seleccionado:', this.selectTipoSubprograma);

  }




  cargarDatosDepartamento() {
    this.servicePrincipal.getListarDepartamentos().subscribe(
      (data) => {
        this.departamentos = data;
        // console.log(this.departamentos);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  cargarDatosTipoPlan() {
    this.servicePrincipal.getListarTipoPlan().subscribe(
      (data) => {
        this.tipoPlan = data;
        //console.log(this.tipoPlan);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  cargarDatosTipoPeriodicidad() {
    this.servicePrincipal.getListarTipoPeriodicidad().subscribe(
      (data) => {
        this.tipoPeriodicidad = data;
        //console.log(this.tipoPlan);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }



  cargarDatosEtapaFuncional() {
    this.servicePrincipal.getListarEtapaFuncional().subscribe(
      (data) => {
        this.etapaFuncional = data;
        //console.log(this.tipoPlan);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  cargarDatosTipoPrograma() {
    this.servicePrincipal.getListarTipoPrograma().subscribe(
      (data) => {
        this.tipoPrograma = data;

      this.id_PTIPRO = data[0].id_PTIPRO;

        console.log(this.id_PTIPRO);

      },
      (error) => {
       // console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  cargarDatosParroquia() {
    this.servicePrincipal.getListarParroquias().subscribe(
      (data) => {
        this.parroquia = data;
        // console.log(this.departamentos);

      },
      (error) => {
        console.error('Error al obtener los Datos:', error);
      }
    );
  }



  openEditarModalproyecto(proyecto: Proyecto) {

    this.id_PDEP = proyecto.id_PDEP;
    this.id_PTIPLA = proyecto.id_PTIPLA;
    this.id_PTIPER = proyecto.id_PTIPER;
    this.id_PETAFUN = proyecto.id_PETAFUN;
    this.id_PTIPRO = proyecto.id_PTIPRO;
    this.id_PTISUBP = proyecto.id_PTISUBP;
    

    this.ppro_CODIGO_ESTU_COSTOS = proyecto.ppro_CODIGO_ESTU_COSTOS;
    this.ppro_NOMBRE_PROY = proyecto.ppro_NOMBRE_PROY;
    this.ppro_ANIO_APROBACION = proyecto.ppro_ANIO_APROBACION;
    this.ppro_ANIO_CALIFICACION_EJECU = proyecto.ppro_ANIO_CALIFICACION_EJECU;
    this.ppro_COD_PARROQUIA = proyecto.ppro_COD_PARROQUIA;


    this.ppro_PROCESO_CORPORATIVO_UN = proyecto.ppro_PROCESO_CORPORATIVO_UN;
    this.ppro_PROYECTO_ARRASTRE = proyecto.ppro_PROYECTO_ARRASTRE;
    this.ppro_PROY_CALI_ESTUDIO_COSTOS = proyecto.ppro_PROY_CALI_ESTUDIO_COSTOS;
    this.ppro_OBJETIVO_PRO = proyecto.ppro_OBJETIVO_PRO;
    this.ppro_OBSERVACIONES_JUSTIFICACI = proyecto.ppro_OBSERVACIONES_JUSTIFICACI;

    this.ppro_MONTO_APRO_ESTUDI_COSTOS = proyecto.ppro_MONTO_APRO_ESTUDI_COSTOS;



    this.ptisubp_TIPO_SUBPROGRAMA = proyecto.id_PTISUBP.toString();


    this.ppro_COD_PARROQUIA = proyecto.ppro_COD_PARROQUIA.toString();

    console.log(this.ppro_COD_PARROQUIA);
    


  }

  Actualizarproyecto() {

    const proyecto: Proyecto = {

      ppro_OBSERVACIONES_JUSTIFICACI: this.ppro_OBSERVACIONES_JUSTIFICACI.toUpperCase(),
      id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO,
      ptipla_TIPO_PLAN: this.ptipla_TIPO_PLAN,
      ppro_NOMBRE_PROY: this.ppro_NOMBRE_PROY.toUpperCase(),
      ppro_ANIO_APROBACION: this.ppro_ANIO_APROBACION,
      pdep_DEPARTAMENTO: this.pdep_DEPARTAMENTO,
      ptipro_TIPO_PROGRAMA: this.ptipro_TIPO_PROGRAMA,
      ppro_OBJETIVO_PRO: this.ppro_OBJETIVO_PRO.toUpperCase(),
      prete_APELLIDOS: "",
      ptiper_TIPO_PERIODICIDAD: this.ptiper_TIPO_PERIODICIDAD,
      ppro_PROY_CALI_ESTUDIO_COSTOS: this.ppro_PROY_CALI_ESTUDIO_COSTOS,
      ppro_ANIO_CALIFICACION_EJECU: this.ppro_ANIO_CALIFICACION_EJECU,
      ppro_MONTO_APRO_ESTUDI_COSTOS: this.ppro_MONTO_APRO_ESTUDI_COSTOS,
      petafun_ETAPA_FUNCIONAL: this.petafun_ETAPA_FUNCIONAL,
      ppro_CODIGO_ESTU_COSTOS: this.ppro_CODIGO_ESTU_COSTOS,
      ppro_PROYECTO_ARRASTRE: this.ppro_PROYECTO_ARRASTRE,
      ppro_PROCESO_CORPORATIVO_UN: this.ppro_PROCESO_CORPORATIVO_UN,
      ptisubp_TIPO_SUBPROGRAMA: this.ptisubp_TIPO_SUBPROGRAMA,
      prete_NOMBRES: "",
      id_PTISUBP: this.id_PTISUBP,
      id_PTIPER: this.id_PTIPER,
      id_PETAFUN: this.id_PETAFUN,
      id_PTIPLA: this.id_PTIPLA,
      id_PTIPRO: this.id_PTIPRO,
      id_PDEP: this.id_PDEP,
      prete_DMPER_NUMERO_ROL: "",
      ppro_COD_PARROQUIA: this.ppro_COD_PARROQUIA,
      prete_DMPER_CODIGO: "",
      prete_DERTAMENTO_PER: "",
      id_PEJECP: this.id_PEJECP,
      id_PASTE: this.id_PASTE,
      id_PRETE: this.id_PASTE,
      responsableTecnico: "",
      parroquia: ""

  
    };


    this.servicePrincipal.updateProyectoPrincipal(proyecto).subscribe(
      (response: any) => {
        if (response && response.message === 'Proyecto actualizada correctamente') {
          alert("DATOS DEL PROYECTO ACTUALIZADOS CON EXITO");
          window.location.reload();
          
        }else{
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DEL PROYECTO");
        }
      },
      error => {
        console.error("erro", error);
        alert("NO SE PUDO ACTUALIZAR LOS DATOS DEL PROYECTO");

      }
    )

  }

}
