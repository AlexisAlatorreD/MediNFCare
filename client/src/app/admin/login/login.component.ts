import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import Hashids from 'hashids';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private hashids = new Hashids('X9f2Kp7Lm3Qr8Zw5Yt6Vb1Nj4Hg', 40); // Inicializa Hashids con tu salt y longitud deseada
  LoginForm: FormGroup;
  token?: string;

  constructor(
    private formulario: FormBuilder,
    private srvUsuario: LoginService
  ) {
    this.LoginForm = this.formulario.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });

    window.addEventListener('storage', (event) => this.checkTokenInLocalStorage());
  }

  checkTokenInLocalStorage() {
    const encryptedToken = localStorage.getItem('token');
    const encryptedRole = localStorage.getItem('_r');

    // Si el token o el rol no existen
    if (!encryptedToken || !encryptedRole) {
      this.clearSession(encryptedToken || '');
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

  ngOnInit() {}


  private decryptToken(encryptedToken: string): string {
    const decoded = this.hashids.decodeHex(encryptedToken);
    return decoded.length > 0 ? decoded[0] : ''; // Devuelve el primer valor o una cadena vacía si no hay valores
  }

  onSubmitLogin() {
    const valores = this.LoginForm.value;

    this.srvUsuario.AccessLogin(valores).subscribe(
      (res) => {
        console.log('Respuesta del servidor:', res);

        if (res.token && res.rol) {
          const encryptedToken = res.token;
          const encryptedRol = btoa(res.rol); 
          localStorage.setItem('token', encryptedToken);
          localStorage.setItem('_r', encryptedRol);

          this.showToast('success', 'Bienvenido Admin');
                setTimeout(() => {
                    this.LoginForm.reset();
                    //window.location.href = '/inicio'; // Redirigir tras inicio exitoso
                }, 1000);
        } else {
          this.showToast('error', 'Hubo una acción inesperada');
                setTimeout(() => {
                  this.LoginForm.reset();
                }, 1000);
        }
      },
      (error) => {
        this.showToast(error.type, error.message);
                setTimeout(() => {
                  this.LoginForm.reset();
                }, 1000);
      }
    );
  }

  clearSession(token: string) {
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
  

  private showToast(
    icon: 'success' | 'warning' | 'error' | 'info' | 'question',
    title: string
  ): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: title,
    });
  }
}
