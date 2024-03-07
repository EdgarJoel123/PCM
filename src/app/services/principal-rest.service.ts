import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Proyecto } from '../modelo/principal';
import { ResponsableTecnico } from '../modelo/responsableTecnico';
import { DetalleResponsableTecnico } from '../modelo/detalleResponsableTecnico';

@Injectable({
  providedIn: 'root'
})
export class PrincipalRestService {

  constructor(private http: HttpClient) { }


  apiUrlListarProyectos = 'http://localhost:8080/proyecto/listar';

  apiUrlListarProyectos1 = 'http://localhost:8080/proyecto/listarGeneracion';
  /* apiUrlListarProyectos2 = 'http://localhost:8080/proyecto/listarSubtrasmision';
   apiUrlListarProyectos3 = 'http://localhost:8080/proyecto/listarDistribucion';
   apiUrlListarProyectos4 = 'http://localhost:8080/proyecto/listarAlumPublico';
   apiUrlListarProyectos5 = 'http://localhost:8080/proyecto/listarAcoMedidores';
   apiUrlListarProyectos6 = 'http://localhost:8080/proyecto/listarInverGenerales';*/

  apiUrlInsertarResponsable = 'http://localhost:8080/proyecto/insertar/resposableTecnico';
  apiUrlInsertar = 'http://localhost:8080/proyecto/insertar';

  apiUrlInsertarDetalleResponsable = 'http://localhost:8080/proyecto/insertar/detalle/resposableTecnico';

  apiListarDepartamento = 'http://localhost:8080/proyecto/listarDepartamentos';
  apiListarTipoPlan = 'http://localhost:8080/proyecto/listarTipoPlan';
  apiListarTipoPeriodicidad = 'http://localhost:8080/proyecto/listarTipoPeriodicidad';
  apiListarEtapaFuncional = 'http://localhost:8080/proyecto/listarEtapaFuncional';
  apiListarTipoSubprograma = 'http://localhost:8080/proyecto/listarTipoSubprograma';
  apiListarTipoPrograma = 'http://localhost:8080/proyecto/listarTipoPrograma';


  apiListarResponblesTecnico = 'http://localhost:8080/proyecto/listarResponsablesTecnico';


  apiBuscarCodigoUnico = 'http://localhost:8080/proyecto/obtenerCodigoUnico';


  apiBuscarUsuarios = 'https://app.eeasa.com.ec/WSSisgerhServices/rest/security';


  apiVerifcarResponsable = 'http://localhost:8080/proyecto';



  eliminarProyecto(id: number){

    const url = `http://localhost:8080/proyecto/eliminar/${id}`;
    return this.http.delete(url);

  }


  updateProyectoPrincipal(proyecto: Proyecto) {
    const url = `http://localhost:8080/proyecto/editar/${proyecto.id_PPRO_CODIGO_UNICO}`;
  
    const params = new HttpParams()
      .set('ID_PDEP', proyecto.id_PDEP)
      .set('ID_PTIPLA', proyecto.id_PTIPLA)
      .set('ID_PTIPER', proyecto.id_PTIPER)
      .set('ID_PETAFUN', proyecto.id_PETAFUN)
      .set('ID_PTISUBP', proyecto.id_PTISUBP)
      .set('PPRO_CODIGO_ESTU_COSTOS', proyecto.ppro_CODIGO_ESTU_COSTOS)
      .set('PPRO_NOMBRE_PROY', proyecto.ppro_NOMBRE_PROY)
      .set('PPRO_CODIGO_RAPIDO', proyecto.ppro_CODIGO_RAPIDO)
      .set('PPRO_ANIO_APROBACION', proyecto.ppro_ANIO_APROBACION)
      .set('PPRO_PROCESO_CORPORATIVO_UN', proyecto.ppro_PROCESO_CORPORATIVO_UN)
      .set('PPRO_PROYECTO_ARRASTRE', proyecto.ppro_PROYECTO_ARRASTRE)
      .set('PPRO_PROY_CALI_ESTUDIO_COSTOS', proyecto.ppro_PROY_CALI_ESTUDIO_COSTOS)
      .set('PPRO_ANIO_CALIFICACION_EJECU', proyecto.ppro_ANIO_CALIFICACION_EJECU)
      .set('PPRO_OBJETIVO_PRO', proyecto.ppro_OBJETIVO_PRO)
      .set('PPRO_MONTO_APRO_ESTUDI_COSTOS', proyecto.ppro_MONTO_APRO_ESTUDI_COSTOS)
      .set('PPRO_OBSERVACIONES_JUSTIFICACI', proyecto.ppro_OBSERVACIONES_JUSTIFICACI)
      .set('PPRO_COD_PARROQUIA', proyecto.ppro_COD_PARROQUIA)
  
    return this.http.put<Proyecto>(url, {}, { params });
  }



  // verificar responable 
  verificarExistenciaResponsable(codigo: String): Observable<boolean> {
    const url = `${this.apiVerifcarResponsable}/verificar/${codigo}`;
    return this.http.get<boolean>(url);
  }


  // listar Tipo Subprogrma

  getListarResponsableTecnico(): Observable<any> {
    return this.http.get<ResponsableTecnico>(this.apiListarResponblesTecnico);
  }


  getDatosResponsable(username: string, token: string): Observable<any> {
    // Configura los encabezados con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Configura los parámetros de la solicitud
    const params = new HttpParams().set('inDsgus_cuenta', username);

    // Realiza la solicitud HTTP con los encabezados y parámetros
    return this.http.get<ResponsableTecnico>(`${this.apiBuscarUsuarios}/getUsuarioInformacion`, { headers, params });
  }


  // listar cigo unico 

  getListarCodigoUnico(id: String): Observable<any> {
    const params = { PPRO_CODIGO_RAPIDO: id.toString() };
    return this.http.get<Proyecto>(`${this.apiBuscarCodigoUnico}`, { params });

  }


  // listar Tipo Subprogrma

  getListarTipoPrograma(): Observable<any> {
    return this.http.get<Proyecto>(this.apiListarTipoPrograma);
  }


  // listar Tipo Subprogrma

  getListarTipoSubprograma(id: number): Observable<any> {
    const params = { ID_PTIPRO: id };
    return this.http.get<Proyecto>(`${this.apiListarTipoSubprograma}`, { params });

  }

  // listar etapa funcional

  getListarEtapaFuncional(): Observable<any> {
    return this.http.get<Proyecto>(this.apiListarEtapaFuncional);
  }

  // listar tipo Periocidad

  getListarTipoPeriodicidad(): Observable<any> {
    return this.http.get<Proyecto>(this.apiListarTipoPeriodicidad);
  }

  // listar tipo de plan

  getListarTipoPlan(): Observable<any> {
    return this.http.get<Proyecto>(this.apiListarTipoPlan);
  }
  // listar departamentos 

  getListarDepartamentos(): Observable<any> {
    return this.http.get<Proyecto>(this.apiListarDepartamento);
  }
  // listar

  getListarProyectos(): Observable<any> {
    return this.http.get<Proyecto>(this.apiUrlListarProyectos);
  }


  getListarProyectos1(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<Proyecto>(`${this.apiUrlListarProyectos1}`, { params });

  }

  /* getListarProyectos2(): Observable<any> {
    return this.http.get<Proyecto>(this.apiUrlListarProyectos2);
  }

  getListarProyectos3(): Observable<any> {
    return this.http.get<Proyecto>(this.apiUrlListarProyectos3);
  }

  getListarProyectos4(): Observable<any> {
    return this.http.get<Proyecto>(this.apiUrlListarProyectos4);
  }

  getListarProyectos5(): Observable<any> {
    return this.http.get<Proyecto>(this.apiUrlListarProyectos5);
  }
  getListarProyectos6(): Observable<any> {
    return this.http.get<Proyecto>(this.apiUrlListarProyectos6);
  }*/

  //insertar
  insertaProyecto(proyecto: Proyecto) {

    return this.http.post<any>(this.apiUrlInsertar, proyecto).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }


  //insertar respodsble tecnico 
  insertarResponsableTecnico(responsableTecnico: ResponsableTecnico) {

    return this.http.post<any>(this.apiUrlInsertarResponsable, responsableTecnico).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  //insertar respodsble tecnico 
  insertarDetalleResponsableTecnico(detalleResponsableTecnico: DetalleResponsableTecnico) {

    return this.http.post<any>(this.apiUrlInsertarDetalleResponsable, detalleResponsableTecnico).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }


}
