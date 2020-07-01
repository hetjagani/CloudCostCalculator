import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state-service.service';
import { InventoryService } from '../services/inventory.service';
declare var $: any;

@Component({
  selector: 'app-ec2-search-results',
  templateUrl: './ec2-search-results.component.html',
  styleUrls: ['./ec2-search-results.component.css']
})
export class Ec2SearchResultsComponent implements OnInit {

  public searchResData: [];
  public selectedInstance: any;
  public unitsperday: string;
  public errText: string;

  constructor(private stateService: StateService,
              private inventory: InventoryService) { }

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

  selectItemForInventory(item) {
    this.selectedInstance = item;
    this.errText = '';
  }

  addToInventory() {
    let hours = parseInt(this.unitsperday, 10);
    if(this.unitsperday !== '' && this.unitsperday && hours > 0 && hours <= 24) {
      let toAdd = this.selectedInstance;
      toAdd.unitsperday = hours;
      this.unitsperday = ''
      this.inventory.addEC2Item(toAdd);

      $('#addToInventoryModal').modal('hide');
    }else{
      this.errText = "Please enter valid number of hours...";
    }
  }

}
