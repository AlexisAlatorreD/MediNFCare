import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private srvUsuario: UsuarioService) {
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      segundo_apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      estado: [true],
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      id_rol: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
      const formData: Usuario = this.registroForm.value;
      console.log(formData);
      // Aquí puedes agregar la lógica para enviar los datos del formulario.
    this.srvUsuario.crearUsuario(formData).subscribe(
      res =>{
        console.log("Usuario registrado");
      },
      err =>{
        console.log("Hubo un error");
      })
    }
}
