export class DetallePartidaPresupuestaria {

    id_PPRO_CODIGO_UNICO: number;
    id_PPART: number;

    constructor(
        id_PPRO_CODIGO_UNICO: number,
        id_PPART: number
    ){
        this.id_PPRO_CODIGO_UNICO = id_PPRO_CODIGO_UNICO;
        this.id_PPART = id_PPART;

    }
}