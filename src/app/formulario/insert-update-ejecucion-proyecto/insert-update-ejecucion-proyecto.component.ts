import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EjecucionProyecto } from 'src/app/modelo/ejecucionProyecto';
import { EjecucionRestService } from 'src/app/services/ejecucion-rest.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-insert-update-ejecucion-proyecto',
  templateUrl: './insert-update-ejecucion-proyecto.component.html',
  styleUrls: ['./insert-update-ejecucion-proyecto.component.css']
})
export class InsertUpdateEjecucionProyectoComponent {


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

  id_PEJECP: number;


  //estado proyecto 
  estadoProyecto: EjecucionProyecto[];
  selectEstadoProyecto: number;


  //etapa de ejecuccion
  etapaEjecucion: EjecucionProyecto[];
  selectEtapaEjecuccion: number;


  id_PPRO_CODIGO_UNICO_ejecucion_proyecto: number;

  isEtapaDisabled: boolean = false;
  previousIdPetajeepro: number; // Variable para almacenar el valor anterior de id_PETAEJEPRO

  porcentajeTotal: number;


  constructor(private serviceEjecuccionProyecto: EjecucionRestService, private sharedService: SharedIDService, private router: Router) {
    this.id_PPRO_CODIGO_UNICO_ejecucion_proyecto = sharedService.getCodigoUnico();
  }

  ngOnInit(): void {
 
    this.buscarDatosEjecucionProyecto();

    this.cargarDatosEstadoProyecto();
  


  }


  calcularPorcentaje(): void {
    let porcentaje: number;
    
    if (this.selectEstadoProyecto === 1) {
      porcentaje = 0; // Porcentaje para "No iniciado"
    } else if (this.selectEstadoProyecto === 2) {
      porcentaje = 0; // Porcentaje para "Iniciado"
    } else if (this.selectEstadoProyecto === 3) {
      porcentaje = 100; // Porcentaje para "Finalizado"
    } else if (this.selectEstadoProyecto === 4) {
      porcentaje = 0; // Porcentaje para "Paralizado"
    } else if (this.selectEstadoProyecto === 5) {
      // Calculamos el porcentaje según la etapa de ejecución para "En ejecución 41%-90%"
      if (this.selectEtapaEjecuccion === 5) {
        porcentaje = 40 + (this.pejecp_AVANCE_EJECU_FISICA_PRO * 0.5); // Usamos el valor de O28
      } else {
        porcentaje = 0; // Si el estado no es "En ejecución 41%-90%", el porcentaje es 0
      }
    } else if (this.selectEstadoProyecto === 6) {
      porcentaje = 95; // Porcentaje para "Acta de entrega - recepción"
    } else if (this.selectEstadoProyecto === 7) {
      porcentaje = 100; // Porcentaje para "Registro contable"
    } else {
      porcentaje = 0; // Valor predeterminado
    }
  
    this.porcentajeTotal = porcentaje; // Asignamos el resultado a la variable porcentajeTotal
    
  }
  
  
  



  onSubmitEjecucionProyecto(form: any) {


    const fechaInicioProyecto = new Date(this.pejecp_FECHA_INICIO_PRO + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria

    const fechaFinalProgramada = new Date(this.pejecp_FECHA_PROG_FINA_PRO + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria

    const fechaFinalProyecto = new Date(this.pejecp_FECHA_FINAL_PRO + 'T00:00:00'); // Agregar la hora para evitar problemas de zona horaria




    if (form.valid) {
      const ejecucionProyecto = new EjecucionProyecto(
        this.selectEtapaEjecuccion,
        this.pejecp_AVANCE_EJECU_FISICA_PRO,
        this.pejecp_AVANCE_EJECU_TOTAL_PRO,
        fechaInicioProyecto,
        fechaFinalProgramada,
        fechaFinalProyecto,
        this.id_PPRO_CODIGO_UNICO_ejecucion_proyecto,

      );

      this.serviceEjecuccionProyecto.insertarEjecucionProyecto(ejecucionProyecto).subscribe(
        (response: any) => { // Usa 'any' para manejar el tipo de respuesta
          if (response && response.message === 'Ejecucuion del proyecto creado correctamente') {
            alert("DATOS DE EJEUCCION CREADOS CON ÉXITO");
            //form.reset();
            this.router.navigate(['ejecucioProyecto']);
            //window.location.reload();
            // Aquí puedes hacer lo que necesites con la respuesta del servidor
          } else {
            alert("NO SE PUDO CREAR LOS DATOS DE EJEUCCION");
            form.reset();
            //window.location.reload();
          }
        },
        error => {
          alert("NO SE PUDO CREAR LOS DATOS DE EJEUCCION");
          form.reset();
          //window.location.reload();
        }
      );
    }
  }





  seleccionarEstadoProyecto(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectEstadoProyecto = parseFloat(target.value);
  
    // Restaurar el valor anterior de id_PETAEJEPRO si el nuevo estado es "PARALIZADO"
    if (this.selectEstadoProyecto === 4) {
      this.isEtapaDisabled = true;
      this.id_PETAEJEPRO = this.previousIdPetajeepro;
      alert("El estado del proyecto está PARALIZADO. Se mantendrá el último valor ingresado.");
    } else {
      this.isEtapaDisabled = false;
      this.cargarDatosEpataEjecuccion();
    }
  }

  seleccionarEtapaEjecucion(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectEtapaEjecuccion = parseFloat(target.value);

    console.log('Tipo de seleccionado:', this.selectEtapaEjecuccion);

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

  cargarDatosEpataEjecuccion() {
    this.serviceEjecuccionProyecto.getListarEtapaEjecucion(this.id_PESTPRO).subscribe(
      (data) => {
        this.etapaEjecucion = data;
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  buscarDatosEjecucionProyecto() {
    this.serviceEjecuccionProyecto.getListarEjecucionProyecto2(this.id_PPRO_CODIGO_UNICO_ejecucion_proyecto).subscribe(
      (response: any) => {
        //console.log('Datos de ejecucion de un proyecto:', response);

        if (response && response.length && response[0].id_PEJECP !== 0) {
          const data = response[0];
          this.pejecp_FECHA_INICIO_PRO = data.pejecp_FECHA_INICIO_PRO;
          this.pejecp_FECHA_PROG_FINA_PRO = data.pejecp_FECHA_PROG_FINA_PRO;
          this.pejecp_FECHA_FINAL_PRO = data.pejecp_FECHA_FINAL_PRO;
          this.pestpro_ESTADO_PRO = data.pestpro_ESTADO_PRO;
          this.petaejepro_ETAPA_EJE_PROYEC = data.petaejepro_ETAPA_EJE_PROYEC;
          this.pejecp_AVANCE_EJECU_FISICA_PRO = data.pejecp_AVANCE_EJECU_FISICA_PRO;
          this.pejecp_AVANCE_EJECU_TOTAL_PRO = data.pejecp_AVANCE_EJECU_TOTAL_PRO;
          this.selectEstadoProyecto = data.id_PESTPRO;
          this.id_PESTPRO = data.id_PESTPRO;
          this.selectEtapaEjecuccion = data.id_PETAEJEPRO;
          this.id_PETAEJEPRO = data.id_PETAEJEPRO;
          this.id_PEJECP = data.id_PEJECP;


        //  console.log(this.id_PESTPRO);
          //console.log(this.id_PETAEJEPRO);

          // Establecer el valor de isEtapaDisabled
          this.isEtapaDisabled = data.pestpro_ESTADO_PRO === 'PARALIZADO';

          // Guardar el valor actual de id_PETAEJEPRO
          this.previousIdPetajeepro = data.id_PETAEJEPRO;

          this.calcularPorcentaje();

          // Establecer el valor de id_PETAEJEPRO solo si no está deshabilitado
          if (!this.isEtapaDisabled) {
            this.id_PETAEJEPRO = data.id_PETAEJEPRO;
          }
          this.cargarDatosEpataEjecuccion();
        } else {
          alert("Todavía no existe ningún dato de Ejecución del Proyecto, ingréselos");
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  actualizarEjecucionProyecto(form: any) {
    const fechaIncio = new Date(this.pejecp_FECHA_INICIO_PRO);
    const fechaProFinal = new Date(this.pejecp_FECHA_PROG_FINA_PRO);
    const fechaFinal = new Date(this.pejecp_FECHA_FINAL_PRO);

    if (form.valid) {
      const ejecucion: EjecucionProyecto = {

        pejecp_AVANCE_EJECU_FISICA_PRO: this.pejecp_AVANCE_EJECU_FISICA_PRO,
        ppro_MONTO_CALIF_ESTUDI_COSTOS: this.ppro_MONTO_CALIF_ESTUDI_COSTOS,
        /* nulos*/ ppro_CODIGO_RAPIDO: "",
         /* nulos*/ id_PPRO_CODIGO_UNICO: this.id_PPRO_CODIGO_UNICO_ejecucion_proyecto,
        /* nulos*/  pestpro_ESTADO_PRO: this.pestpro_ESTADO_PRO,
        id_PESTPRO: this.selectEstadoProyecto,
        id_PETAEJEPRO: this.selectEtapaEjecuccion,
        petaejepro_ETAPA_EJE_PROYEC: this.petaejepro_ETAPA_EJE_PROYEC,
        pejecp_FECHA_FINAL_PRO: fechaFinal,
        pejecp_AVANCE_EJECU_TOTAL_PRO: this.pejecp_AVANCE_EJECU_TOTAL_PRO,
        pejecp_FECHA_INICIO_PRO: fechaIncio,
        pejecp_FECHA_PROG_FINA_PRO: fechaProFinal,
        id_PEJECP: this.id_PEJECP,



      };

      this.serviceEjecuccionProyecto.updateEjecucionProyecto(ejecucion).subscribe(
        (response: any) => {
          if (response && response.message === 'Ejecucion del proyecto actualizados correctamente') {
            alert("DATOS DE LA EJECUCION DE UN PROYECTO ACTUALIZADOS CON ÉXITO");
            this.router.navigate(['ejecucioProyecto']);

          } else {
            alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LA EJECUCION DE UN PROYECTO");

          }
        },
        error => {
          console.error("Error al actualizar", error);
          alert("NO SE PUDO ACTUALIZAR LOS DATOS DE LA EJECUCION DE UN PROYECTO");

        }
      );
    }
  }

  confirmarActualizacion(form: NgForm): void {
    if (window.confirm('¿Estás seguro de que deseas actualizar el registro?')) {
      this.actualizarEjecucionProyecto(form);
    }
  }


}
