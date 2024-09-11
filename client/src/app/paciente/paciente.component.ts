import { Component } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

  isMinimized: boolean = false;

  toggleSidebar() {
    this.isMinimized = !this.isMinimized;
  }
  
}
