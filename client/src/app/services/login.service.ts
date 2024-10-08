import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Usuario {
  id?: number;
  correo: string;
  contrasenia: string;
  rol_id: number;
  departamento_id: number;
  token_recuperacion: string;
  fecha_expiracion_token: string;
  activo?: boolean;
  fecha_creacion?: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  URL = 'http://localhost/medinfcare/server/login';

  constructor(private http: HttpClient) { }

  /* Método para obtener el token del localStorage y generar los headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }*/
  
    AccessLogin(data: any): Observable<any> {
      return this.http.post<any>(this.URL, data).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error desconocido';
          let alertType = 'error';
  
          if (error.status === 401) {
            errorMessage = 'Credenciales incorrectas.';
            alertType = 'error';
          } else if (error.status === 409) {
            errorMessage = 'Ya hay una sesión activa.';
            alertType = 'info';
          } else if (error.status === 400) {
            errorMessage = 'Datos incompletos.';
            alertType = 'warning';
          } else if (error.status === 500) {
            errorMessage = 'Error del servidor.';
            alertType = 'error';
          }
  
          return throwError({ message: errorMessage, type: alertType }); // Devolver mensaje personalizado
        })
      );
    }
 
    clearSession(token: string): any {
      return this.http.delete(this.URL+'?t='+token,)
    }
}
