import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './admin/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PacienteComponent } from './paciente/paciente.component';

const routes: Routes = [
  {path: 'inicio', component:PrincipalComponent},
  {path: 'login', component:LoginComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'paciente', component:PacienteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
