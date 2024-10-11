import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './admin/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './doctor/perfil/perfil.component';
import { PrincipalDoctorComponent } from './doctor/principal-doctor/principal-doctor.component';
import { CitasRechazadasComponent } from './doctor/citas-rechazadas/citas-rechazadas.component';
import { AgendarComponent } from './doctor/agendar/agendar.component';
import { PacientesComponent } from './doctor/pacientes/pacientes.component';
import { RegistrarComponent } from './admin/registrar/registrar.component';
import { ConsultaComponent } from './doctor/consulta/consulta.component';
import { HistorialPacienteComponent } from './doctor/historial-paciente/historial-paciente.component';
import { DatosConsultaComponent } from './doctor/datos-consulta/datos-consulta.component';
import { PrincipalPacienteComponent } from './paciente/principal-paciente/principal-paciente.component';
import { DatosPublicosComponent } from './paciente/datos-publicos/datos-publicos.component';
import { VistaPublicoComponent } from './paciente/vista-publico/vista-publico.component';
import { AgendarPacienteComponent } from './paciente/agendar-paciente/agendar-paciente.component';
import { CitasPacienteComponent } from './paciente/citas-paciente/citas-paciente.component';
import { DoctorGuard } from './auth.guard';  // Importa el guard

const routes: Routes = [
  { path: 'inicio', component: PrincipalComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  
  // Rutas protegidas para doctores
  { path: 'doctor/perfil', component: PerfilComponent, canActivate: [DoctorGuard] },
  { path: 'doctor/principal', component: PrincipalDoctorComponent, canActivate: [DoctorGuard] },
  { path: 'doctor/citas-rechazadas', component: CitasRechazadasComponent, canActivate: [DoctorGuard] },
  { path: 'doctor/agendar', component: AgendarComponent, canActivate: [DoctorGuard] },
  { path: 'doctor/consulta', component: ConsultaComponent, canActivate: [DoctorGuard] },
  { path: 'doctor/pacientes', component: PacientesComponent, canActivate: [DoctorGuard] },
  { path: 'doctor/historial-paciente', component: HistorialPacienteComponent, canActivate: [DoctorGuard] },
  { path: 'doctor/datos-consulta', component: DatosConsultaComponent, canActivate: [DoctorGuard] },

  // Rutas para pacientes
  { path: 'paciente/principal-paciente', component: PrincipalPacienteComponent },
  { path: 'paciente/datos-publicos', component: DatosPublicosComponent },
  { path: 'paciente/vista-publico', component: VistaPublicoComponent },
  { path: 'paciente/agendar-paciente', component: AgendarPacienteComponent },
  { path: 'paciente/citas-paciente', component: CitasPacienteComponent },

  // Ruta de registro
  { path: 'registrar', component: RegistrarComponent },

  // Redirecciones por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
