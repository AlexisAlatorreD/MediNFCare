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

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1; // Enero es 1
  selectedDay: number | null = null;

  years: number[] = [];
  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 }
  ];
  monthNames: string[] = this.months.map(m => m.name);
  weekDays: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  calendarDays: number[] = [];
  emptyDays: number[] = [];
  eventsForDay: { title: string, description: string, time: string }[] = [];

  ngOnInit() {
    this.populateYears();
    this.updateCalendar();
  }

  populateYears() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  }

  updateCalendar() {
    const firstDayOfMonth = new Date(this.selectedYear, this.selectedMonth - 1, 1).getDay(); // Día de la semana del primer día del mes
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate(); // Número de días en el mes

    this.emptyDays = Array.from({ length: (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) }, (_, i) => i + 1); // Espacios vacíos antes del primer día

    this.calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    this.selectedDay = null; // Resetear el día seleccionado cuando se cambia el mes/año
    this.eventsForDay = []; // Limpiar eventos al cambiar mes/año
  }

  selectDay(day: number) {
    this.selectedDay = day;
    // Aquí puedes actualizar los eventos del día seleccionado
    this.eventsForDay = this.getEventsForDay(day);
  }

  getEventsForDay(day: number): { title: string, description: string, time: string }[] {
    // Función de ejemplo que devuelve eventos ficticios
    return [
      { title: 'Reunión', description: 'Discutir estado del proyecto', time: '10:00 AM' },
      { title: 'Almuerzo', description: 'Con el equipo', time: '12:00 PM' }
    ];
  }
}
