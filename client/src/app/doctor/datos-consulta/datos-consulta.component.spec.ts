import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosConsultaComponent } from './datos-consulta.component';

describe('DatosConsultaComponent', () => {
  let component: DatosConsultaComponent;
  let fixture: ComponentFixture<DatosConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
