import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-publicos',
  templateUrl: './datos-publicos.component.html',
  styleUrls: ['./datos-publicos.component.css']
})
export class DatosPublicosComponent {
  mostrarEnfermedades: boolean = true;
  mostrarAlergias: boolean = true;
  mostrarTipoSangre: boolean = true;
  mostrarDatosAdicionales: boolean = true;

  toggleEnfermedades() {
    this.mostrarEnfermedades = !this.mostrarEnfermedades;
  }

  toggleAlergias() {
    this.mostrarAlergias = !this.mostrarAlergias;
  }

  toggleTipoSangre() {
    this.mostrarTipoSangre = !this.mostrarTipoSangre;
  }

  toggleDatosAdicionales() {
    this.mostrarDatosAdicionales = !this.mostrarDatosAdicionales;
  }
}
