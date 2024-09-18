import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarPacienteComponent } from './agendar-paciente.component';

describe('AgendarPacienteComponent', () => {
  let component: AgendarPacienteComponent;
  let fixture: ComponentFixture<AgendarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendarPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
