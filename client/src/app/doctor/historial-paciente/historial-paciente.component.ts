import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-paciente',
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css']
})
export class HistorialPacienteComponent {
  activeAccordion: string | null = null;

  toggleAccordion(accordion: string) {
    if (this.activeAccordion === accordion) {
      this.activeAccordion = null;
    } else {
      this.activeAccordion = accordion;
    }
  }
}
