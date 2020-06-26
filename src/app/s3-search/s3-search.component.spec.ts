import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { S3SearchComponent } from './s3-search.component';

describe('S3SearchComponent', () => {
  let component: S3SearchComponent;
  let fixture: ComponentFixture<S3SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S3SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S3SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
