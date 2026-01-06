import { TestBed } from '@angular/core/testing';

import { BiskopAuthenticationService } from './biskop-authentication.service';

describe('BiskopAuthenticationService', () => {
  let service: BiskopAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiskopAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
