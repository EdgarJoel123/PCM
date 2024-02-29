export class Operacion {
    
    id_MODULO: number;
    nombre_MODULO:string;
    op_NOMBRE: string;
    op_DESCRIPCION: string;
    id_OPERACION: number;

    constructor(id: number, nombre:string, descripcion: string){

        this.id_MODULO = id;
        this.op_NOMBRE = nombre;
        this.op_DESCRIPCION = descripcion;

    }
}