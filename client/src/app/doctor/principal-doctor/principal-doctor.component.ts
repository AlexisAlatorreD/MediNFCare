import { Component } from '@angular/core';

@Component({
  selector: 'app-principal-doctor',
  templateUrl: './principal-doctor.component.html',
  styleUrl: './principal-doctor.component.css'
})
export class PrincipalDoctorComponent {
  meetings = [
    {
      name: 'Leslie Alexander',
      date: '10 de enero, 2022 a las 5:00 PM',
      location: 'Sala 1',
      notes: 'Consulta de seguimiento sobre dolor de espalda',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'Michael Foster',
      date: '12 de enero, 2022 a las 3:00 PM',
      location: 'Sala 2',
      notes: 'Primera consulta para revisión general',
      imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      name: 'Dries Vincent',
      date: '12 de enero, 2022 a las 5:00 PM',
      location: 'Sala 3',
      notes: 'Revisión de resultados de laboratorio',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      name: 'Lindsay Walton',
      date: '14 de enero, 2022 a las 10:00 AM',
      location: 'Sala 4',
      notes: 'Consulta sobre dolor abdominal persistente',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  ];
}
