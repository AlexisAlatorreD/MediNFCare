import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {
  medicalHistoryForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.medicalHistoryForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      domicilio: ['', Validators.required],
      enfermedades: ['', Validators.required],
      alergias: ['', Validators.required],
      tratamientos: [''],
      medicamentos: [''],
      contactoEmergencia: ['', Validators.required],
      relacionEmergencia: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.medicalHistoryForm.valid) {
      console.log('Formulario enviado:', this.medicalHistoryForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}