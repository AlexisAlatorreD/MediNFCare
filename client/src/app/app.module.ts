//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';  
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './admin/login/login.component';
import { RegistrarComponent } from './admin/registrar/registrar.component';



import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './doctor/perfil/perfil.component';
import { PrincipalDoctorComponent } from './doctor/principal-doctor/principal-doctor.component';
import { CitasRechazadasComponent } from './doctor/citas-rechazadas/citas-rechazadas.component';
import { AgendarComponent } from './doctor/agendar/agendar.component';
import { ConsultaComponent } from './doctor/consulta/consulta.component';
import { PacientesComponent } from './doctor/pacientes/pacientes.component';
import { HistorialPacienteComponent } from './doctor/historial-paciente/historial-paciente.component';



@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    RegistrarComponent,
    MenuComponent,
    PerfilComponent,
    PrincipalDoctorComponent,
    CitasRechazadasComponent,
    AgendarComponent,
    ConsultaComponent,
    AgendarComponent,
    PacientesComponent,
    HistorialPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // Asegúrate de importar FormsModule  
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
