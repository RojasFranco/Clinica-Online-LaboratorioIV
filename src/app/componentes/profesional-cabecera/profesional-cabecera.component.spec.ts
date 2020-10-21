import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalCabeceraComponent } from './profesional-cabecera.component';

describe('ProfesionalCabeceraComponent', () => {
  let component: ProfesionalCabeceraComponent;
  let fixture: ComponentFixture<ProfesionalCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalCabeceraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
