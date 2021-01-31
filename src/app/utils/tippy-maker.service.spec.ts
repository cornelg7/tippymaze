import { TestBed } from '@angular/core/testing';

import { TippyMakerService } from './tippy-maker.service';

describe('TippyMakerService', () => {
  let service: TippyMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TippyMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
