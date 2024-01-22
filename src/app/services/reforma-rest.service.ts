import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Reforma } from '../modelo/reforma';

@Injectable({
  providedIn: 'root'
})
export class ReformaRestService {

  constructor(private http: HttpClient) { }
  
  apiUrlReforma1='http://localhost:8080/reforma/listarGeneracion';
  apiUrlReforma2='http://localhost:8080/reforma/listarSubtrasmision';
  /*apiUrlReforma3='http://localhost:8080/reforma/listarDistribucion';
  apiUrlReforma4='http://localhost:8080/reforma/listarAlumPublico';
  apiUrlReforma5='http://localhost:8080/reforma/listarAcoMedidores';
  apiUrlReforma6='http://localhost:8080/reforma/listarInverGenerales';*/



  apiUrlInsertar = 'http://localhost:8080/reforma/insertar';




  updateReforma(reforma: Reforma) {
    const url = `http://localhost:8080/reforma/editar/${reforma.id_PREFOIN}`;

    const fechaParam = reforma.prefoin_FECHA instanceof Date ? reforma.prefoin_FECHA.toISOString().split('T')[0] : '';
  
  
    const params = new HttpParams()
      .set('PREFOIN_VALOR_TOTAL_PROYECTO_R', reforma.prefoin_VALOR_TOTAL_PROYECTO_R)
      .set('PREFOIN_REFORMA', reforma.prefoin_REFORMA)
      .set('PREFOIN_PRESUPUESTO_REFORMA', reforma.prefoin_PRESUPUESTO_REFORMA)
      .set('PREFOIN_ANIO', reforma.prefoin_ANIO)
      .set('PREFOIN_FECHA', fechaParam)

    return this.http.put<Reforma>(url, {}, { params });
  }



    //insertar
  insertaReforma(reforma: Reforma) {
    return this.http.post<any>(this.apiUrlInsertar, reforma).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }


//listar

getListarReforma1(id : number): Observable<any> {
  const params = { ID_PPRO_CODIGO_UNICO: id };
  return this.http.get<Reforma>(`${this.apiUrlReforma1}`, { params });
}


getListarReforma2(id : number): Observable<any> {
  const params = { ID_PPRO_CODIGO_UNICO: id };
  return this.http.get<Reforma>(`${this.apiUrlReforma2}`, { params });
}
/*getListarReforma2(): Observable<any> {
  return this.http.get<Reforma>(this.apiUrlReforma2);
}

getListarReforma3(): Observable<any> {
  return this.http.get<Reforma>(this.apiUrlReforma3);
}

getListarReforma4(): Observable<any> {
  return this.http.get<Reforma>(this.apiUrlReforma4);
}

getListarReforma5(): Observable<any> {
  return this.http.get<Reforma>(this.apiUrlReforma5);
}
getListarReforma6(): Observable<any> {
  return this.http.get<Reforma>(this.apiUrlReforma6);
}*/

}
