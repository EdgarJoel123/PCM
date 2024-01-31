export class EjecucionProyecto {
   pejecp_AVANCE_EJECU_FISICA_PRO:number;
   ppro_MONTO_CALIF_ESTUDI_COSTOS: number;
   ppro_CODIGO_RAPIDO:string;
   id_PPRO_CODIGO_UNICO: number;
   pestpro_ESTADO_PRO:string;
   id_PETAEJEPRO: number;
   petaejepro_ETAPA_EJE_PROYEC:string;
   pejecp_FECHA_FINAL_PRO: Date;
   pejecp_AVANCE_EJECU_TOTAL_PRO: number;
   pejecp_FECHA_INICIO_PRO:Date;
   pejecp_FECHA_PROG_FINA_PRO:Date;
   id_PEJECP: number;
   id_PESTPRO: number;


   constructor(
      id_PETAEJEPRO: number,
      pejecp_AVANCE_EJECU_FISICA_PRO: number,
      pejecp_AVANCE_EJECU_TOTAL_PRO: number,
      pejecp_FECHA_INICIO_PRO: Date,
      pejecp_FECHA_PROG_FINA_PRO: Date,
      pejecp_FECHA_FINAL_PRO: Date,
      id_PPRO_CODIGO_UNICO: number,
   
    ) {
      this.id_PETAEJEPRO = id_PETAEJEPRO;
      this.pejecp_AVANCE_EJECU_FISICA_PRO = pejecp_AVANCE_EJECU_FISICA_PRO;
      this.pejecp_AVANCE_EJECU_TOTAL_PRO = pejecp_AVANCE_EJECU_TOTAL_PRO;
      this.pejecp_FECHA_INICIO_PRO = pejecp_FECHA_INICIO_PRO;
      this.pejecp_FECHA_PROG_FINA_PRO = pejecp_FECHA_PROG_FINA_PRO;
      this.pejecp_FECHA_FINAL_PRO = pejecp_FECHA_FINAL_PRO;
      this.id_PPRO_CODIGO_UNICO = id_PPRO_CODIGO_UNICO;
    }
   
}