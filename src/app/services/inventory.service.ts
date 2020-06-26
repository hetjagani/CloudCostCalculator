import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  public inventory: {
    ec2: any[],
    s3: any[]
  } = { 
    ec2: [],
    s3: []
  }

  constructor() { }

  addEC2Item(item) {
    this.inventory.ec2.push(item);
    console.log(this.inventory);
  }

  addS3Item(item) {
    this.inventory.s3.push(item);
    console.log(this.inventory);
  }

}
