export class PartidaPresupuestaria {
    ptipapre_TIPO_PAR_PRESUPUESTAR: string;
    ppart_PARTIDA_PRESUPUESTARIA: string;
    id_PTIPAPRE: number;
    id_PPRO_CODIGO_UNICO: number;
    ppro_CODIGO_RAPIDO: string;
    id_PPART: number;
    ppart_FECHA: Date;

    ppart_CODIGO_PARTIDA: string;
    ppart_MONTO_PARTIDA: number;


    constructor(
        id_PTIPAPRE: number,
        ppart_PARTIDA_PRESUPUESTARIA: string,
        ppart_FECHA: Date,
        ppart_CODIGO_PARTIDA: string,
        ppart_MONTO_PARTIDA: number

    ) {
        this.id_PTIPAPRE = id_PTIPAPRE;
        this.ppart_PARTIDA_PRESUPUESTARIA = ppart_PARTIDA_PRESUPUESTARIA;
        this.ppart_FECHA = ppart_FECHA;
        this.ppart_CODIGO_PARTIDA = ppart_CODIGO_PARTIDA;
        this.ppart_MONTO_PARTIDA = ppart_MONTO_PARTIDA;

    }

}