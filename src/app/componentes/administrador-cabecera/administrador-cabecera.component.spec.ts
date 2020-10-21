import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorCabeceraComponent } from './administrador-cabecera.component';

describe('AdministradorCabeceraComponent', () => {
  let component: AdministradorCabeceraComponent;
  let fixture: ComponentFixture<AdministradorCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorCabeceraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
