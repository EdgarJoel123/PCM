export class ResponsableTecnico {
    id_PRETE: number;
    prete_NOMBRES: String;
    prete_APELLIDOS: String;
    prete_DERTAMENTO_PER: String;
    prete_DMPER_NUMERO_ROL: String;
    prete_DMPER_CODIGO: String;
 


    constructor(
        prete_NOMBRES: String,
        prete_APELLIDOS: String,
        prete_DERTAMENTO_PER: String,
        prete_DMPER_NUMERO_ROL: String,
        prete_DMPER_CODIGO: String,
    
    ){
        this.prete_NOMBRES = prete_NOMBRES;
        this.prete_APELLIDOS = prete_APELLIDOS;
        this.prete_DERTAMENTO_PER = prete_DERTAMENTO_PER;
        this.prete_DMPER_NUMERO_ROL = prete_DMPER_NUMERO_ROL;
        this.prete_DMPER_CODIGO = prete_DMPER_CODIGO;
     

    }

}