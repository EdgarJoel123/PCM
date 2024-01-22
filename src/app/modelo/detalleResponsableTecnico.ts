export class DetalleResponsableTecnico {
    id_PPRO_CODIGO_UNICO: number;
    id_PRETE: number;
    fech_DETALLE_RES: Date;

    constructor(
      id_PPRO_CODIGO_UNICO: number,
      id_PRETE: number,
      fech_DETALLE_RES: Date
    ){
      this.id_PPRO_CODIGO_UNICO = id_PPRO_CODIGO_UNICO;
      this.id_PRETE= id_PRETE;
      this.fech_DETALLE_RES = fech_DETALLE_RES;
    }
  }