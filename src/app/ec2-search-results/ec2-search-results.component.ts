import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ec2-search-results',
  templateUrl: './ec2-search-results.component.html',
  styleUrls: ['./ec2-search-results.component.css']
})
export class Ec2SearchResultsComponent implements OnInit {

  public searchResData: [];

  constructor() { }

  ngOnInit(): void {
    this.searchResData = history.state.res;
    console.log(this.searchResData);
  }

}
