import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AWSUtilsService } from '../AWS-utils.service';


interface IEC2SearchParams {
  instanceFamily: string,
  operatingSystem: string,
  clockSpeed: string,
  physicalProcessor: string,
  memory: string,
  vcpu: string,
  storage: string
}

@Component({
  selector: 'app-ec2-search',
  templateUrl: './ec2-search.component.html',
  styleUrls: ['./ec2-search.component.css'],
})
export class Ec2SearchComponent implements OnInit {

  public searchParams: IEC2SearchParams = {
    instanceFamily: "",
    operatingSystem: "",
    clockSpeed: "",
    physicalProcessor: "",
    memory: "",
    vcpu: "",
    storage: ""
  };

  public searchParamAttributes = {
    instanceFamily: [],
    operatingSystem: [],
    clockSpeed: [],
    physicalProcessor: [],
    memory: [],
    storage: [],
    vcpu: []
  };
  
  public currRegion: string;

  constructor(private awsUtil: AWSUtilsService) { }

  ngOnInit(): void {
    // Get all the attributes and change in the form when region changes
    this.awsUtil.getRegion.subscribe((r) => {
      this.currRegion = r;
      console.log("Getting all attributes' vals in EC2 search from region: "+ this.currRegion);
      for(let attrib in this.searchParamAttributes) {
        this.awsUtil.getValsForAttribute(this.currRegion, 'AmazonEC2', attrib).then(vals => {
          this.searchParamAttributes[attrib] = vals;
          this.searchParams[attrib] = vals[0];      // For default values
        });
      }
    });
  }

  displayParams() {
    console.log(this.searchParams);
  }

}
