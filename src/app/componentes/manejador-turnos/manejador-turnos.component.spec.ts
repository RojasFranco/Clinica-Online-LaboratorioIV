import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejadorTurnosComponent } from './manejador-turnos.component';

describe('ManejadorTurnosComponent', () => {
  let component: ManejadorTurnosComponent;
  let fixture: ComponentFixture<ManejadorTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManejadorTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejadorTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
