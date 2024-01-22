import { TestBed } from '@angular/core/testing';

import { AspectosFinancierosRestService } from './aspectos-financieros-rest.service';

describe('AspectosFinancierosRestService', () => {
  let service: AspectosFinancierosRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AspectosFinancierosRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
