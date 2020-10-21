import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesListadoPendientesComponent } from './profesionales-listado-pendientes.component';

describe('ProfesionalesListadoPendientesComponent', () => {
  let component: ProfesionalesListadoPendientesComponent;
  let fixture: ComponentFixture<ProfesionalesListadoPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalesListadoPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesListadoPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
