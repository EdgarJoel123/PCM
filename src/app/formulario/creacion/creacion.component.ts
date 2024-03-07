import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AspectosFinancieros } from 'src/app/modelo/aspectosFinacieros';
import { AspectosTecnicos } from 'src/app/modelo/aspectosTecnicos';
import { DetallePartidaPresupuestaria } from 'src/app/modelo/detallePartidaPrepuestaria';
import { DetalleResponsableTecnico } from 'src/app/modelo/detalleResponsableTecnico';
import { EjecucionProyecto } from 'src/app/modelo/ejecucionProyecto';
import { PartidaPresupuestaria } from 'src/app/modelo/partidaPresupuestaria';
import { Proyecto } from 'src/app/modelo/principal';
import { ProcesosSercop } from 'src/app/modelo/procesosSercop';
import { Proforma } from 'src/app/modelo/proforma';
import { Reforma } from 'src/app/modelo/reforma';
import { ResponsableTecnico } from 'src/app/modelo/responsableTecnico';
import { AspectosFinancierosRestService } from 'src/app/services/aspectos-financieros-rest.service';
import { AspectosTecnicosRestService } from 'src/app/services/aspectos-tecnicos-rest.service';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { EjecucionRestService } from 'src/app/services/ejecucion-rest.service';
import { PartidaPresupuestariaRestService } from 'src/app/services/partida-presupuestaria-rest.service';
import { PrincipalRestService } from 'src/app/services/principal-rest.service';
import { ProcesosSercopRestService } from 'src/app/services/procesos-sercop-rest.service';
import { ProformaRestService } from 'src/app/services/proforma-rest.service';
import { ReformaRestService } from 'src/app/services/reforma-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.css'],
})
export class CreacionComponent implements OnInit {

  //formulario 
  formSequence: string[] = ['form1', 'form2', 'form3', 'form4', 'form5', 'form6', 'form7', 'form8', 'form9', 'form10', 'form11']; // Array con los nombres de los formularios
  currentFormIndex: number = 0; // Índice actual del array
  formValid: boolean = false;



  //anio
  currentYear: number; // Definir propiedad en la clase

  //responsable tecnicos
  username_name: string;
  id_PRETE: number;
  prete_NOMBRES: String;
  prete_APELLIDOS: String;
  prete_DERTAMENTO_PER: String;
  prete_DMPER_NUMERO_ROL: String;
  prete_DMPER_CODIGO: String;


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
  ppro_COD_PARROQUIA: string;
  id_PEJECP: number;
  id_PASTE: number;


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

  paste_FECHA_ASPEC_TECNICOS: Date;
  paste_FECH_OB_PERM_AMBI_PLANI: Date;
  paste_FECH_OB_PERM_AMBI_EJEC: Date;


  //aspectos financieros
  pasfina_FECHA: Date;
  pasfina_COMPROMISO: number;
  pasfina_REFORMAS: number;
  pasfina_EJECUTADO: number;
  id_PPRO_CODIGO_UNICO: number;
  pasfina_DEVENGADO: number;
  pasfina_PRESU_CODIFICADO: number;
  pasfina_ANTICIPO_NO_AMORTI: number;
  pasfina_PRE_COMPROMISO: number;
  pasfina_EJECUTADO_PAGADO: number;
  pasfina_ASIGNACION_INICIAL: number;
  id_PASFINA: number;

  id_PPRO_CODIGO_UNICO_aspectos_finacieros: number;


  //ejecucion

  pejecp_AVANCE_EJECU_FISICA_PRO: number;
  ppro_MONTO_CALIF_ESTUDI_COSTOS: number;

  pestpro_ESTADO_PRO: string;
  id_PESTPRO: number;
  id_PETAEJEPRO: number;
  petaejepro_ETAPA_EJE_PROYEC: string;
  pejecp_FECHA_FINAL_PRO: Date;
  pejecp_AVANCE_EJECU_TOTAL_PRO: number;
  pejecp_FECHA_INICIO_PRO: Date;
  pejecp_FECHA_PROG_FINA_PRO: Date;
  id_PPRO_CODIGO_UNICO_ejecucion_proyecto: number;

  //proforma

  pproin_VALOR_TOTAL_PROYECTO_PR: number;
  pproin_PRESUPUESTO_PROFORMA: number;
  pproin_ANIO: string;
  id_PPRO_CODIGO_UNICO_proforma: number;
  pproin_PROFORMA: number;
  id_PPROIN: number;
  pproin_FECHA: Date;


  //reforma
  prefoin_VALOR_TOTAL_PROYECTO_R: number;
  prefoin_PRESUPUESTO_REFORMA: number;
  prefoin_ANIO: string;
  id_PPRO_CODIGO_UNICO_reforma: number;
  prefoin_REFORMA: number;
  id_PREFOIN: number;
  codigo_rapido_re: string;
  nombre_proyecto_re: string;
  prefoin_FECHA: Date;




  //procesos sercop

  id_PPRO_CODIGO_UNICO_procesos_sercop: number;
  pproser_PROCESOS_SERCOP: string;
  id_PPROSER: number;
  pproser_FECHA: string;


  //partida prepuestaria 


  ptipapre_TIPO_PAR_PRESUPUESTAR: string;
  ppart_PARTIDA_PRESUPUESTARIA: string;
  id_PTIPAPRE: number;
  id_PPRO_CODIGO_UNICO_detalle_partida_prespuestaria: number;
  id_PPART: number;



  //select departamento 
  id_PDEP: number;
  selectDepartamento: number;
  departamentos: Proyecto[];


  //select Tipo ambiental 
  id_PTIPEAM: number;
  selectTipoAmbiental: number;
  tipoAmbiental: AspectosTecnicos[];


  //select tipo de partida presupuestaria 

  selectTipoPartida: number;
  tipoPartida: PartidaPresupuestaria[];




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

  //sleccionar tipo de subprograma
  id_PTISUBP: number;
  selectTipoSubprograma: number;
  tipoSubprograma: Proyecto[];

  //tipo de programa
  id_PTIPRO: number;
  tipoPrograma: Proyecto[];
  tipoProgramaSeleccionado: boolean = false;

  //estado proyecto 
  estadoProyecto: EjecucionProyecto[];
  selectEstadoProyecto: number;


  //etapa de ejecuccion
  etapaEjecucion: EjecucionProyecto[];
  selectEtapaEjecuccion: number;



  proyectos: Proyecto[];
  //responsablr
  ID_PPRO_CODIGO_UNICO_responsable: number;
  responsables: ResponsableTecnico[];
  ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido: number;


  //partida
  partidas: PartidaPresupuestaria[];

  ID_PPRO_CODIGO_UNICO_partida_codigo_rapido: number;
  ID_PPRO_CODIGO_UNICO_partida: number;



  nombre_proyecto_CODIGO: string;





  constructor(private servicePrincipal: PrincipalRestService, private serviceAspectosTecnicos: AspectosTecnicosRestService, private serviceAspectosFinacieros: AspectosFinancierosRestService,
    private serviceEjecuccionProyecto: EjecucionRestService,
    private serviceProforma: ProformaRestService,
    private serviceReforma: ReformaRestService,
    private servicePorocesosSercop: ProcesosSercopRestService,
    private servicePartidaPrespuestaria: PartidaPresupuestariaRestService,
    private serviceAuto: AutentificacionService,
    private sharedService: SharedIDService,
    private router: Router) {

    this.currentYear = new Date().getFullYear();
    // Asignar valor en el constructor

    this.nombre_proyecto_CODIGO = this.sharedService.getNombreProyecto();
    this.ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido = this.sharedService.getCodigoUnico();
  }

  // Función para avanzar al siguiente formulario
  onNextForm() {
    if (this.currentFormIndex < this.formSequence.length - 1) {
      this.currentFormIndex++;
      sessionStorage.setItem('currentFormIndex', String(this.currentFormIndex)); // Guardar el índice en sessionStorage
    }


  }


  listarProyectos() {
    this.servicePrincipal.getListarProyectos()
      .subscribe(data => {
        this.proyectos = data;
        //console.log(this.proyectos);

      })
  }


  listarResponsableTecnico() {
    this.servicePrincipal.getListarResponsableTecnico()
      .subscribe(data => {
        this.responsables = data;
        //console.log(this.responsables);

      })
  }


  listarPartidaPresupuestaria() {
    this.servicePartidaPrespuestaria.getListarPartidaPresupuestaria()
      .subscribe(data => {
        this.partidas = data;
        console.log(this.partidas);

      })
  }


  ngOnInit(): void {
    this.cargarDatosDepartamento();
    this.cargarDatosTipoPlan();
    this.cargarDatosTipoPeriodicidad();
    this.cargarDatosEtapaFuncional();
    this.cargarDatosTipoPrograma();
    this.cargarDatosAmbiental();
    this.cargarDatosEstadoProyecto();
    //this.cargarDatosEpataEjecuccion();
    this.listarProyectos();
    this.cargarDatosPartidaPresupuestaria();
    this.listarResponsableTecnico();
    this.listarPartidaPresupuestaria();
  }


  onSubmitProyecto(form: any) {

    if (form.valid) {
      const nuevoProyecto = new Proyecto(this.selectDepartamento, this.selectTipoPlan, this.selectTipoPeriodicidad,
        this.selectEtpaFuncional, this.selectTipoSubprograma,
        this.ppro_CODIGO_ESTU_COSTOS.toUpperCase(), this.ppro_NOMBRE_PROY.toUpperCase(), this.ppro_CODIGO_RAPIDO.toUpperCase(),
        this.ppro_ANIO_APROBACION, this.ppro_PROCESO_CORPORATIVO_UN.toUpperCase(),
        this.ppro_PROYECTO_ARRASTRE.toUpperCase(), this.ppro_PROY_CALI_ESTUDIO_COSTOS.toUpperCase(), this.ppro_ANIO_CALIFICACION_EJECU,
        this.ppro_OBJETIVO_PRO.toUpperCase(), this.ppro_MONTO_APRO_ESTUDI_COSTOS, this.ppro_OBSERVACIONES_JUSTIFICACI.toUpperCase(),
        this.ppro_COD_PARROQUIA);

      this.servicePrincipal.insertaProyecto(nuevoProyecto).subscribe(
        (response: any) => {
          if (response && response.message === 'Proyecto creado correctamente') {
            alert("Proyecto CREADO CON ÉXITO");
            this.router.navigate(['cargarProyecto']);
          } else {
            alert("Error al crear el proyecto. Verifique los datos e inténtelo de nuevo.");
          }
        },
        (error) => {
          if (error.status === 400) {
            alert("Error de solicitud. Verifique los datos e inténtelo de nuevo.");
          } else if (error.status === 500) {
            alert("Error interno del servidor. Por favor, inténtelo más tarde.");
          } else {
            alert("Error desconocido. Por favor, inténtelo más tarde.");
          }
        }
      );

    }
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
            form.reset();
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


  onSubmitAspectosFinancieros(form: any) {


    const fechaAspectosFinancieros = new Date(this.pasfina_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria




    if (form.valid) {
      const nuevoAspectosFinacieros = new AspectosFinancieros(this.id_PPRO_CODIGO_UNICO_aspectos_finacieros,
        this.pasfina_PRESU_CODIFICADO,
        this.pasfina_DEVENGADO,
        this.pasfina_EJECUTADO,
        this.pasfina_ASIGNACION_INICIAL,
        this.pasfina_REFORMAS,
        this.pasfina_PRE_COMPROMISO,
        this.pasfina_COMPROMISO,
        this.pasfina_EJECUTADO_PAGADO,
        this.pasfina_ANTICIPO_NO_AMORTI,
        fechaAspectosFinancieros
      );

      this.serviceAspectosFinacieros.insertaAspectosFinacieros(nuevoAspectosFinacieros).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Aspectos tecnicos creados correctamente') {
            alert("ASPECTOS FINACIEROS CREADOS CON ÉXITO");
            form.reset();
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LOS ASPECTOS FINACIEROS");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS ASPECTOS FINACIEROS");
          form.reset();
          //window.location.reload();
        }
      );
    }
  }




  onSubmitProfroma(form: any) {

    const fechaProforma = new Date(this.pproin_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria

    if (form.valid) {
      const proforma = new Proforma(
        this.id_PPRO_CODIGO_UNICO_proforma,
        this.pproin_VALOR_TOTAL_PROYECTO_PR,
        this.pproin_PROFORMA,
        this.pproin_PRESUPUESTO_PROFORMA,
        this.pproin_ANIO,
        fechaProforma
      );

      this.serviceProforma.insertaProforma(proforma).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Proforma creada correctamente') {
            alert("DATOS DE PROFORMA CREADOS CON ÉXITO");
            form.reset();
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LOS DATOS DE LA PROFORMA");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS DATOS DE LA PROFORMA");
          form.reset();
          //window.location.reload();
        }
      );
    }
  }

  onSubmitReforma(form: any) {

    const fechaReforma = new Date(this.prefoin_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria


    if (form.valid) {
      const reforma = new Reforma(
        this.id_PPRO_CODIGO_UNICO_reforma,
        this.prefoin_VALOR_TOTAL_PROYECTO_R,
        this.prefoin_REFORMA,
        this.prefoin_PRESUPUESTO_REFORMA,
        this.prefoin_ANIO,
        fechaReforma
      );

      this.serviceReforma.insertaReforma(reforma).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Reforma creada correctamente') {
            alert("DATOS DE REFORMA CREADOS CON ÉXITO");
            form.reset();
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LOS DATOS DE LA REFORMA");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS DATOS DE LA REFORMA");
          form.reset();
          //window.location.reload();
        }
      );
    }
  }


  /* onSubmitProcesosSercop(form: any) {
 
 
     const fechaProcesosSercop = new Date(this.pproser_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria
 
 
     if (form.valid) {
       const sercop = new ProcesosSercop(
         this.id_PPRO_CODIGO_UNICO_procesos_sercop,
         this.pproser_PROCESOS_SERCOP.toUpperCase(),
         fechaProcesosSercop,
         this.pproser
       );
 
       this.servicePorocesosSercop.insertarProcesosSercop(sercop).subscribe(
         (response: any) => { // Usa 'any' para manejar el tipo de respuesta
           if (response && response.message === 'Procesos sercop creados correctamente') {
             alert("DATOS DE PROCESOS SERCOP CREADOS CON ÉXITO");
             form.reset();
             //window.location.reload();
             // Aquí puedes hacer lo que necesites con la respuesta del servidor
           } else {
             alert("NO SE PUDO CREAR LOS DATOS DE PROCESOS SERCOP");
             form.reset();
             //window.location.reload();
           }
         },
         error => {
           alert("NO SE PUDO CREAR LOS DATOS DE PROCESOS SERCOP");
           form.reset();
           //window.location.reload();
         }
       );
     }
   }
 
   onSubmitPartidaPresupuestaria(form: any) {
     const fechaPartidaPresupuestaria = new Date(this.prefoin_FECHA + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria
 
 
     if (form.valid) {
       const partidaPresupuestaria = new PartidaPresupuestaria(
         this.selectTipoPartida,
         this.ppart_PARTIDA_PRESUPUESTARIA.toUpperCase(),
         fechaPartidaPresupuestaria
       );
 
       this.servicePartidaPrespuestaria.insertaPartidaPresuestaria(partidaPresupuestaria).subscribe(
         (response: any) => { // Usa 'any' para manejar el tipo de respuesta
           if (response && response.message === 'Partida Presupuestaria creada correctamente') {
             alert("DATOS DE LA PARTIDA PRESUPUESTARIA CREADOS CON ÉXITO");
             form.reset();
             window.location.reload();
             // Aquí puedes hacer lo que necesites con la respuesta del servidor
           } else {
             alert("NO SE PUDO CREAR LOS DATOS DE LA PARTIDA PRESUPUESTARIA");
             form.reset();
             window.location.reload();
           }
         },
         error => {
           alert("NO SE PUDO CREAR LOS DATOS DE LA PARTIDA PRESUPUESTARIA");
           form.reset();
           //window.location.reload();
         }
       );
     }
   }*/


  onSubmitResponsableTecnico(form: any) {
    if (form.valid) {
      // Crear el objeto ResponsableTecnico
      const responsable = new ResponsableTecnico(
        this.prete_NOMBRES,
        this.prete_APELLIDOS,
        this.prete_DERTAMENTO_PER,
        this.prete_DMPER_NUMERO_ROL,
        this.prete_DMPER_CODIGO
      );

      // Verificar existencia del código antes de insertar
      this.servicePrincipal.verificarExistenciaResponsable(this.prete_DMPER_CODIGO).subscribe(
        (existe: boolean) => {
          if (existe) {
            alert("Este Responsable Técnico ya existe");
            form.reset();
          } else {
            // Insertar responsable técnico solo si no existe
            this.servicePrincipal.insertarResponsableTecnico(responsable).subscribe(
              (response: any) => {
                if (response && response.message === 'Responsable Tecnico creado correctamente') {
                  alert("DATOS DEL RESPONSABLE TECNICO CREADOS CON ÉXITO");
                  form.reset();
                  window.location.reload();
                } else {
                  alert("NO SE PUDO CREAR LOS DATOS DEL RESPONSABLE TECNICO");
                  form.reset();
                  window.location.reload();
                }
              },
              error => {
                alert("NO SE PUDO CREAR LOS DATOS DEL RESPONSABLE TECNICO");
                form.reset();
                //window.location.reload();
              }
            );
          }
        },
        error => {
          alert("Error al verificar la existencia del código");
        }
      );
    }
  }


  /* onSubmitDetalleResponsableTecnico(form: any) {
 
     if (form.valid) {
       const Detalleresponsable = new DetalleResponsableTecnico(
         this.ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido,
         this.ID_PPRO_CODIGO_UNICO_responsable
       );
 
       this.servicePrincipal.insertarDetalleResponsableTecnico(Detalleresponsable).subscribe(
         (response: any) => { // Usa 'any' para manejar el tipo de respuesta
           if (response && response.message === 'Dettale Responsable Tecnico creado correctamente') {
             alert(" RESPONSABLE TECNICO ASIGNADO CON ÉXITO");
             form.reset();
             window.location.reload();
             // Aquí puedes hacer lo que necesites con la respuesta del servidor
           } else {
             alert("NO SE PUDO ASIGNAR EL RESPONSABLE TECNICO");
             form.reset();
             //window.location.reload();
           }
         },
         error => {
           alert("NO SE PUDO ASIGNAR EL RESPONSABLE TECNICO");
           form.reset();
           //window.location.reload();
         }
       );
     }
   }*/


  onSubmitDetallePartidaPresupuestaria(form: any) {

    if (form.valid) {
      const DetallePartida = new DetallePartidaPresupuestaria(
        this.ID_PPRO_CODIGO_UNICO_partida_codigo_rapido,
        this.ID_PPRO_CODIGO_UNICO_partida
      );

      this.servicePartidaPrespuestaria.insertaDetallePartidaPresuestaria(DetallePartida).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Detalle Partida Presupuestaria creada correctamente') {
            alert(" PARTIDA PRESUPUESTARIA ASIGNADA CON ÉXITO");
            form.reset();
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO ASIGNAR LA PARTIDA PRESUPUESTARIA");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO ASIGNAR LA PARTIDA PRESUPUESTARIA");
          form.reset();
          //window.location.reload();
        }
      );
    }
  }


  onYearChangeAnioProforma() {
    const year = parseInt(this.pproin_ANIO);
    if (year > this.currentYear) {
      alert('El año no puede ser mayor al actual');
      this.pproin_ANIO = '';
    }
  }

  onYearChangeAnioReforma() {
    const year = parseInt(this.prefoin_ANIO);
    if (year > this.currentYear) {
      alert('El año no puede ser mayor al actual');
      this.prefoin_ANIO = '';
    }
  }

  onYearChangeAnioAporbacion() {
    const year = parseInt(this.ppro_ANIO_APROBACION);
    if (year > this.currentYear) {
      alert('El año no puede ser mayor al actual');
      this.ppro_ANIO_APROBACION = '';
    }
  }

  onYearChangeAnioCalficacion() {
    const year = parseInt(this.ppro_ANIO_CALIFICACION_EJECU);
    if (year > this.currentYear) {
      alert('El año no puede ser mayor al actual');
      this.ppro_ANIO_CALIFICACION_EJECU = '';
    }
  }


  onKeyPressAnioProforma(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^\d+$/.test(charStr) || this.pproin_ANIO?.length >= 4) {
      event.preventDefault();
    }
  }

  onKeyPressAnioReforma(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^\d+$/.test(charStr) || this.prefoin_ANIO?.length >= 4) {
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


  onKeyPressAnioCalificacion(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^\d+$/.test(charStr) || this.ppro_ANIO_CALIFICACION_EJECU?.length >= 4) {
      event.preventDefault();
    }
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

  seleccionarDepartamento(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectDepartamento = parseFloat(target.value);

    //console.log('Departamento seleccionado:', this.selectDepartamento);

  }


  seleccionarResponsableTecnico(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.ID_PPRO_CODIGO_UNICO_responsable = parseFloat(target.value);

    console.log(' seleccionado:', this.ID_PPRO_CODIGO_UNICO_responsable);

  }


  /* seleccionarCodigoRapidoResponsable(event: Event): void {
     const target = event.target as HTMLSelectElement;
     this.ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido = parseFloat(target.value);
 
     console.log(' seleccionado:', this.ID_PPRO_CODIGO_UNICO_responsable_codigo_rapido);
 
     
   }*/



  seleccionarCodigoPartidaPresupuestaria(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.ID_PPRO_CODIGO_UNICO_partida_codigo_rapido = parseFloat(target.value);

    console.log(' seleccionado:', this.ID_PPRO_CODIGO_UNICO_partida_codigo_rapido);


  }

  seleccionarPartidaPresupuestaria(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.ID_PPRO_CODIGO_UNICO_partida = parseFloat(target.value);

    console.log(' seleccionado:', this.ID_PPRO_CODIGO_UNICO_partida);

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

  seleccionarTipoAmbiental(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoAmbiental = parseFloat(target.value);

    console.log('Tipo de amabiental seleccionado:', this.selectTipoAmbiental);

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

  seleccionarTipoPlan(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoPlan = parseFloat(target.value);

    //console.log('Tipo de Plan seleccionado:', this.selectTipoPlan);

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

  seleccionarTipoPeriodicidad(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoPeriodicidad = parseFloat(target.value);

    //console.log('Tipo de Periocidad seleccionado:', this.selectTipoPeriodicidad);

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

  seleccionarEtapaFuncional(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectEtpaFuncional = parseFloat(target.value);
    //console.log('Etapa Funcional seleccionado:', this.selectEtpaFuncional);

  }


  cargarDatosTipoSubprograma() {
    this.servicePrincipal.getListarTipoSubprograma(this.id_PTIPRO).subscribe(
      (data) => {
        this.tipoSubprograma = data;
        // console.log(this.tipoSubprograma);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  seleccionarTipoSubprograma(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectTipoSubprograma = parseFloat(target.value);
    //console.log('Tipo de Subprograma seleccionado:', this.selectTipoSubprograma);

  }

  cargarDatosTipoPrograma() {
    this.servicePrincipal.getListarTipoPrograma().subscribe(
      (data) => {
        this.tipoPrograma = data;
        //console.log(this.tipoSubprograma);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  seleccionarTipoPrograma(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.id_PTIPRO = parseFloat(target.value);
    this.tipoProgramaSeleccionado = true;
    this.cargarDatosTipoSubprograma();
  }


  cargarDatosEstadoProyecto() {
    this.serviceEjecuccionProyecto.getListarEstadoProyecto().subscribe(
      (data) => {
        this.estadoProyecto = data;
        //console.log(this.tipoPlan);

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  seleccionarEstadoProyecto(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectEstadoProyecto = parseFloat(target.value);

    console.log('Tipo de seleccionado:', this.selectEstadoProyecto);

  }



  seleccionarEtapaEjecucion(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectEtapaEjecuccion = parseFloat(target.value);

    // console.log('Tipo de seleccionado:', this.selectEtapaEjecuccion);

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



  buscarDatosCodigoRapido() {
    this.servicePrincipal.getListarCodigoUnico(this.codigo_rapido).subscribe(
      (response: any) => {
        console.log('Datos de usuario:', response);

        // Verifica si hay datos en el array y si ppro_NOMBRE_PROY está presente
        if (response && response.length > 0 && response[0].ppro_NOMBRE_PROY) {
          this.nombre_proyecto = response[0].ppro_NOMBRE_PROY;
          this.id_PPRO_CODIGO_UNICO_aspectos_tecnicos = response[0].id_PPRO_CODIGO_UNICO;
          this.id_PPRO_CODIGO_UNICO_aspectos_finacieros = response[0].id_PPRO_CODIGO_UNICO;
          this.id_PPRO_CODIGO_UNICO_ejecucion_proyecto = response[0].id_PPRO_CODIGO_UNICO;
          this.id_PPRO_CODIGO_UNICO_proforma = response[0].id_PPRO_CODIGO_UNICO;
          this.id_PPRO_CODIGO_UNICO_reforma = response[0].id_PPRO_CODIGO_UNICO;
          this.id_PPRO_CODIGO_UNICO_procesos_sercop = response[0].id_PPRO_CODIGO_UNICO;
          console.log(this.id_PPRO_CODIGO_UNICO_procesos_sercop);


        } else {
          console.error('El campo ppro_NOMBRE_PROY no está presente en la respuesta.');
          alert("El codigo rapido que ingreso no existe verifiquelo")
          this.codigo_rapido = "";
          this.nombre_proyecto = "";
        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }


  buscarDatosCodigoRapidoReforma() {
    this.servicePrincipal.getListarCodigoUnico(this.codigo_rapido_re).subscribe(
      (response: any) => {
        console.log('Datos de usuario:', response);

        // Verifica si hay datos en el array y si ppro_NOMBRE_PROY está presente
        if (response && response.length > 0 && response[0].ppro_NOMBRE_PROY) {
          this.id_PPRO_CODIGO_UNICO_reforma = response[0].id_PPRO_CODIGO_UNICO;
          this.nombre_proyecto_re = response[0].ppro_NOMBRE_PROY;
          console.log(this.id_PPRO_CODIGO_UNICO_reforma);


        } else {
          console.error('El campo ppro_NOMBRE_PROY no está presente en la respuesta.');
          alert("El codigo rapido que ingreso no existe verifiquelo")
          this.codigo_rapido_re = "";
          this.nombre_proyecto_re = "";
        }
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  regresarFormulario() {

    if (this.currentFormIndex > 0) {
      this.currentFormIndex--;
    }

  }

  buscarDatosUser() {
    const username = this.username_name;

    const token = this.serviceAuto.getToken();

    this.servicePrincipal.getDatosResponsable(username, token).subscribe(
      (response: any) => {
        if (Object.keys(response.DATA).length === 0) {
          // El objeto devuelto está vacío, muestra un alert al usuario
          alert("NO SE ENCONTRARON DATOS DE ESTE USUARIO. REVISELO");
          this.username_name = "";
        } else {
          console.log('Datos de usuario:', response);
          this.prete_NOMBRES = response.DATA.NOMBRES;
          this.prete_APELLIDOS = response.DATA.APELLIDOS;
          this.prete_DERTAMENTO_PER = response.DATA.DEPARTAMENTO;
          this.prete_DMPER_NUMERO_ROL = response.DATA.DMPER_NUMERO_ROL;
          this.prete_DMPER_CODIGO = response.DATA.DMPER_CODIGO;

          console.log(this.prete_DMPER_CODIGO);
        }
      },
      (error) => {
        // Maneja errores aquí
        console.error('Error al obtener datos de usuario:', error);
        alert("NO SE ENCONTRARON DATOS DE ESTE USUARIO. REVISELO");
        this.username_name = "";
      }
    );

    console.log(token);
    console.log(username);
  }


}
