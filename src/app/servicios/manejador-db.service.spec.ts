import { TestBed } from '@angular/core/testing';

import { ManejadorDbService } from './manejador-db.service';

describe('ManejadorDbService', () => {
  let service: ManejadorDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejadorDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
