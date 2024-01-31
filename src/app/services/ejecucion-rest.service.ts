import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EjecucionProyecto } from '../modelo/ejecucionProyecto';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of } from 'rxjs';
import { WebSocketService } from './web-socket-service.service';

@Injectable({
  providedIn: 'root'
})
export class EjecucionRestService {

  constructor(private http: HttpClient) { }

  apiUrlEjecucion1 = 'http://localhost:8080/ejecucionProyecto/listar';

  apiUrlEjecucion2 = 'http://localhost:8080/ejecucionProyecto/listarActuales';

  apiUrlInsertar = 'http://localhost:8080/ejecucionProyecto/insertar';


  apiUrlEstadoProyecto = 'http://localhost:8080/ejecucionProyecto/listarEstadosProyecto';
  apiUrlEtapaEjecucion = 'http://localhost:8080/ejecucionProyecto/listarEtapaEjecucion';



  updateEjecucionProyecto(ejecucionProyecto: EjecucionProyecto) {
    const url = `http://localhost:8080/ejecucionProyecto/editar/${ejecucionProyecto.id_PEJECP}`;

    const fechaInicio = ejecucionProyecto.pejecp_FECHA_INICIO_PRO instanceof Date ? ejecucionProyecto.pejecp_FECHA_INICIO_PRO.toISOString().split('T')[0] : '';
  
    const fechaProFinal = ejecucionProyecto.pejecp_FECHA_PROG_FINA_PRO instanceof Date ? ejecucionProyecto.pejecp_FECHA_PROG_FINA_PRO.toISOString().split('T')[0] : '';
  
    const fechaFinal = ejecucionProyecto.pejecp_FECHA_FINAL_PRO instanceof Date ? ejecucionProyecto.pejecp_FECHA_FINAL_PRO.toISOString().split('T')[0] : '';
  
  
    const params = new HttpParams()
      .set('ID_PESTPRO', ejecucionProyecto.id_PESTPRO)
      .set('ID_PETAEJEPRO', ejecucionProyecto.id_PETAEJEPRO)
      .set('PEJECP_AVANCE_EJECU_FISICA_PRO', ejecucionProyecto.pejecp_AVANCE_EJECU_FISICA_PRO)
      .set('PEJECP_AVANCE_EJECU_TOTAL_PRO', ejecucionProyecto.pejecp_AVANCE_EJECU_TOTAL_PRO)
      .set('PEJECP_FECHA_INICIO_PRO', fechaInicio)
      .set('PEJECP_FECHA_PROG_FINA_PRO', fechaProFinal)
      .set('PEJECP_FECHA_FINAL_PRO', fechaFinal);
  
    return this.http.put<EjecucionProyecto>(url, {}, { params });
  }
  


  // listar Estados Proyecto
  getListarEtapaEjecucion(id: number): Observable<any> {
    const params = { ID_PESTPRO: id.toString()};
    return this.http.get<EjecucionProyecto>(`${this.apiUrlEtapaEjecucion}`, { params });
  }

  // listar Estados Proyecto
  getListarEstadoProyecto(): Observable<any> {
    return this.http.get<EjecucionProyecto>(this.apiUrlEstadoProyecto);
  }



  //insertar
  insertarEjecucionProyecto(ejecucionProyecto: EjecucionProyecto) {

    return this.http.post<any>(this.apiUrlInsertar, ejecucionProyecto).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }


  //listar
  getListarEjecucionProyecto1(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<EjecucionProyecto>(`${this.apiUrlEjecucion1}`, { params });
 }

 


   //listar
   getListarEjecucionProyecto2(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<EjecucionProyecto>(`${this.apiUrlEjecucion2}`, { params });
 }


}
