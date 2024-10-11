import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DoctorGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    // Si existe el token y el rol es 'doctor', permite el acceso
    const userRole = localStorage.getItem('rol'); // Ejemplo: obteniendo el rol del usuario

    if (token && userRole === '2') {
      return true;
    } else {
      // Redirige al login si no es doctor o no hay token
      this.router.navigate(['/login']);
      return false;
    }
  }
}
