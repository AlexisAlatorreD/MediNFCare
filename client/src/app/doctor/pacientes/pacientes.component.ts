import { Component } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  showModal = false;
  searchTerm = '';
  newPatient = {
    name: 'yahir',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    birthDate: '',
    gender: '',
    emergencyContact: '',
    bloodType: '',
    allergies: ''
  };

  // Método para abrir el modal
  openModal() {
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
  }

  // Método para agregar un nuevo paciente
  addPatient() {
    // Lógica para agregar paciente
    console.log(this.newPatient);
    this.closeModal();
  }
}
