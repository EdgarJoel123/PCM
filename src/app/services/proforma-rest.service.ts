import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Proforma } from '../modelo/proforma';

@Injectable({
  providedIn: 'root'
})
export class ProformaRestService {

  constructor(private http: HttpClient) { }

  apiUrlProforma1 = 'http://localhost:8080/proforma/listarGeneracion';
 apiUrlProforma2 = 'http://localhost:8080/proforma/listarSubtrasmision';
  /*apiUrlProforma3 = 'http://localhost:8080/proforma/listarDistribucion';
  apiUrlProforma4 = 'http://localhost:8080/proforma/listarAlumPublico';
  apiUrlProforma5 = 'http://localhost:8080/proforma/listarAcoMedidores';
  apiUrlProforma6 = 'http://localhost:8080/proforma/listarInverGenerales';*/


  apiUrlInsertar = 'http://localhost:8080/proforma/insertar';



  updateProforma(proforma: Proforma) {
    const url = `http://localhost:8080/proforma/editar/${proforma.id_PPROIN}`;

    const fechaParam = proforma.pproin_FECHA instanceof Date ? proforma.pproin_FECHA.toISOString().split('T')[0] : '';
  
  
    const params = new HttpParams()
      .set('PPROIN_VALOR_TOTAL_PROYECTO_PR', proforma.pproin_VALOR_TOTAL_PROYECTO_PR)
      .set('PPROIN_PROFORMA', proforma.pproin_PROFORMA)
      .set('PPROIN_PRESUPUESTO_PROFORMA', proforma.pproin_PRESUPUESTO_PROFORMA)
      .set('PPROIN_ANIO', proforma.pproin_ANIO)
      .set('PPROIN_FECHA', fechaParam)

    return this.http.put<Proforma>(url, {}, { params });
  }



    //insertar
  insertaProforma(proforma: Proforma) {
    return this.http.post<any>(this.apiUrlInsertar, proforma).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  //listar
  
  getListarProforma1(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<Proforma>(`${this.apiUrlProforma1}`, { params });
  
  }

  getListarProforma2(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<Proforma>(`${this.apiUrlProforma2}`, { params });
  
  }

 /* getListarProforma2(): Observable<any> {
    return this.http.get<Proforma>(this.apiUrlProforma2);
  }

  getListarProforma3(): Observable<any> {
    return this.http.get<Proforma>(this.apiUrlProforma3);
  }

  getListarProforma4(): Observable<any> {
    return this.http.get<Proforma>(this.apiUrlProforma4);
  }

  getListarProforma5(): Observable<any> {
    return this.http.get<Proforma>(this.apiUrlProforma5);
  }
  getListarProforma6(): Observable<any> {
    return this.http.get<Proforma>(this.apiUrlProforma6);
  }
*/

}
