import { TestBed } from '@angular/core/testing';

import { PartidaPresupuestariaRestService } from './partida-presupuestaria-rest.service';

describe('PartidaPresupuestariaRestService', () => {
  let service: PartidaPresupuestariaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidaPresupuestariaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
