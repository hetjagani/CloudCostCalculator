import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsSearchComponent } from './rds-search.component';

describe('RdsSearchComponent', () => {
  let component: RdsSearchComponent;
  let fixture: ComponentFixture<RdsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
