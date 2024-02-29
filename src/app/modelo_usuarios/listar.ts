export class Listar {

    descripcion_ROL: string;
    descripcion_MODULO: string;
    op_DESCRIPCION: string;
    eliminado: string;
    bloqueado: string;
    ape_USUARIO: string;
    nombre_MODULO: string;
    user_NAME: string;
    nomb_USUARIO: string;
    nombre_ROL: string;
    op_NOMBRE: string;

    id_ROL: number;
    /*id_MODULO: number;
    id_OPERACION: number;*/

    dmper_CODIGO: string;
    dmper_NUMERO_ROL: string;

    id_USUARIO:number;

    constructor(
      id_ROL: number,
      user_NAME: string,
      nomb_USUARIO: string,
      ape_USUARIO: string,
      bloqueado: string,
      eliminado: string,
      dmper_CODIGO: string,
      dmper_NUMERO_ROL: string
    ) {
      this.id_ROL = id_ROL;
      this.user_NAME = user_NAME;
      this.nomb_USUARIO = nomb_USUARIO;
      this.ape_USUARIO = ape_USUARIO;
      this.bloqueado = bloqueado;
      this.eliminado = eliminado;
      this.dmper_CODIGO = dmper_CODIGO;
      this.dmper_NUMERO_ROL = dmper_NUMERO_ROL;
    }



}