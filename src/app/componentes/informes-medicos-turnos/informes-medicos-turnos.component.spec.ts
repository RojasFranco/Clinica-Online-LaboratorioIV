import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesMedicosTurnosComponent } from './informes-medicos-turnos.component';

describe('InformesMedicosTurnosComponent', () => {
  let component: InformesMedicosTurnosComponent;
  let fixture: ComponentFixture<InformesMedicosTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesMedicosTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesMedicosTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
