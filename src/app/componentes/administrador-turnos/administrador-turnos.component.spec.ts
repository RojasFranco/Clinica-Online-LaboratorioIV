import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorTurnosComponent } from './administrador-turnos.component';

describe('AdministradorTurnosComponent', () => {
  let component: AdministradorTurnosComponent;
  let fixture: ComponentFixture<AdministradorTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
