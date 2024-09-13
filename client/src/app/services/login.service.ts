import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  AccessLogin(data: FormData): Observable<any> {  // Change to Usuario type
    return this.http.post<any>(this.URL, data);
  }
}
