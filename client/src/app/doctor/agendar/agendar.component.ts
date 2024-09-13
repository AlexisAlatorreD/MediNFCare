import { Component } from '@angular/core';

interface Patient {
  id: number;
  name: string;
}

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent {
  searchTerm: string = '';
  patients: Patient[] = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María López' },
    { id: 3, name: 'Carlos Rodríguez' },
    // Puedes añadir más pacientes aquí
  ];
  filteredPatients: Patient[] = this.patients;
  selectedPatient: Patient | null = null;

  appointmentDate: string = '';
  appointmentTime: string = '';
  comments: string = '';
  appointmentScheduled: boolean = false;

  // Método para filtrar los pacientes
  filterPatients(): void {
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Método para seleccionar un paciente
  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
    this.searchTerm = patient.name; // Actualiza el campo de búsqueda
    this.filteredPatients = []; // Limpia la lista de resultados
  }

  // Método para agendar la cita
  scheduleAppointment(): void {
    if (this.appointmentDate && this.appointmentTime && this.selectedPatient) {
      this.appointmentScheduled = true;
      console.log(`Cita agendada para el paciente ${this.selectedPatient.name} el ${this.appointmentDate} a las ${this.appointmentTime}`);
    } else {
      this.appointmentScheduled = false;
      alert('Por favor completa todos los campos.');
    }
  }
}
