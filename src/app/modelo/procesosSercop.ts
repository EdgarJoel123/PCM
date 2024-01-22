export class ProcesosSercop {
    ppro_CODIGO_RAPIDO: string;
    id_PPRO_CODIGO_UNICO: number;
    pproser_PROCESOS_SERCOP:string;
    id_PPROSER:number;
    pproser_FECHA: Date;

    pproser_CODIGO_SERCOP: string;



    constructor(
        id_PPRO_CODIGO_UNICO: number,
        pproser_PROCESOS_SERCOP: string,
        pproser_FECHA: Date,
        pproser_CODIGO_SERCOP: string
      ) {
        this.id_PPRO_CODIGO_UNICO = id_PPRO_CODIGO_UNICO;
        this.pproser_PROCESOS_SERCOP = pproser_PROCESOS_SERCOP;
        this.pproser_FECHA = pproser_FECHA;
        this.pproser_CODIGO_SERCOP = pproser_CODIGO_SERCOP;
      }


      
}