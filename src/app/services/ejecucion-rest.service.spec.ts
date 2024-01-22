import { TestBed } from '@angular/core/testing';

import { EjecucionRestService } from './ejecucion-rest.service';

describe('EjecucionRestService', () => {
  let service: EjecucionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjecucionRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
