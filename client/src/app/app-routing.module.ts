import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './admin/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './doctor/perfil/perfil.component';
import { PrincipalDoctorComponent } from './doctor/principal-doctor/principal-doctor.component';
import { CitasRechazadasComponent } from './doctor/citas-rechazadas/citas-rechazadas.component';
import { AgendarComponent } from './doctor/agendar/agendar.component';
import { HistorialComponent } from './doctor/historial/historial.component';

const routes: Routes = [
  {path: 'inicio', component:PrincipalComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'doctor/perfil', component:PerfilComponent},
  {path: 'doctor/principal', component: PrincipalDoctorComponent},
  {path: 'doctor/citas-rechazadas', component: CitasRechazadasComponent},
  {path: 'doctor/agendar', component: AgendarComponent},
  {path: 'doctor/historial', component: HistorialComponent},
  {path: '**', component: PrincipalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
