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
      date: 'January 10th, 2022 at 5:00 PM',
      location: 'Starbucks',
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'Michael Foster',
      date: 'January 12th, 2022 at 3:00 PM',
      location: 'Tim Hortons',
      imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      name: 'Dries Vincent',
      date: 'January 12th, 2022 at 5:00 PM',
      location: 'Costa Coffee at Braehead',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      name: 'Lindsay Walton',
      date: 'January 14th, 2022 at 10:00 AM',
      location: 'Silverburn',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  ];
}
