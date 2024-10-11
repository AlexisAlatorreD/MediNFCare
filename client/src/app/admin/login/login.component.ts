import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService, Usuario, Logout } from '../../services/usuario.service';
import { Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private secretKey = 'X9f2Kp7Lm3Qr8Zw5Yt6Vb1Nj4Hg'; //28 caracteres

  LoginForm: FormGroup;
  LogoutForm: FormGroup;
  tokenCheckSubscription?: Subscription;
  token: string | null;

  creaciontoken?: string | null;

  constructor(private formulario: FormBuilder, private srvUsuario: UsuarioService, private route: ActivatedRoute) {
    this.LoginForm = this.formulario.group({
      usuario: [''],
      contrasena: ['']
    });

    this.LogoutForm = this.formulario.group({
      token: [''],
    });

    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    // Obtenemos los parámetros de la URL (u=usuario, p=contraseña)
    this.route.queryParams.subscribe(params => {
      const usuario = params['u'];
      const contrasena = params['p'];

      // Si los parámetros existen, llenar el formulario y enviarlo
      if (usuario && contrasena) {
        this.LoginForm.patchValue({ usuario, contrasena });
        this.onSubmitLogin(); // Enviar automáticamente si los parámetros están presentes
      }
    });
    
    
    const encryptedToken = localStorage.getItem('rol');
    if(encryptedToken){
      const roldes = this.encrypt(encryptedToken);
      console.log("rol "+roldes);
    }
  }

  private encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  onSubmitLogin() {
    if (!this.token) {
      const formData: Usuario = this.LoginForm.value;
      this.srvUsuario.IniciarSesion(formData).subscribe(
        res => {
          if (res && res.token && res.usuario) {
            const encryptedToken = this.encrypt(res.token);
            localStorage.setItem('token', encryptedToken);

            const rolString = res.usuario.rol_id;
            localStorage.setItem('rol', rolString);
  
            if(res.usuario.rol_id === 1 ){
              setTimeout(() => {
                this.showToast('success', 'Bienvenido Admin');
                window.location.href = "/doctor/principal";
              }, 2000);
            }else if(res.usuario.rol_id === 2){
              setTimeout(() => {
                this.showToast('success', 'Bienvenido Doctor');
                window.location.href = "/doctor/principal";
              }, 2000);
            }else if(res.usuario.rol_id === 4){
              setTimeout(() => {
                window.location.href = "paciente/principal-paciente";
              }, 2000);
            }else{
              this.showToast('error', 'Ups, A ocurrido un error');
              setTimeout(() => {
                window.location.href = "/login";
              }, 2000);
            }
          } else {
            console.log('La respuesta del servidor no tiene la estructura esperada');
            window.location.href = "/login";
          }
        },
        err => {
          this.showToast('warning', 'Credenciales incorrectas');
        }
      );
  
      this.LoginForm.reset();
    } else {
      Swal.fire({
        title: "Ya tienes una sesión activa",
        text: "¿Deseas cerrar la sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión"
      }).then((result) => {
        if (result.isConfirmed) {
          this.logoutAndSubmitLogin(); // Llamamos a la nueva función que cerrará la sesión y reenviará el login
        } else {
          console.log("Cancelado");
        }
      });
    }
  }

  // Nueva función para cerrar sesión y luego reenviar el formulario de login
  logoutAndSubmitLogin() {
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

          // Después de cerrar sesión, reenviar el formulario de login
          setTimeout(() => {
            this.onSubmitLogin();
          }, 2000); // Espera 2 segundos antes de reenviar el formulario
        },
        err => {
          console.log('Error al cerrar sesión', err);
        }
      );
    } else {
      console.log('No hay token para cerrar sesión');
    }
  }

  private decrypt(encrypted: string): string {
    return CryptoJS.AES.decrypt(encrypted, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

  private showToast(
    icon: 'success' | 'warning' | 'error' | 'info' | 'question',
    title: string
  ): void {
    const Toast = Swal.mixin({
      toast: true,
      iconColor: '#008779',
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
