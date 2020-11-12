import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesProfesionalesComponent } from './informes-profesionales.component';

describe('InformesProfesionalesComponent', () => {
  let component: InformesProfesionalesComponent;
  let fixture: ComponentFixture<InformesProfesionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesProfesionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
