import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalNoAprobadoComponent } from './profesional-no-aprobado.component';

describe('ProfesionalNoAprobadoComponent', () => {
  let component: ProfesionalNoAprobadoComponent;
  let fixture: ComponentFixture<ProfesionalNoAprobadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalNoAprobadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalNoAprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
