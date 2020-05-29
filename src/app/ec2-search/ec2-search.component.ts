import { Component, OnInit } from '@angular/core';
import { AWSUtilsService } from '../AWS-utils.service';
import { Ec2InstanceSearchService } from '../ec2-instance-search.service';


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
    instanceFamily: "",
    operatingSystem: "",
    clockSpeed: "",
    physicalProcessor: "",
    memory: "",
    vcpu: "",
    storage: "",
    location: "",
    // instanceType: ""
  };

  public searchParamAttributes = {
    instanceFamily: [],
    operatingSystem: [],
    clockSpeed: [],
    physicalProcessor: [],
    memory: [],
    storage: [],
    vcpu: [],
    location: [],
    // instanceType: []
  };
  
  public currRegion: string;

  constructor(private awsUtil: AWSUtilsService, 
              private ec2Search: Ec2InstanceSearchService) { }

  ngOnInit(): void {
    // TODO: Put (none) in the list of values if anyone want to remove any param from search.
    // Get all the attributes values and fill in the form drop downs
    for(let attrib in this.searchParamAttributes) {
      this.awsUtil.getValsForAttribute('AmazonEC2', attrib).then(vals => {
        this.searchParamAttributes[attrib] = vals;
        this.searchParams[attrib] = vals[0];      // For default values
      });
    }
  }

  searchInstances() {
    console.log("searching...");
    console.log(this.searchParams);
    this.ec2Search.searchInstances(this.searchParams).then(data => {
      console.log(data);
    }); 
  }

}
