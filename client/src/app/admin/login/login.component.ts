import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService, Usuario } from '../../services/login.service';
import Swal from 'sweetalert2';
import Hashids from 'hashids';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private hashids = new Hashids('X9f2Kp7Lm3Qr8Zw5Yt6Vb1Nj4Hg', 40);
  LoginForm: FormGroup;

  constructor(private formulario: FormBuilder, private srvUsuario: LoginService) {
    
    this.LoginForm = this.formulario.group({
      correo: [''],
      contrasena: ['']
    });
    
  }

  ngOnInit() {
   
  }
  

  onSubmitLogin() {
    const valores = this.LoginForm.value;
  
    // Convertir a FormData
    const formData = new FormData();
    formData.append('correo', valores.correo);
    formData.append('contrasena', valores.contrasena);
  
    console.log('Datos de formulario:', valores);
  
    this.srvUsuario.AccessLogin(formData).subscribe(
      res => {
        console.log('Respuesta del servidor:', res);
  
        if (res && res.token && res.usuario) {
          const encryptedId = this.hashids.encode(res.token);
          const RolID = this.hashids.encode(res.token);
          const PermisosID = this.hashids.encode(res.token);
  
          localStorage.setItem('token', encryptedId);
          localStorage.setItem('rol', RolID);
          localStorage.setItem('permisos', PermisosID);
  
          console.log('Inicio de sesión correcto');
        } else {
          console.error('La respuesta del servidor no tiene la estructura esperada');
        }
      },
      err => {
        console.error('Error al iniciar sesión', err);
      }
    );
  
    this.LoginForm.reset();
  }

}

