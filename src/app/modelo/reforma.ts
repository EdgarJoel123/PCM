export class Reforma {
    prefoin_VALOR_TOTAL_PROYECTO_R: number;
    prefoin_PRESUPUESTO_REFORMA: number;
    prefoin_ANIO: string;
    id_PPRO_CODIGO_UNICO: number;
    ppro_CODIGO_RAPIDO: string;
    prefoin_REFORMA: number;
    id_PREFOIN: number;
    prefoin_FECHA: Date;


     // Constructor que puede recibir parámetros opcionales
  constructor(
    codigoUnico: number,
    valorTotalProyecto: number,
    reforma: number,
    presupuestoReforma: number,
    anio: string,
    prefoin_FECHA: Date
  ) {
    this.id_PPRO_CODIGO_UNICO = codigoUnico;
    this.prefoin_VALOR_TOTAL_PROYECTO_R = valorTotalProyecto;
    this.prefoin_REFORMA = reforma;
    this.prefoin_PRESUPUESTO_REFORMA = presupuestoReforma;
    this.prefoin_ANIO = anio;
    this.prefoin_FECHA = prefoin_FECHA
  }
}