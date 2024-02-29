export class Detalle {


    id_ROL_OPERACIONES: number;
    id_ROL: number;
    id_OPERACION: number;
    id_MODULO: number;

    nombre_ROL: string;
    descripcion_ROL: string;

    op_NOMBRE: string;
    op_DESCRIPCION: string;

    nombre_MODULO: string;
    descripcion_MODULO: string;

    constructor(rol: number, operecion: number){
        this.id_ROL = rol;
        this.id_OPERACION = operecion;
    }
}