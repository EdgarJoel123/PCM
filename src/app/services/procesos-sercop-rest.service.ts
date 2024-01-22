import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ProcesosSercop } from '../modelo/procesosSercop';

@Injectable({
  providedIn: 'root'
})
export class ProcesosSercopRestService {

  constructor(private http: HttpClient) { }

  apiUrlProcesosSercop1 = 'http://localhost:8080/procesosSercop/listarGeneracion';
  apiUrlProcesosSercop2 = 'http://localhost:8080/procesosSercop/listarSubtrasmision';
  /*apiUrlProcesosSercop3 = 'http://localhost:8080/procesosSercop/listarDistribucion';
  apiUrlProcesosSercop4 = 'http://localhost:8080/procesosSercop/listarAlumPublico';
  apiUrlProcesosSercop5 = 'http://localhost:8080/procesosSercop/listarAcoMedidores';
  apiUrlProcesosSercop6 = 'http://localhost:8080/procesosSercop/listarInverGenerales';*/

  apiUrlInsertar = 'http://localhost:8080/procesosSercop/insertar';


  updateProcesosSercop(procesosSercop: ProcesosSercop) {
    const url = `http://localhost:8080/procesosSercop/editar/${procesosSercop.id_PPROSER}`;
  
    const fechaParam = procesosSercop.pproser_FECHA instanceof Date ? procesosSercop.pproser_FECHA.toISOString().split('T')[0] : '';
  
    const params = new HttpParams()
      .set('PPROSER_PROCESOS_SERCOP', procesosSercop.pproser_PROCESOS_SERCOP)
      .set('PPROSER_FECHA', fechaParam)
      .set('PPROSER_CODIGO_SERCOP', procesosSercop.pproser_CODIGO_SERCOP);
  
    return this.http.put<ProcesosSercop>(url, {}, { params });
  }
  
  


  //insertar
  insertarProcesosSercop(procesosSercop: ProcesosSercop) {
    return this.http.post<any>(this.apiUrlInsertar, procesosSercop).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }


  getListarProcesosSercop1(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<ProcesosSercop>(`${this.apiUrlProcesosSercop1}`, { params });

  }
  getListarProcesosSercop2(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<ProcesosSercop>(`${this.apiUrlProcesosSercop2}`, { params });

  }
  /*  getListarProcesosSercop3(): Observable<any> {
      return this.http.get<ProcesosSercop>(this.apiUrlProcesosSercop3);
    }
  
    getListarProcesosSercop4(): Observable<any> {
      return this.http.get<ProcesosSercop>(this.apiUrlProcesosSercop4);
    }
  
    getListarProcesosSercop5(): Observable<any> {
      return this.http.get<ProcesosSercop>(this.apiUrlProcesosSercop5);
    }
    getListarProcesosSercop6(): Observable<any> {
      return this.http.get<ProcesosSercop>(this.apiUrlProcesosSercop6);
    }*/
}
