import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasRechazadasComponent } from './citas-rechazadas.component';

describe('CitasRechazadasComponent', () => {
  let component: CitasRechazadasComponent;
  let fixture: ComponentFixture<CitasRechazadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasRechazadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasRechazadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
