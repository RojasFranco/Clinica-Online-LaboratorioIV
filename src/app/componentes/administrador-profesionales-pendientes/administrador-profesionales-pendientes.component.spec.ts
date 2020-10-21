import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorProfesionalesPendientesComponent } from './administrador-profesionales-pendientes.component';

describe('AdministradorProfesionalesPendientesComponent', () => {
  let component: AdministradorProfesionalesPendientesComponent;
  let fixture: ComponentFixture<AdministradorProfesionalesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorProfesionalesPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorProfesionalesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
