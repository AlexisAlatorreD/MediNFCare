import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './admin/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './doctor/perfil/perfil.component';
const routes: Routes = [
  {path: 'inicio', component:PrincipalComponent},
  {path: 'login', component:LoginComponent},
  {path: 'menu', component:MenuComponent},
{path: 'paciente', component:PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
