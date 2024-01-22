import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { PartidaPresupuestaria } from '../modelo/partidaPresupuestaria';
import { DetallePartidaPresupuestaria } from '../modelo/detallePartidaPrepuestaria';

@Injectable({
  providedIn: 'root'
})
export class PartidaPresupuestariaRestService {

  constructor(private http: HttpClient) { }

  apiUrlPartidaPresupuestaria1 = 'http://localhost:8080/partidaPresupuestaria/listarGeneracion';
  apiUrlPartidaPresupuestaria2 = 'http://localhost:8080/partidaPresupuestaria/listarSubtrasmision';
  /*apiUrlPartidaPresupuestaria3 = 'http://localhost:8080/partidaPresupuestaria/listarDistribucion';
  apiUrlPartidaPresupuestaria4 = 'http://localhost:8080/partidaPresupuestaria/listarAlumPublico';
  apiUrlPartidaPresupuestaria5 = 'http://localhost:8080/partidaPresupuestaria/listarAcoMedidores';
  apiUrlPartidaPresupuestaria6 = 'http://localhost:8080/partidaPresupuestaria/listarInverGenerales';*/

  apiUrlPartidaPresupuestaria = 'http://localhost:8080/partidaPresupuestaria/listar';




  apiUrlTipoPartida = 'http://localhost:8080/partidaPresupuestaria/listarTipoPartida';

  apiUrlInsertar = 'http://localhost:8080/partidaPresupuestaria/insertar';


  apiUrlInsertarDetalle = 'http://localhost:8080/partidaPresupuestaria/insertar/detalle/partidaPresupuestaria';



  updatePartidaPresupuestaria(partidaPresupuestaria: PartidaPresupuestaria) {
    const url = `http://localhost:8080/partidaPresupuestaria/editar/${partidaPresupuestaria.id_PPART}`;

    const fechaParam = partidaPresupuestaria.ppart_FECHA instanceof Date ? partidaPresupuestaria.ppart_FECHA.toISOString().split('T')[0] : '';
  

    const params = new HttpParams()
      .set('ID_PTIPAPRE', partidaPresupuestaria.id_PTIPAPRE)
      .set('PPART_PARTIDA_PRESUPUESTARIA', partidaPresupuestaria.ppart_PARTIDA_PRESUPUESTARIA)
      .set('PPART_FECHA', fechaParam)
      .set('PPART_CODIGO_PARTIDA', partidaPresupuestaria.ppart_CODIGO_PARTIDA)
      .set('PPART_MONTO_PARTIDA', partidaPresupuestaria.ppart_MONTO_PARTIDA)





    return this.http.put<PartidaPresupuestaria>(url, {}, { params });
  }


  //insertar
  insertaDetallePartidaPresuestaria(partidaPresupuestaria: DetallePartidaPresupuestaria) {
    return this.http.post<any>(this.apiUrlInsertarDetalle, partidaPresupuestaria).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  //insertar
  insertaPartidaPresuestaria(partidaPresupuestaria: PartidaPresupuestaria) {
    return this.http.post<any>(this.apiUrlInsertar, partidaPresupuestaria).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  getListarPartidaPresupuestaria(): Observable<any> {
    return this.http.get<PartidaPresupuestaria>(this.apiUrlPartidaPresupuestaria);
  }





  getListarTipoPartida(): Observable<any> {
    return this.http.get<PartidaPresupuestaria>(this.apiUrlTipoPartida);
  }


  getListarPartidaPresupuestaria1(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<PartidaPresupuestaria>(`${this.apiUrlPartidaPresupuestaria1}`, { params });
  }

  getListarPartidaPresupuestaria2(id: number): Observable<any> {
    const params = { ID_PPRO_CODIGO_UNICO: id };
    return this.http.get<PartidaPresupuestaria>(`${this.apiUrlPartidaPresupuestaria2}`, { params });
  }

  /*  getListarPartidaPresupuestaria2(): Observable<any> {
    return this.http.get<PartidaPresupuestaria>(this.apiUrlPartidaPresupuestaria2);
  }

  getListarPartidaPresupuestaria3(): Observable<any> {
    return this.http.get<PartidaPresupuestaria>(this.apiUrlPartidaPresupuestaria3);
  }

  getListarPartidaPresupuestaria4(): Observable<any> {
    return this.http.get<PartidaPresupuestaria>(this.apiUrlPartidaPresupuestaria4);
  }

  getListarPartidaPresupuestaria5(): Observable<any> {
    return this.http.get<PartidaPresupuestaria>(this.apiUrlPartidaPresupuestaria5);
  }
  getListarPartidaPresupuestaria6(): Observable<any> {
    return this.http.get<PartidaPresupuestaria>(this.apiUrlPartidaPresupuestaria6);
  }*/
}
