import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private apiUrl = 'http://localhost:8080/api/contact/submit'; // Cambia la URL según tu configuración


  constructor(private http: HttpClient) { }


  sendContactForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData).pipe(
      catchError(error => {
        console.error('Error al enviar el formulario:', error);
        return throwError('Error al enviar el formulario'); // Puedes ajustar el mensaje según tus necesidades
      })
    );
  }
}
