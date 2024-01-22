import { TestBed } from '@angular/core/testing';

import { ReformaRestService } from './reforma-rest.service';

describe('ReformaRestService', () => {
  let service: ReformaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReformaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
