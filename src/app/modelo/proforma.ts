export class Proforma {
    pproin_VALOR_TOTAL_PROYECTO_PR: number;
    pproin_PRESUPUESTO_PROFORMA: number;
    pproin_ANIO: string;
    id_PPRO_CODIGO_UNICO: number;
    ppro_CODIGO_RAPIDO: string;
    pproin_PROFORMA: number;
    id_PPROIN: number;
    pproin_FECHA: Date;

    // Constructor que puede recibir parámetros opcionales
    constructor(
        codigoUnico: number,
        valorTotalProyecto: number,
        proforma: number,
        presupuestoProforma: number,
        anio: string,
        pproin_FECHA: Date
    ) {
        this.id_PPRO_CODIGO_UNICO = codigoUnico;
        this.pproin_VALOR_TOTAL_PROYECTO_PR = valorTotalProyecto;
        this.pproin_PROFORMA = proforma;
        this.pproin_PRESUPUESTO_PROFORMA = presupuestoProforma;
        this.pproin_ANIO = anio;
        this.pproin_FECHA = pproin_FECHA;
    }
}