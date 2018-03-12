import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoModifComponent } from './video-modif.component';

describe('VideoModifComponent', () => {
  let component: VideoModifComponent;
  let fixture: ComponentFixture<VideoModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
