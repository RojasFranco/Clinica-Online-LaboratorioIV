import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesListadoComponent } from './profesionales-listado.component';

describe('ProfesionalesListadoComponent', () => {
  let component: ProfesionalesListadoComponent;
  let fixture: ComponentFixture<ProfesionalesListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalesListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
