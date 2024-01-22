import { TestBed } from '@angular/core/testing';

import { AspectosTecnicosRestService } from './aspectos-tecnicos-rest.service';

describe('AspectosTecnicosRestService', () => {
  let service: AspectosTecnicosRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AspectosTecnicosRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
