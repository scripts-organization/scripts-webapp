import { TestBed } from '@angular/core/testing';

import { MesaAlcaldeService } from './mesa-alcalde.service';

describe('MesaAlcaldeService', () => {
  let service: MesaAlcaldeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesaAlcaldeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
