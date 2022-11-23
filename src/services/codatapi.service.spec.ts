import { TestBed } from '@angular/core/testing';

import { CodatapiService } from './codatapi.service';

describe('CodatapiService', () => {
  let service: CodatapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodatapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
