import { Component, OnInit } from '@angular/core';
import { AWSUtilsService } from '../services/AWS-utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
