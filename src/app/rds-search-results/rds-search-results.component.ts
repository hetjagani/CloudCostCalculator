import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state-service.service';
import { InventoryService } from '../services/inventory.service';
declare var $: any;

@Component({
  selector: 'app-rds-search-results',
  templateUrl: './rds-search-results.component.html',
  styleUrls: ['./rds-search-results.component.css']
})
export class RdsSearchResultsComponent implements OnInit {

  public searchResData: [];
  public selectedInstance: any;
  public errText: string;
  public units: string;

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
    if(this.units !== '' && this.units) {
      let toAdd = this.selectedInstance;
      toAdd.units = parseInt(this.units, 10);
      this.inventory.addRDSItem(toAdd);
      this.units = ''

      $('#addToInventoryModal').modal('hide');
    }else{
      this.errText = "Please enter valid number of hours...";
    }
  }
}
