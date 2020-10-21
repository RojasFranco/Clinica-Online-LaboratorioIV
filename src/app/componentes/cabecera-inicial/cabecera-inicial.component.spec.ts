import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraInicialComponent } from './cabecera-inicial.component';

describe('CabeceraInicialComponent', () => {
  let component: CabeceraInicialComponent;
  let fixture: ComponentFixture<CabeceraInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabeceraInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
