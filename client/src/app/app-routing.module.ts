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


const routes: Routes = [
  {path: 'inicio', component:PrincipalComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'doctor/perfil', component:PerfilComponent},
  {path: 'doctor/principal', component: PrincipalDoctorComponent},
  {path: 'doctor/citas-rechazadas', component: CitasRechazadasComponent},
  {path: 'doctor/agendar', component: AgendarComponent},
  {path: 'doctor/consulta', component: ConsultaComponent},
  {path: 'doctor/pacientes', component: PacientesComponent},
  {path:'registrar', component: RegistrarComponent},
  {path: 'doctor/historial-paciente', component: HistorialPacienteComponent},
  {path: 'doctor/datos-consulta', component: DatosConsultaComponent},
  {path: 'paciente/principal-paciente', component: PrincipalPacienteComponent},
  {path: 'paciente/datos-publicos', component: DatosPublicosComponent},
  {path: 'paciente/vista-publico', component: VistaPublicoComponent},
  {path: 'paciente/agendar-paciente', component: AgendarPacienteComponent},
  {path: 'paciente/citas-paciente', component: CitasPacienteComponent},
  
  // {path: '**', component: PageNotFoundComponent}, //pagina de error 404

  //redirecciones por defecto
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PrincipalComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
