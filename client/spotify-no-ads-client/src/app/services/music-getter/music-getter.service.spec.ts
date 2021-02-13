import { TestBed } from '@angular/core/testing';

import { MusicGetterService } from './music-getter.service';

describe('MusicGetterService', () => {
  let service: MusicGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
