import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  public inventory: {
    ec2: any[]
  } = { 
    ec2: []
  }

  constructor() { }

  addEC2Item(item) {
    this.inventory.ec2.push(item);
    console.log(this.inventory.ec2);
  }

}
