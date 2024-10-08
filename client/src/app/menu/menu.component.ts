import { Component, HostListener } from '@angular/core';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import Hashids from 'hashids';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private hashids = new Hashids('X9f2Kp7Lm3Qr8Zw5Yt6Vb1Nj4Hg', 40); // Inicializa Hashids con tu salt y longitud deseada
  isMinimized: boolean = true;  // Inicialmente minimizado
  isMobile: boolean = false;
  isMenuOpen: boolean = false;
  token?: string;

  constructor(private srvUsuario: LoginService  ) {
    
    this.checkScreenSize();
    window.addEventListener('storage', (event) => this.checkTokenInLocalStorage());
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 329;
    this.isMinimized = this.isMobile ? true : this.isMinimized;
    
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  toggleSidebar() {
    this.isMinimized = !this.isMinimized;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkTokenInLocalStorage() {
    const encryptedToken = localStorage.getItem('token');
    const encryptedRole = localStorage.getItem('_r');

    // Si el token o el rol no existen
    if (!encryptedToken || !encryptedRole) {
      if(encryptedToken){
        this.token = this.decryptToken(encryptedToken);
        this.clearSession(encryptedToken || '');
      }
      localStorage.removeItem('token');
      localStorage.removeItem('_r');
      // Redirigir al login si no existe el token
      window.location.href = '/login';
    } else {
      // Asignar el token si existe y desencriptarlo
      this.token = this.decryptToken(encryptedToken);
      console.log("Token desencriptado: " + this.token);
      
      // Aquí puedes usar el token desencriptado para hacer otras acciones
      // Por ejemplo, verificar el rol
      const role = atob(encryptedRole); // Desencripta el rol
      console.log("Rol desencriptado: " + role);
    }
  }

  private decryptToken(encryptedToken: string): string {
    const decoded = this.hashids.decodeHex(encryptedToken);
    return decoded.length > 0 ? decoded[0] : ''; // Devuelve el primer valor o una cadena vacía si no hay valores
  }

  clearSession(token: string): any {
    if (token) {
      this.srvUsuario.clearSession(token).subscribe(
        (res: any) => {
          console.log('Sesión cerrada en el servidor.');
        },
        (err: any) => {
          console.error('Error al cerrar sesión en el servidor:', err);
        }
      );
    } else {
      console.warn('No se pudo obtener el token para cerrar la sesión.');
    }
  }
}
