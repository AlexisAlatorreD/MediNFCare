import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalDoctorComponent } from './principal-doctor.component';

describe('PrincipalDoctorComponent', () => {
  let component: PrincipalDoctorComponent;
  let fixture: ComponentFixture<PrincipalDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrincipalDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
