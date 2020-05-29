import { TestBed } from '@angular/core/testing';

import { Ec2InstanceSearchService } from './ec2-instance-search.service';

describe('Ec2InstanceSearchService', () => {
  let service: Ec2InstanceSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ec2InstanceSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
