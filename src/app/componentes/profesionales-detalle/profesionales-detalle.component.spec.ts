import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalesDetalleComponent } from './profesionales-detalle.component';

describe('ProfesionalesDetalleComponent', () => {
  let component: ProfesionalesDetalleComponent;
  let fixture: ComponentFixture<ProfesionalesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalesDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
