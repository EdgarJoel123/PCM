import { TestBed } from '@angular/core/testing';

import { ProcesosSercopRestService } from './procesos-sercop-rest.service';

describe('ProcesosSercopRestService', () => {
  let service: ProcesosSercopRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesosSercopRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
