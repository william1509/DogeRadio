import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongReadyComponent } from './song-ready.component';

describe('SongReadyComponent', () => {
  let component: SongReadyComponent;
  let fixture: ComponentFixture<SongReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongReadyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
