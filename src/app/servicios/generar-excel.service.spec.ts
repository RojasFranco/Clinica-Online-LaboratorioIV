import { TestBed } from '@angular/core/testing';

import { GenerarExcelService } from './generar-excel.service';

describe('GenerarExcelService', () => {
  let service: GenerarExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
