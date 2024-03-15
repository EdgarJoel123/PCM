export class Proyecto {
    /*canton: string;
    parroquia: string;
    provincia: string;*/
    ppro_OBSERVACIONES_JUSTIFICACI: string;
    id_PPRO_CODIGO_UNICO: number;
    ptipla_TIPO_PLAN: string;
    ppro_NOMBRE_PROY: string;
    ppro_ANIO_APROBACION: string;
    pdep_DEPARTAMENTO: string;
    ptipro_TIPO_PROGRAMA: string;
    ppro_OBJETIVO_PRO: string;
    prete_APELLIDOS: string;
    ptiper_TIPO_PERIODICIDAD: string;
    ppro_PROY_CALI_ESTUDIO_COSTOS: string;
    ppro_ANIO_CALIFICACION_EJECU: string;
    ppro_MONTO_APRO_ESTUDI_COSTOS: number;
    petafun_ETAPA_FUNCIONAL: string;
    ppro_CODIGO_ESTU_COSTOS: string;
    ppro_PROYECTO_ARRASTRE: string;
    ppro_PROCESO_CORPORATIVO_UN: string;
    ptisubp_TIPO_SUBPROGRAMA: string;
    prete_NOMBRES: string;
    id_PTISUBP: number;
    id_PTIPER: number;
    id_PETAFUN: number;
    id_PTIPLA: number;
    id_PTIPRO: number;
    id_PDEP: number;
    prete_DMPER_NUMERO_ROL: string;
    ppro_COD_PARROQUIA: string;
    prete_DMPER_CODIGO: string;
    prete_DERTAMENTO_PER: string;
    id_PEJECP: number;
    id_PASTE: number;
    id_PRETE: number;

    responsableTecnico: string;

    parroquia: string;

    
    constructor(
        id_PDEP: number,
        id_PTIPLA: number,
        id_PTIPER: number,
        id_PETAFUN: number,
        id_PTISUBP: number,
        ppro_CODIGO_ESTU_COSTOS: string,
        ppro_NOMBRE_PROY: string,
        ppro_ANIO_APROBACION: string,
        ppro_PROCESO_CORPORATIVO_UN: string,
        ppro_PROYECTO_ARRASTRE: string,
        ppro_PROY_CALI_ESTUDIO_COSTOS: string,
        ppro_ANIO_CALIFICACION_EJECU: string,
        ppro_OBJETIVO_PRO: string,
        ppro_MONTO_APRO_ESTUDI_COSTOS: number,
        ppro_OBSERVACIONES_JUSTIFICACI: string,
        ppro_COD_PARROQUIA: string
    ) {
        this.id_PDEP = id_PDEP;
        this.id_PTIPLA = id_PTIPLA;
        this.id_PTIPER = id_PTIPER;
        this.id_PETAFUN = id_PETAFUN;
        this.id_PTISUBP = id_PTISUBP;
        this.ppro_CODIGO_ESTU_COSTOS = ppro_CODIGO_ESTU_COSTOS;
        this.ppro_NOMBRE_PROY = ppro_NOMBRE_PROY;
        this.ppro_ANIO_APROBACION = ppro_ANIO_APROBACION;
        this.ppro_PROCESO_CORPORATIVO_UN = ppro_PROCESO_CORPORATIVO_UN;
        this.ppro_PROYECTO_ARRASTRE = ppro_PROYECTO_ARRASTRE;
        this.ppro_PROY_CALI_ESTUDIO_COSTOS = ppro_PROY_CALI_ESTUDIO_COSTOS;
        this.ppro_ANIO_CALIFICACION_EJECU = ppro_ANIO_CALIFICACION_EJECU;
        this.ppro_OBJETIVO_PRO = ppro_OBJETIVO_PRO;
        this.ppro_MONTO_APRO_ESTUDI_COSTOS = ppro_MONTO_APRO_ESTUDI_COSTOS;
        this.ppro_OBSERVACIONES_JUSTIFICACI = ppro_OBSERVACIONES_JUSTIFICACI;
        this.ppro_COD_PARROQUIA = ppro_COD_PARROQUIA;
    }

}