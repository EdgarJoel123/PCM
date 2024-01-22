import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AspectosTecnicos } from '../modelo/aspectosTecnicos';

@Injectable({
  providedIn: 'root'
})
export class AspectosTecnicosRestService {

  constructor(private http: HttpClient) { }


  apiListarAspectosTecnicos1 = 'http://localhost:8080/aspectosTecnicos/listarGeneracion';
  apiListarAspectosTecnicos2 = 'http://localhost:8080/aspectosTecnicos/listarSubtrasmision';
  /*apiListarAspectosTecnicos3 = 'http://localhost:8080/aspectosTecnicos/listarDistribucion';
  apiListarAspectosTecnicos4 = 'http://localhost:8080/aspectosTecnicos/listarAlumPublico';
  apiListarAspectosTecnicos5 = 'http://localhost:8080/aspectosTecnicos/listarAcoMedidores';
  apiListarAspectosTecnicos6 = 'http://localhost:8080/aspectosTecnicos/listarInverGenerales';*/

  apiUrlInsertar = 'http://localhost:8080/aspectosTecnicos/insertar';
  apiListarTipoAmbiental = 'http://localhost:8080/aspectosTecnicos/listarTipoAmbiental';


  //actualiza 

  updateAspectosTecnicos(aspectosTecnicos: AspectosTecnicos) {
    const url = `http://localhost:8080/aspectosTecnicos/editar/${aspectosTecnicos.id_PASTE}`;

    const fechaAspectosFinacieros = aspectosTecnicos.paste_FECHA_ASPEC_TECNICOS instanceof Date ? aspectosTecnicos.paste_FECHA_ASPEC_TECNICOS.toISOString().split('T')[0] : '';
    const fechaAmbientalPlani = aspectosTecnicos.paste_FECH_OB_PERM_AMBI_PLANI instanceof Date ? aspectosTecnicos.paste_FECH_OB_PERM_AMBI_PLANI.toISOString().split('T')[0] : '';
    const fechaAmbientalEjec = aspectosTecnicos.paste_FECH_OB_PERM_AMBI_EJEC instanceof Date ? aspectosTecnicos.paste_FECH_OB_PERM_AMBI_EJEC.toISOString().split('T')[0] : '';



    const params = new HttpParams()
      .set('ID_PTIPEAM', aspectosTecnicos.id_PTIPEAM)
      .set('PASTE_FECHA_ASPEC_TECNICOS', fechaAspectosFinacieros)
      .set('PASTE_BENEFI_DIRECT_PLANI', aspectosTecnicos.paste_BENEFI_DIRECT_PLANI)
      .set('PASTE_BENEFI_DIRECT_EJEC', aspectosTecnicos.paste_BENEFI_DIRECT_EJEC)
      .set('PASTE_VIVIENDAS_CON_SERVICIO_P', aspectosTecnicos.paste_VIVIENDAS_CON_SERVICIO_P)
      .set('PASTE_VIVIENDAS_CON_SERVICIO_E', aspectosTecnicos.paste_VIVIENDAS_CON_SERVICIO_E)
      .set('PASTE_VIVIENDAS_SIN_SERVICIO_P', aspectosTecnicos.paste_VIVIENDAS_SIN_SERVICIO_P)
      .set('PASTE_VIVIENDAS_SIN_SERVICIO_E', aspectosTecnicos.paste_VIVIENDAS_SIN_SERVICIO_E)
      .set('PASTE_TOTAL_VIVIENDA_PLANI', aspectosTecnicos.paste_TOTAL_VIVIENDA_PLANI)
      .set('PASTE_TOTAL_VIVIENDA_EJEC', aspectosTecnicos.paste_TOTAL_VIVIENDA_EJEC)
      .set('PASTE_LUMINARIA_NUEVAS_PLANI', aspectosTecnicos.paste_LUMINARIA_NUEVAS_PLANI)
      .set('PASTE_LUMINARIA_NUEVAS_EJEC', aspectosTecnicos.paste_LUMINARIA_NUEVAS_EJEC)
      .set('PASTE_AV_PLANFIICADO', aspectosTecnicos.paste_AV_PLANFIICADO)
      .set('PASTE_AV_EJECUTADO', aspectosTecnicos.paste_AV_EJECUTADO)
      .set('PASTE_MV_PLANFIICADO', aspectosTecnicos.paste_MV_PLANFIICADO)
      .set('PASTE_MV_EJECUTADO', aspectosTecnicos.paste_MV_EJECUTADO)
      .set('PASTE_BV_PLANFIICADO', aspectosTecnicos.paste_BV_PLANFIICADO)
      .set('PASTE_BV_EJECUTADO', aspectosTecnicos.paste_BV_EJECUTADO)
      .set('PASTE_ACOMO_MEDI_PLANI', aspectosTecnicos.paste_ACOMO_MEDI_PLANI)
      .set('PASTE_ACOMO_MEDI_EJEC', aspectosTecnicos.paste_ACOMO_MEDI_EJEC)
      .set('PASTE_MEDIDORES_PLANI', aspectosTecnicos.paste_MEDIDORES_PLANI)
      .set('PASTE_MEDIDORES_EJEC', aspectosTecnicos.paste_MEDIDORES_EJEC)
      .set('PASTE_TRAN_DISTRIBUCION_EJEC', aspectosTecnicos.paste_TRAN_DISTRIBUCION_EJEC)
      .set('PASTE_TRAN_DISTRIBUCION_PLANI', aspectosTecnicos.paste_TRAN_DISTRIBUCION_PLANI)
      .set('PASTE_PO_IN_TRAN__DIST_PLANI', aspectosTecnicos.paste_PO_IN_TRAN__DIST_PLANI)
      .set('PASTE_PO_IN_TRAN__DIST_EJEC', aspectosTecnicos.paste_PO_IN_TRAN__DIST_EJEC)
      .set('PASTE_SUBE_DISTRI_NUEV_PLANI', aspectosTecnicos.paste_SUBE_DISTRI_NUEV_PLANI)
      .set('PASTE_SUBE_DISTRI_NUEV_EJEC', aspectosTecnicos.paste_SUBE_DISTRI_NUEV_EJEC)
      .set('PASTE__PO_IN_SUB_DISTRI_NUEV_P', aspectosTecnicos.paste__PO_IN_SUB_DISTRI_NUEV_P)
      .set('PASTE__PO_IN_SUB_DISTRI_NUEV_E', aspectosTecnicos.paste__PO_IN_SUB_DISTRI_NUEV_E)
      .set('PASTE_FECH_OB_PERM_AMBI_PLANI', fechaAmbientalPlani)
      .set('PASTE_FECH_OB_PERM_AMBI_EJEC', fechaAmbientalEjec)
      .set('PASTE_EMPLE_DIRE_GENERA', aspectosTecnicos.paste_EMPLE_DIRE_GENERA);

    return this.http.put<AspectosTecnicos>(url, {}, { params });
  }



  //insertar
  insertaAspectosTecnicos(aspectosTecnicos: AspectosTecnicos) {

    return this.http.post<any>(this.apiUrlInsertar, aspectosTecnicos).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  // listar Tipo permiso ambiental

  getListarTipoAmbiental(): Observable<any> {
    return this.http.get<AspectosTecnicos>(this.apiListarTipoAmbiental);
  }


  //listar

  getListarAspectosTecnicos1(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<AspectosTecnicos>(`${this.apiListarAspectosTecnicos1}`, { params });
  }


  getListarAspectosTecnicos2(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<AspectosTecnicos>(`${this.apiListarAspectosTecnicos2}`, { params });
  }


  /* getListarAspectosTecnicos3(): Observable<any> {
     return this.http.get<AspectosTecnicos>(this.apiListarAspectosTecnicos3);
   }
 
   getListarAspectosTecnicos4(): Observable<any> {
     return this.http.get<AspectosTecnicos>(this.apiListarAspectosTecnicos4);
   }
 
   getListarAspectosTecnicos5(): Observable<any> {
     return this.http.get<AspectosTecnicos>(this.apiListarAspectosTecnicos5);
   }
   getListarAspectosTecnicos6(): Observable<any> {
     return this.http.get<AspectosTecnicos>(this.apiListarAspectosTecnicos6);
   }
 */

}
