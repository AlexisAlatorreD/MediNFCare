import { Component, HostListener } from '@angular/core';
import { UsuarioService, Usuario, Logout } from '../services/usuario.service';
import Swal from 'sweetalert2';
import Hashids from 'hashids';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  LogoutForm: FormGroup;
  private hashids = new Hashids('X9f2Kp7Lm3Qr8Zw5Yt6Vb1Nj4Hg', 40); // Inicializa Hashids con tu salt y longitud deseada
  isMinimized: boolean = true;  // Inicialmente minimizado
  isMobile: boolean = false;
  isMenuOpen: boolean = false;
  token: string | null;

  constructor(private formulario: FormBuilder, private srvUsuario: UsuarioService) {

    this.LogoutForm = this.formulario.group({
      token: [''],
    });

    this.token = localStorage.getItem('token');

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
       //borrar la sesion de la base de datos
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

  private secretKey = 'X9f2Kp7Lm3Qr8Zw5Yt6Vb1Nj4Hg'; //28 caracteres

  private decryptToken(encryptedToken: string): string {
    const decoded = this.hashids.decodeHex(encryptedToken);
    return decoded.length > 0 ? decoded[0] : ''; // Devuelve el primer valor o una cadena vacía si no hay valores
  }

  private decrypt(encrypted: string): string {
    return CryptoJS.AES.decrypt(encrypted, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

  logoutAndSubmitLogin() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const tokenDesencriptado = this.decrypt(this.token);

      this.LogoutForm.patchValue({
        token: tokenDesencriptado,
      });

      const formData: Logout = this.LogoutForm.value;

      this.srvUsuario.CerrarSesion(formData).subscribe(
        res => {
          localStorage.removeItem('token');
          localStorage.removeItem('rol');
          localStorage.removeItem('depa');
          this.token = null;
          window.location.href = "/login";
        },
        err => {
          console.log('Error al cerrar sesión', err);
        }
      );
    } else {
      console.log('No hay token para cerrar sesión');
    }
  }

}
