import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2SearchComponent } from './ec2-search.component';

describe('Ec2SearchComponent', () => {
  let component: Ec2SearchComponent;
  let fixture: ComponentFixture<Ec2SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ec2SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ec2SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
