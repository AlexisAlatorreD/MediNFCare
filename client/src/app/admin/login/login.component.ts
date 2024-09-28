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

  constructor(
    private formulario: FormBuilder,
    private srvUsuario: LoginService
  ) {
    this.LoginForm = this.formulario.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  onSubmitLogin() {
    const valores = this.LoginForm.value;
    
    this.srvUsuario.AccessLogin(valores).subscribe(
        (res) => {
            console.log('Respuesta del servidor:', res);
  
            if (res.token && res.rol) {
                const encryptedToken = this.hashids.encodeHex(res.token);
                const encryptedRol = btoa(res.rol); 
                localStorage.setItem('token', encryptedToken);
                localStorage.setItem('_r', encryptedRol);
  
                this.showToast('success', 'Bienvenido Admin');
                setTimeout(() => {
                    window.location.href = '/inicio'; // Redirigir tras inicio exitoso
                }, 1000);
            } else {
                this.showToast('error', 'Hubo un error inesperado.'); // Manejo de error genérico
                this.LoginForm.reset(); // Resetear formulario en caso de error
            }
        },
        (err) => {
            // Manejo de errores específicos del servidor
            if (err.status === 401) {
                this.showToast('warning', 'Credenciales incorrectas.'); // Mensaje para credenciales incorrectas
            } else if (err.status === 409) {
                this.showToast('info', 'Ya existe una sesión activa'); // Mensaje de sesión activa
            } else {
                this.showToast('error', 'Error del servidor.'); // Mensaje genérico para otros errores
            }
        }
    );

    // Este reset ahora se realiza solo después de manejar la respuesta del servidor
    // this.LoginForm.reset(); 
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
