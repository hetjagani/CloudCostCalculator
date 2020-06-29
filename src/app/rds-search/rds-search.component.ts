import { Component, OnInit } from '@angular/core';
import { AWSUtilsService } from '../services/AWS-utils.service';
import { LoaderService } from '../services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state-service.service';

interface IRDSSearchParams {
  location: string,
  instanceType: string,
  databaseEngine: string,
  deploymentOption: string,
  licenseModel: string,
  vcpu: string,
  memory: string
}

@Component({
  selector: 'app-rds-search',
  templateUrl: './rds-search.component.html',
  styleUrls: ['./rds-search.component.css']
})
export class RdsSearchComponent implements OnInit {

  public searchParams: IRDSSearchParams = {
    location: "none",
    instanceType: "none",
    databaseEngine: "none",
    deploymentOption: "none",
    licenseModel: "none",
    vcpu: "none",
    memory: "none"
  }

  public searchParamAttributes: {
    location: string[],
    instanceType: string[],
    databaseEngine: string[],
    deploymentOption: string[],
    licenseModel: string[],
    vcpu: string[],
    memory: string[]
  } = {
    location: [],
    instanceType: [],
    databaseEngine: [],
    deploymentOption: [],
    licenseModel: [],
    vcpu: [],
    memory: []
  }

  public loading: boolean = false;

  public SERVICE: string = 'AmazonRDS';

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

  searchRDSInstances() {
    this.loading = true;
    this.loadingService.showLoader();
    this.awsUtil.search(this.searchParams, this.SERVICE).then(data => {
      this.loading = false;
      this.loadingService.hideLoader();
      this.stateService.setData(data);
      this.router.navigate(['searchresults'], {relativeTo: this.activeRoute});
    }); 
  }
}
