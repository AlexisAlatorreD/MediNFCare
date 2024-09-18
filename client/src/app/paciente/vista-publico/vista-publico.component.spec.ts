import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPublicoComponent } from './vista-publico.component';

describe('VistaPublicoComponent', () => {
  let component: VistaPublicoComponent;
  let fixture: ComponentFixture<VistaPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaPublicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
