import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import * as html2pdf from 'html2pdf.js'
declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  public ec2: any[];
  public s3: any[];
  public rds: any[];
  public selectedInstance;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.ec2 = this.inventoryService.inventory.ec2;
    this.s3 = this.inventoryService.inventory.s3;
    this.rds = this.inventoryService.inventory.rds;
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

  saveToPDF() {
    let element = document.getElementsByClassName('container-fluid')[0];
    html2pdf(element);
  }

}
