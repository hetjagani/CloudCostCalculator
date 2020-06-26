import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { AWSUtilsService } from '../services/AWS-utils.service';
import { StateService } from '../services/state-service.service';
import { Router, ActivatedRoute } from '@angular/router';

interface IS3SearchParams {
  location: string,
  feeCode: string,
  feeDescription: string,
  usageType: string,
  volumeType: string
}

@Component({
  selector: 'app-s3-search',
  templateUrl: './s3-search.component.html',
  styleUrls: ['./s3-search.component.css']
})
export class S3SearchComponent implements OnInit {

  public SERVICE: string = 'AmazonS3';

  public s3SearchParams: IS3SearchParams = {
    location: "none",
    feeCode: "none",
    feeDescription: "none",
    usageType: "none",
    volumeType: "none"
  }

  public searchParamAttributes : {
    location: string[],
    feeCode: string[],
    feeDescription: string[],
    usageType: string[],
    volumeType: string[]
  } = {
    location: [],
    feeCode: [],
    feeDescription: [],
    usageType: [],
    volumeType: []
  };

  public loading: boolean = false;

  constructor(private loadingService: LoaderService,
              private awsUtil: AWSUtilsService,
              private stateService: StateService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    for(let attrib in this.searchParamAttributes) {
      this.awsUtil.getValsForAttribute(this.SERVICE, attrib).then(vals => {
        // console.log(vals);
        this.searchParamAttributes[attrib] = vals;
        this.searchParamAttributes[attrib].unshift("none");
        // console.log(this.searchParamAttributes[attrib]);
      });
    }
  }

  searchS3() {
    this.loading = true;
    this.loadingService.showLoader();
    this.awsUtil.search(this.s3SearchParams, this.SERVICE).then(data => {
      // console.log(data);
      this.loading = false;
      this.stateService.setData(data);
      this.loadingService.hideLoader();
      this.router.navigate(['searchresults'], { relativeTo: this.activeRoute });
    });
  }

}
