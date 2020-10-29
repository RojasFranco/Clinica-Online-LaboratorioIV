import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalDefinirHorarioComponent } from './profesional-definir-horario.component';

describe('ProfesionalDefinirHorarioComponent', () => {
  let component: ProfesionalDefinirHorarioComponent;
  let fixture: ComponentFixture<ProfesionalDefinirHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalDefinirHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalDefinirHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
