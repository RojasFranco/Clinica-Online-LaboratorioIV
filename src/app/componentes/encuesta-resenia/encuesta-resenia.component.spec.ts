import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaReseniaComponent } from './encuesta-resenia.component';

describe('EncuestaReseniaComponent', () => {
  let component: EncuestaReseniaComponent;
  let fixture: ComponentFixture<EncuestaReseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaReseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
