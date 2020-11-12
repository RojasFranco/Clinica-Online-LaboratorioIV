import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesTurnosPorDiaComponent } from './informes-turnos-por-dia.component';

describe('InformesTurnosPorDiaComponent', () => {
  let component: InformesTurnosPorDiaComponent;
  let fixture: ComponentFixture<InformesTurnosPorDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesTurnosPorDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesTurnosPorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
