import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesTurnosComponent } from './profesionales-turnos.component';

describe('ProfesionalesTurnosComponent', () => {
  let component: ProfesionalesTurnosComponent;
  let fixture: ComponentFixture<ProfesionalesTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalesTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
