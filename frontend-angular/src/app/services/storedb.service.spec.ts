import { TestBed } from '@angular/core/testing';

import { StoredbService } from './storedb.service';

describe('StoredbService', () => {
  let service: StoredbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoredbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
