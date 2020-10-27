import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesTurnosPendientesComponent } from './profesionales-turnos-pendientes.component';

describe('ProfesionalesTurnosPendientesComponent', () => {
  let component: ProfesionalesTurnosPendientesComponent;
  let fixture: ComponentFixture<ProfesionalesTurnosPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalesTurnosPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesTurnosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
