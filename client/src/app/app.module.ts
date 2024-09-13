//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';  

//Componentes
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './admin/login/login.component';
import { RegistrarComponent } from './admin/registrar/registrar.component';




import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './doctor/perfil/perfil.component';
import { PrincipalDoctorComponent } from './doctor/principal-doctor/principal-doctor.component';
import { HistorialComponent } from './doctor/historial/historial.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    RegistrarComponent,
    MenuComponent,
    PerfilComponent,
    PrincipalDoctorComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
