import { TestBed } from '@angular/core/testing';

import { MusicSaverService } from './music-saver.service';

describe('MusicSaverService', () => {
  let service: MusicSaverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicSaverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
