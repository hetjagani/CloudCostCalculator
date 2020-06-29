import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsSearchResultsComponent } from './rds-search-results.component';

describe('RdsSearchResultsComponent', () => {
  let component: RdsSearchResultsComponent;
  let fixture: ComponentFixture<RdsSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
