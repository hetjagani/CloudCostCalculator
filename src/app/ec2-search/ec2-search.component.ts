import { Component, OnInit } from '@angular/core';
import { AWSUtilsService } from '../services/AWS-utils.service';
import { LoaderService } from '../services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state-service.service';


interface IEC2SearchParams {
  instanceFamily: string,
  operatingSystem: string,
  clockSpeed: string,
  physicalProcessor: string,
  memory: string,
  vcpu: string,
  storage: string,
  location: string,
  // instanceType: string
}

@Component({
  selector: 'app-ec2-search',
  templateUrl: './ec2-search.component.html',
  styleUrls: ['./ec2-search.component.css'],
})
export class Ec2SearchComponent implements OnInit {

  public searchParams: IEC2SearchParams = {
    instanceFamily: "none",
    operatingSystem: "none",
    clockSpeed: "none",
    physicalProcessor: "none",
    memory: "none",
    vcpu: "none",
    storage: "none",
    location: "none",
    // instanceType: ""
  };

  public searchParamAttributes : {
    instanceFamily: string[],
    operatingSystem: string[],
    clockSpeed: string[],
    physicalProcessor: string[],
    memory: string[],
    storage: string[],
    vcpu: string[],
    location: string[],
    // instanceType: []
  } = {
    instanceFamily: [],
    operatingSystem: [],
    clockSpeed: [],
    physicalProcessor: [],
    memory: [],
    storage: [],
    vcpu: [],
    location: [],
  };
  
  public loading: boolean = false;

  public SERVICE: string = 'AmazonEC2';

  constructor(private awsUtil: AWSUtilsService, 
              private loadingService: LoaderService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private stateService: StateService) { }

  ngOnInit(): void {
    // Get all the attributes values and fill in the form drop downs
    this.loading = false;
    for(let attrib in this.searchParamAttributes) {
      this.awsUtil.getValsForAttribute(this.SERVICE, attrib).then(vals => {
        // console.log(vals);
        this.searchParamAttributes[attrib] = vals;
        this.searchParamAttributes[attrib].unshift("none");
        // console.log(this.searchParamAttributes[attrib]);
      });
    }
  }

  searchInstances() {
    this.loading = true;
    this.loadingService.showLoader();
    this.awsUtil.search(this.searchParams, this.SERVICE).then(data => {
      // console.log(data);
      this.loading = false;
      this.stateService.setData(data);
      this.loadingService.hideLoader();
      this.router.navigate(['searchresults'], {relativeTo: this.activeRoute});
    }); 
  }

}
