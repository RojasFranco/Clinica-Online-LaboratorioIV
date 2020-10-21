import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteHeaderComponent } from './paciente-header.component';

describe('PacienteHeaderComponent', () => {
  let component: PacienteHeaderComponent;
  let fixture: ComponentFixture<PacienteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
