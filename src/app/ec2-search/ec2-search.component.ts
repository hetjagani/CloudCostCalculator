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
    storagevcpu: [],
    storage: [],
    vcpu: []
  };

  constructor(private awsUtil: AWSUtilsService) { }

  ngOnInit(): void {
    // const ifAttribs = this.awsUtil.getValsForAttribute('AmazonEC2', 'instanceFamily').then(attribs => {
    //   console.log(attribs);
    // });
    // console.log(ifAttribs);

    for(let attrib in this.searchParamAttributes) {
      this.awsUtil.getValsForAttribute('AmazonEC2', attrib).then(vals => {
        this.searchParamAttributes[attrib] = vals;
      });
    }
  }

  displayParams() {
    console.log(this.searchParams);
  }

}
