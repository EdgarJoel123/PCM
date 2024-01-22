import { TestBed } from '@angular/core/testing';

import { PrincipalRestService } from './principal-rest.service';

describe('PrincipalRestService', () => {
  let service: PrincipalRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrincipalRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
