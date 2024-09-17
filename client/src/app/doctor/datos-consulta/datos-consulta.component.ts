import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datos-consulta',
  templateUrl: './datos-consulta.component.html',
  styleUrls: ['./datos-consulta.component.css']
})
export class DatosConsultaComponent implements OnInit {
  @Input() consulta: {
    motivoConsulta: string;
    sintomas: string[];
    medicinas: { nombre: string; dosis: string }[];
    observaciones: string;
    fecha: string;
    doctor: string;
    duracion: number;
    ubicacion: string;
  } = {
    motivoConsulta: 'Dolor abdominal intenso',
    sintomas: ['Dolor en la parte inferior del abdomen', 'Náuseas', 'Vómitos'],
    medicinas: [
      { nombre: 'Ibuprofeno', dosis: '400 mg cada 8 horas' },
      { nombre: 'Antiemético', dosis: '10 mg según necesidad' }
    ],
    observaciones: 'El paciente presenta signos de posible apendicitis. Se recomienda realizar estudios adicionales.',
    fecha: '2024-09-15',
    doctor: 'Dr. Juan Pérez',
    duracion: 30, // duración en minutos
    ubicacion: 'Consultorio 3B'
  };

  constructor() { }

  ngOnInit(): void { }
}
