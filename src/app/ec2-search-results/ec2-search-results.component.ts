import { Component, OnInit } from '@angular/core';
import { StateService } from '../state-service.service';

@Component({
  selector: 'app-ec2-search-results',
  templateUrl: './ec2-search-results.component.html',
  styleUrls: ['./ec2-search-results.component.css']
})
export class Ec2SearchResultsComponent implements OnInit {

  public searchResData: [];

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.searchResData = this.stateService.getData();
    console.log(this.searchResData);
  }

}
