import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadAgregarComponent } from './especialidad-agregar.component';

describe('EspecialidadAgregarComponent', () => {
  let component: EspecialidadAgregarComponent;
  let fixture: ComponentFixture<EspecialidadAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialidadAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
