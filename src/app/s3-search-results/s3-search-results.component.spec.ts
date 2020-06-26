import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { S3SearchResultsComponent } from './s3-search-results.component';

describe('S3SearchResultsComponent', () => {
  let component: S3SearchResultsComponent;
  let fixture: ComponentFixture<S3SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S3SearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S3SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
