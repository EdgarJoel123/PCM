export class AspectosFinancieros {
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
    ppro_CODIGO_RAPIDO : string;



    constructor(
        id_PPRO_CODIGO_UNICO: number,
        pasfina_PRESU_CODIFICADO: number,
        pasfina_DEVENGADO: number,
        pasfina_EJECUTADO: number,
        pasfina_ASIGNACION_INICIAL: number,
        pasfina_REFORMAS: number,
        pasfina_PRE_COMPROMISO: number,
        pasfina_COMPROMISO: number,
        pasfina_EJECUTADO_PAGADO: number,
        pasfina_ANTICIPO_NO_AMORTI: number,
        pasfina_FECHA: Date,

   
    ){
        this.id_PPRO_CODIGO_UNICO = id_PPRO_CODIGO_UNICO;
        this.pasfina_PRESU_CODIFICADO = pasfina_PRESU_CODIFICADO;
        this.pasfina_DEVENGADO = pasfina_DEVENGADO;
        this.pasfina_EJECUTADO = pasfina_EJECUTADO;
        this.pasfina_ASIGNACION_INICIAL = pasfina_ASIGNACION_INICIAL;
        this.pasfina_REFORMAS = pasfina_REFORMAS;
        this.pasfina_PRE_COMPROMISO = pasfina_PRE_COMPROMISO;
        this.pasfina_COMPROMISO = pasfina_COMPROMISO;
        this.pasfina_EJECUTADO_PAGADO = pasfina_EJECUTADO_PAGADO;
        this.pasfina_ANTICIPO_NO_AMORTI = pasfina_ANTICIPO_NO_AMORTI;
        this.pasfina_FECHA = pasfina_FECHA;
        
    }
}