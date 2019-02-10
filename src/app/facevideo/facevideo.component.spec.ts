import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacevideoComponent } from './facevideo.component';

describe('FacevideoComponent', () => {
  let component: FacevideoComponent;
  let fixture: ComponentFixture<FacevideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacevideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
