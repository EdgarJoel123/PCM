export class AspectosTecnicos {
    paste_VIVIENDAS_CON_SERVICIO_E: number;
    paste_VIVIENDAS_CON_SERVICIO_P: number;
    paste_VIVIENDAS_SIN_SERVICIO_E: number;
    paste__PO_IN_SUB_DISTRI_NUEV_E: number;
    paste_VIVIENDAS_SIN_SERVICIO_P: number;
    paste__PO_IN_SUB_DISTRI_NUEV_P: number;
    id_PTIPEAM: number;
    paste_AV_EJECUTADO: number;
    paste_MV_EJECUTADO: number;
    paste_BV_EJECUTADO: number;
    paste_BV_PLANFIICADO: number;
    paste_MEDIDORES_EJEC: number;
    paste_MEDIDORES_PLANI: number;
    id_PPRO_CODIGO_UNICO: number;
    paste_ACOMO_MEDI_EJEC: number;
    paste_MV_PLANFIICADO: number;
    paste_AV_PLANFIICADO: number;
    ptipeam_TIPO_PER_AMBIENTAL: string;
    paste_TOTAL_VIVIENDA_PLANI: number;
    paste_FECH_OB_PERM_AMBI_EJEC: Date;
    paste_TRAN_DISTRIBUCION_EJEC: number;
    paste_PO_IN_TRAN__DIST_PLANI: number;
    paste_EMPLE_DIRE_GENERA: number;
    paste_BENEFI_DIRECT_EJEC: number;
    paste_FECHA_ASPEC_TECNICOS: Date;
    paste_BENEFI_DIRECT_PLANI: number;
    paste_LUMINARIA_NUEVAS_EJEC: number;
    paste_LUMINARIA_NUEVAS_PLANI: number;
    paste_TRAN_DISTRIBUCION_PLANI: number;
    paste_FECH_OB_PERM_AMBI_PLANI: Date;
    paste_TOTAL_VIVIENDA_EJEC: number;
    paste_PO_IN_TRAN__DIST_EJEC: number;
    paste_ACOMO_MEDI_PLANI: number;
    paste_SUBE_DISTRI_NUEV_PLANI: number;
    paste_SUBE_DISTRI_NUEV_EJEC: number;
    id_PASTE: number;
    ppro_CODIGO_RAPIDO : string;



    constructor(
        paste_FECHA_ASPEC_TECNICOS: Date,
        id_PTIPEAM: number,
        paste_BENEFI_DIRECT_PLANI: number,
        paste_BENEFI_DIRECT_EJEC: number,
        paste_VIVIENDAS_CON_SERVICIO_P: number,
        paste_VIVIENDAS_CON_SERVICIO_E: number,
        paste_VIVIENDAS_SIN_SERVICIO_P: number,
        paste_VIVIENDAS_SIN_SERVICIO_E: number,
        paste_TOTAL_VIVIENDA_PLANI: number,
        paste_TOTAL_VIVIENDA_EJEC: number,
        paste_LUMINARIA_NUEVAS_PLANI: number,
        paste_LUMINARIA_NUEVAS_EJEC: number,
        paste_AV_PLANFIICADO: number,
        paste_AV_EJECUTADO: number,
        paste_MV_PLANFIICADO: number,
        paste_MV_EJECUTADO: number,
        paste_BV_PLANFIICADO: number,
        paste_BV_EJECUTADO: number,
        paste_ACOMO_MEDI_PLANI: number,
        paste_ACOMO_MEDI_EJEC: number,
        paste_MEDIDORES_PLANI: number,
        paste_MEDIDORES_EJEC: number,
        paste_TRAN_DISTRIBUCION_EJEC: number,
        paste_TRAN_DISTRIBUCION_PLANI: number,
        paste_PO_IN_TRAN__DIST_PLANI: number,
        paste_PO_IN_TRAN__DIST_EJEC: number,
        paste_SUBE_DISTRI_NUEV_PLANI: number,
        paste_SUBE_DISTRI_NUEV_EJEC: number,
        paste__PO_IN_SUB_DISTRI_NUEV_P: number,
        paste__PO_IN_SUB_DISTRI_NUEV_E: number,
        paste_FECH_OB_PERM_AMBI_PLANI: Date,
        paste_FECH_OB_PERM_AMBI_EJEC: Date,
        paste_EMPLE_DIRE_GENERA: number,
        id_PPRO_CODIGO_UNICO: number,
    ) {
        this.paste_FECHA_ASPEC_TECNICOS = paste_FECHA_ASPEC_TECNICOS;
        this.id_PTIPEAM = id_PTIPEAM;
        this.paste_BENEFI_DIRECT_PLANI = paste_BENEFI_DIRECT_PLANI;
        this.paste_BENEFI_DIRECT_EJEC = paste_BENEFI_DIRECT_EJEC;
        this.paste_VIVIENDAS_CON_SERVICIO_P = paste_VIVIENDAS_CON_SERVICIO_P;
        this.paste_VIVIENDAS_CON_SERVICIO_E = paste_VIVIENDAS_CON_SERVICIO_E;
        this.paste_VIVIENDAS_SIN_SERVICIO_P = paste_VIVIENDAS_SIN_SERVICIO_P;
        this.paste_VIVIENDAS_SIN_SERVICIO_E = paste_VIVIENDAS_SIN_SERVICIO_E;
        this.paste_TOTAL_VIVIENDA_PLANI = paste_TOTAL_VIVIENDA_PLANI;
        this.paste_TOTAL_VIVIENDA_EJEC = paste_TOTAL_VIVIENDA_EJEC;
        this.paste_LUMINARIA_NUEVAS_PLANI = paste_LUMINARIA_NUEVAS_PLANI;
        this.paste_LUMINARIA_NUEVAS_EJEC = paste_LUMINARIA_NUEVAS_EJEC;
        this.paste_AV_PLANFIICADO = paste_AV_PLANFIICADO;
        this.paste_AV_EJECUTADO = paste_AV_EJECUTADO;
        this.paste_MV_PLANFIICADO = paste_MV_PLANFIICADO;
        this.paste_MV_EJECUTADO = paste_MV_EJECUTADO;
        this.paste_BV_PLANFIICADO = paste_BV_PLANFIICADO;
        this.paste_BV_EJECUTADO = paste_BV_EJECUTADO;
        this.paste_ACOMO_MEDI_PLANI = paste_ACOMO_MEDI_PLANI;
        this.paste_ACOMO_MEDI_EJEC = paste_ACOMO_MEDI_EJEC;
        this.paste_MEDIDORES_PLANI = paste_MEDIDORES_PLANI;
        this.paste_MEDIDORES_EJEC = paste_MEDIDORES_EJEC;
        this.paste_TRAN_DISTRIBUCION_EJEC = paste_TRAN_DISTRIBUCION_EJEC;
        this.paste_TRAN_DISTRIBUCION_PLANI = paste_TRAN_DISTRIBUCION_PLANI;
        this.paste_PO_IN_TRAN__DIST_PLANI = paste_PO_IN_TRAN__DIST_PLANI;
        this.paste_PO_IN_TRAN__DIST_EJEC = paste_PO_IN_TRAN__DIST_EJEC;
        this.paste_SUBE_DISTRI_NUEV_PLANI = paste_SUBE_DISTRI_NUEV_PLANI;
        this.paste_SUBE_DISTRI_NUEV_EJEC = paste_SUBE_DISTRI_NUEV_EJEC;
        this.paste__PO_IN_SUB_DISTRI_NUEV_P = paste__PO_IN_SUB_DISTRI_NUEV_P;
        this.paste__PO_IN_SUB_DISTRI_NUEV_E = paste__PO_IN_SUB_DISTRI_NUEV_E;
        this.paste_FECH_OB_PERM_AMBI_PLANI = paste_FECH_OB_PERM_AMBI_PLANI;
        this.paste_FECH_OB_PERM_AMBI_EJEC = paste_FECH_OB_PERM_AMBI_EJEC;
        this.paste_EMPLE_DIRE_GENERA = paste_EMPLE_DIRE_GENERA;
        this.id_PPRO_CODIGO_UNICO = id_PPRO_CODIGO_UNICO;
    }


}