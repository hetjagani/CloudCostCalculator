import { Component, OnInit } from '@angular/core';
import { StateService } from '../state-service.service';
declare var $: any;

@Component({
  selector: 'app-ec2-search-results',
  templateUrl: './ec2-search-results.component.html',
  styleUrls: ['./ec2-search-results.component.css']
})
export class Ec2SearchResultsComponent implements OnInit {

  public searchResData: [];
  
  public selectedInstance;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.searchResData = this.stateService.getData();
    console.log(this.searchResData);
  }

  showDetails(ins) {
    let attributes = ins.product.attributes;
    let attribVal = []
    for(let a in attributes) {
      attribVal.push({ key: a, val: attributes[a] });
    }

    this.selectedInstance = {
      priceDimensions:  ins.priceDimensions,
      attributes: attribVal
    }

    // console.log(this.selectedInstance);
    $('#instanceDetails').modal()
  }

}
