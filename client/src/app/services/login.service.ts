import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
  URL = 'http://192.168.15.108/medinfcare/server/login';

  constructor(private http: HttpClient) {}

  AccessLogin(data: any): Observable<any> {
    return this.http.post<any>(this.URL, data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';
        let alertType = 'error';

        if (error.status === 401) {
          errorMessage = 'Credenciales incorrectas.';
        } else if (error.status === 409) {
          return this.handleSessionConflict(data);
        } else if (error.status === 400) {
          errorMessage = 'Datos incompletos.';
          alertType = 'warning';
        } else if (error.status === 500) {
          errorMessage = 'Error del servidor.';
        }

        return throwError({ message: errorMessage, type: alertType });
      })
    );
  }

  clearSession(token: string): any {
    return this.http.delete(this.URL + '?t=' + token);
  }

  private handleSessionConflict(data: any): Observable<any> {
    return new Observable(observer => {
      Swal.fire({
        title: 'Sesión activa detectada',
        text: 'Ya hay una sesión activa. ¿Deseas cerrar la sesión anterior?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No'
      }).then(result => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');  // Obtener token del localStorage
          if (token) {
            this.clearSession(token).subscribe({
              next: () => {
                localStorage.removeItem('token');  // Remover el token después de cerrar sesión
                data.forceLogout = true;
                observer.next(data);  // Continuar con el flujo de login
              },
              error: () => {
                observer.error({ message: 'Error cerrando la sesión anterior', type: 'error' });
              }
            });
          } else {
            observer.error({ message: 'No se encontró un token de sesión', type: 'error' });
          }
        } else {
          observer.error({ message: 'Sesión anterior no cerrada', type: 'info' });
        }
      });
    });
  }
}
