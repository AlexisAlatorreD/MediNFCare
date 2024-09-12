//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Componentes
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './admin/login/login.component';
import { RegistrarComponent } from './admin/registrar/registrar.component';




import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './doctor/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    RegistrarComponent,
    MenuComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
