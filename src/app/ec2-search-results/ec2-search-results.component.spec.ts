import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2SearchResultsComponent } from './ec2-search-results.component';

describe('Ec2SearchResultsComponent', () => {
  let component: Ec2SearchResultsComponent;
  let fixture: ComponentFixture<Ec2SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ec2SearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ec2SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
