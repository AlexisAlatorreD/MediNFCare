import { Component, OnInit } from '@angular/core';

interface Cita {
  especialidad: string;
  fecha: string;
  hora: string;
  motivo: string;
}

@Component({
  selector: 'app-citas-paciente',
  templateUrl: './citas-paciente.component.html',
  styleUrls: ['./citas-paciente.component.css']
})
export class CitasPacienteComponent implements OnInit {

  citasProximas: Cita[] = [];
  citasAsistidas: Cita[] = [];
  citasNoAsistidas: Cita[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas() {
    // Ejemplo de citas de prueba
    this.citasProximas = [
      { especialidad: 'Medicina General', fecha: '2024-09-21', hora: '10:00 AM', motivo: 'Dolor de cabeza constante' },
      { especialidad: 'Cardiología', fecha: '2024-09-22', hora: '11:30 AM', motivo: 'Palpitaciones irregulares' },
    ];

    this.citasAsistidas = [
      { especialidad: 'Dermatología', fecha: '2024-09-10', hora: '9:00 AM', motivo: 'Revisión de manchas en la piel' }
    ];

    this.citasNoAsistidas = [
      { especialidad: 'Ginecología', fecha: '2024-09-08', hora: '10:30 AM', motivo: 'Consulta anual' }
    ];
  }
}
