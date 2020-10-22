import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesListadoAprobadosComponent } from './profesionales-listado-aprobados.component';

describe('ProfesionalesListadoAprobadosComponent', () => {
  let component: ProfesionalesListadoAprobadosComponent;
  let fixture: ComponentFixture<ProfesionalesListadoAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalesListadoAprobadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesListadoAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
