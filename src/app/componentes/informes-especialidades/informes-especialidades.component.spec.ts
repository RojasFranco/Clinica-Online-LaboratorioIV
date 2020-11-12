import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesEspecialidadesComponent } from './informes-especialidades.component';

describe('InformesEspecialidadesComponent', () => {
  let component: InformesEspecialidadesComponent;
  let fixture: ComponentFixture<InformesEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesEspecialidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
