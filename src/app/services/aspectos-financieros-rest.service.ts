import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AspectosFinancieros } from '../modelo/aspectosFinacieros';

@Injectable({
  providedIn: 'root'
})
export class AspectosFinancierosRestService {

  constructor(private http: HttpClient) { }

  apiUrlListarAspectosFinancieros1 = 'http://localhost:8080/aspectosFinancieros/listarGeneracion';
  apiUrlListarAspectosFinancieros2 = 'http://localhost:8080/aspectosFinancieros/listarSubtrasmision';
  /* apiUrlListarAspectosFinancieros3 = 'http://localhost:8080/aspectosFinancieros/listarDistribucion';
 apiUrlListarAspectosFinancieros4 = 'http://localhost:8080/aspectosFinancieros/listarAlumPublico';
 apiUrlListarAspectosFinancieros5 = 'http://localhost:8080/aspectosFinancieros/listarAcoMedidores';
 apiUrlListarAspectosFinancieros6 = 'http://localhost:8080/aspectosFinancieros/listarInverGenerales';*/


  apiUrlInsertar = 'http://localhost:8080/aspectosFinancieros/insertar';




  updateAspectosFinancieros(aspectosFinacieros: AspectosFinancieros) {
    const url = `http://localhost:8080/aspectosFinancieros/editar/${aspectosFinacieros.id_PASFINA}`;

    
    const fechaParam = aspectosFinacieros.pasfina_FECHA instanceof Date ? aspectosFinacieros.pasfina_FECHA.toISOString().split('T')[0] : '';
  
  
    const params = new HttpParams()
      .set('PASFINA_PRESU_CODIFICADO', aspectosFinacieros.pasfina_PRESU_CODIFICADO)
      .set('PASFINA_DEVENGADO', aspectosFinacieros.pasfina_DEVENGADO)
      .set('PASFINA_EJECUTADO', aspectosFinacieros.pasfina_EJECUTADO)
      .set('PASFINA_ASIGNACION_INICIAL', aspectosFinacieros.pasfina_ASIGNACION_INICIAL)
      .set('PASFINA_REFORMAS', aspectosFinacieros.pasfina_REFORMAS)
      .set('PASFINA_PRE_COMPROMISO', aspectosFinacieros.pasfina_PRE_COMPROMISO)
      .set('PASFINA_COMPROMISO', aspectosFinacieros.pasfina_COMPROMISO)
      .set('PASFINA_EJECUTADO_PAGADO', aspectosFinacieros.pasfina_EJECUTADO_PAGADO)
      .set('PASFINA_ANTICIPO_NO_AMORTI', aspectosFinacieros.pasfina_ANTICIPO_NO_AMORTI)
      .set('PASFINA_FECHA', fechaParam);
  
    return this.http.put<AspectosFinancieros>(url, {}, { params });
  }
  

  //insertar
  insertaAspectosFinacieros(aspectosFinacieros: AspectosFinancieros) {

    return this.http.post<any>(this.apiUrlInsertar, aspectosFinacieros).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  //listar

  getListarAspectosFinancieros1(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<AspectosFinancieros>(`${this.apiUrlListarAspectosFinancieros1}`, { params });
  }


  getListarAspectosFinancieros2(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<AspectosFinancieros>(`${this.apiUrlListarAspectosFinancieros2}`, { params });
  }
  /*  getListarAspectosFinancieros3(): Observable<any> {
     return this.http.get<AspectosFinancieros>(this.apiUrlListarAspectosFinancieros3);
   }
 
   getListarAspectosFinancieros4(): Observable<any> {
     return this.http.get<AspectosFinancieros>(this.apiUrlListarAspectosFinancieros4);
   }
 
   getListarAspectosFinancieros5(): Observable<any> {
     return this.http.get<AspectosFinancieros>(this.apiUrlListarAspectosFinancieros5);
   }
   getListarAspectosFinancieros6(): Observable<any> {
     return this.http.get<AspectosFinancieros>(this.apiUrlListarAspectosFinancieros6);
   }*/
}
