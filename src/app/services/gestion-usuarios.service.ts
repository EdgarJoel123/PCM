import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Importa catchError desde rxjs/operators
import { of } from 'rxjs'; // Importa 'of' desde rxjs
import { Listar } from '../modelo_usuarios/listar';
import { Detalle } from '../modelo_usuarios/rolOpe';
import { Operacion } from '../modelo_usuarios/operaciones';
import { Rol } from '../modelo_usuarios/rol';
import { Modulo } from '../modelo_usuarios/modulo';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  constructor(private http: HttpClient) { }

  apiUrlListar = 'http://localhost:8080/usuarios/listar';
  apiUrlRol = 'http://localhost:8080/roles/insertar';
  apiUrlRoles = 'http://localhost:8080/roles/listar';
  apiRolId = 'http://localhost:8080/roles'

  apiUrlUsuarios = 'http://localhost:8080/usuarios/insertar';

  apiUrlModulo = 'http://localhost:8080/modulos/insertar';

  apiUrlModulos = 'http://localhost:8080/modulos/listar';

  apiUrlOperacion = 'http://localhost:8080/operaciones/insertar';

  apiUrlOperaciones = 'http://localhost:8080/operaciones/listar';

  apiUrlRolesOpreaciones = 'http://localhost:8080/detalle/insertar';

  apiUrlRolesOpreacionesListar = 'http://localhost:8080/detalle/listar';


  apiValidarUsername='http://localhost:8080/usuarios/';

  apiBuscarOPModulos = 'http://localhost:8080/operaciones/';

  apiBuscarUsuarios = 'https://app.eeasa.com.ec/WSSisgerhServices/rest/security';



  getDatosUser(username: string, token: string): Observable<any> {
    // Configura los encabezados con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Configura los parámetros de la solicitud
    const params = new HttpParams().set('inDsgus_cuenta', username);

    // Realiza la solicitud HTTP con los encabezados y parámetros
    return this.http.get<Listar>(`${this.apiBuscarUsuarios}/getUsuarioInformacion`, { headers, params });
  }

  

  insertarRolOpreaciones(detalle: Detalle) {

    return this.http.post<any>(this.apiUrlRolesOpreaciones, detalle).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  insertarOperacion(operacion: Operacion) {

    return this.http.post<any>(this.apiUrlOperacion, operacion).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  insertarRol(rol: Rol) {

    return this.http.post<any>(this.apiUrlRol, rol).pipe(
      catchError((error) => {
        console.error('Respuesta del servicio:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }


  insertarModulo(mudulo: Modulo) {

    return this.http.post<any>(this.apiUrlModulo, mudulo).pipe(
      catchError((error) => {
        console.error('INFROMACION DEL SERVICIO:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }

  insertarUsuario(usuario: Listar) {

    return this.http.post<any>(this.apiUrlUsuarios, usuario).pipe(
      catchError((error) => {
        console.error('INFROMACION DEL SERVICIO:', error);
        return of(null); // Retorna un observable con valor null en caso de error
      })
    );

  }


  getListarUsuarios(): Observable<any> {
    return this.http.get<Listar>(this.apiUrlListar);
  }

  getListarRoles(): Observable<any> {
    return this.http.get<Rol>(this.apiUrlRoles);
  }


  getListarModulos(): Observable<any> {
    return this.http.get<Modulo>(this.apiUrlModulos);
  }

  getListarOperaciones(): Observable<any> {
    return this.http.get<Operacion>(this.apiUrlOperaciones);
  }

  getListarDetalle(): Observable<any> {
    return this.http.get<Detalle>(this.apiUrlRolesOpreacionesListar);
  }

  
  updateRol(rol: Rol){
    const url = `http://localhost:8080/roles/editar/${rol.id_ROL}`;
    const params = new HttpParams()
    .set('NOMBRE_ROL', rol.nombre_ROL)
    .set('DESCRIPCION_ROL', rol.descripcion_ROL)
    return this.http.put<Rol>(url, {}, { params});
  }

  updateModulo(modulo: Modulo){
    const url = `http://localhost:8080/modulos/editar/${modulo.id_MODULO}`;
    const params = new HttpParams()
    .set('NOMBRE_MODULO', modulo.nombre_MODULO)
    .set('DESCRIPCION_MODULO', modulo.descripcion_MODULO)
    return this.http.put<Modulo>(url, {}, { params});
  }

  updateOperacion(operacion: Operacion){
    const url = `http://localhost:8080/operaciones/editar/${operacion.id_OPERACION}`;
    const params = new HttpParams()
    .set('ID_MODULO', operacion.id_MODULO)
    .set('OP_NOMBRE', operacion.op_NOMBRE)
    .set('OP_DESCRIPCION', operacion.op_DESCRIPCION)

    return this.http.put<Operacion>(url, {}, { params});
  }


  updateDetalle(detalle: Detalle){
    const url = `http://localhost:8080/detalle/editar/${detalle.id_ROL_OPERACIONES}`;
    const params = new HttpParams()
    .set('ID_ROL', detalle.id_ROL)
    .set('ID_OPERACION', detalle.id_OPERACION)
    return this.http.put<Detalle>(url, {}, { params});
  }

  
  updateUsuarios(usuario: Listar){
    const url = `http://localhost:8080/usuarios/editar/${usuario.id_USUARIO}`;
    const params = new HttpParams()
    .set('ID_ROL', usuario.id_ROL)
    .set('USER_NAME', usuario.user_NAME)
    .set('NOMB_USUARIO', usuario.nomb_USUARIO)
    .set('APE_USUARIO', usuario.ape_USUARIO)
    .set('BLOQUEADO', usuario.bloqueado)
    .set('ELIMINADO', usuario.eliminado)
    .set('DMPER_CODIGO', usuario.dmper_CODIGO)
    .set('DMPER_NUMERO_ROL', usuario.dmper_NUMERO_ROL)
    return this.http.put<Listar>(url, {}, { params});
  }



  getIdRol(id: number): Observable<any> {
    const params = { ID_ROL: id.toString()};
    return this.http.get<Rol>(`${this.apiRolId}/buscar/id`, { params });
  }


  getUsername(username: string): Observable<any> {
    const params = { USER_NAME: username};
    return this.http.get<Listar>(`${this.apiValidarUsername}obtenerPorUsername/username`, { params });
  }


  getOpreacionModulos(id: number): Observable<any> {
    const params = { ID_MODULO: id.toString()};
    return this.http.get<Operacion>(`${this.apiBuscarOPModulos}buscar/modulo`, { params });
  }

  elimnarDetalle(id: number){

    const url = `http://localhost:8080/detalle/eliminar/${id}`;
    return this.http.delete(url);

  }


  eliminarModulo(id: number){

    const url = `http://localhost:8080/modulos/eliminar/${id}`;
    return this.http.delete(url);

  }

  eliminarOperacion(id: number){

    const url = `http://localhost:8080/operaciones/eliminar/${id}`;
    return this.http.delete(url);

  }

  eliminarRol(id: number){

    const url = `http://localhost:8080/roles/eliminar/${id}`;
    return this.http.delete(url);

  }

  eliminarUsuario(id: number){

    const url = `http://localhost:8080/usuarios/eliminar/${id}`;
    return this.http.delete(url);

  }
  

}
