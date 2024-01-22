import { TestBed } from '@angular/core/testing';

import { ProformaRestService } from './proforma-rest.service';

describe('ProformaRestService', () => {
  let service: ProformaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProformaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
