import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorAltaComponent } from './administrador-alta.component';

describe('AdministradorAltaComponent', () => {
  let component: AdministradorAltaComponent;
  let fixture: ComponentFixture<AdministradorAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorAltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
