import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state-service.service';
import { InventoryService } from '../services/inventory.service';
declare var $: any;

@Component({
  selector: 'app-s3-search-results',
  templateUrl: './s3-search-results.component.html',
  styleUrls: ['./s3-search-results.component.css']
})
export class S3SearchResultsComponent implements OnInit {

  public searchResData: [];
  public selectedS3;
  public errText;
  public units;

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

    this.selectedS3 = {
      priceDimensions:  ins.priceDimensions,
      attributes: attribVal
    }

    // console.log(this.selectedInstance);
    $('#moreDetails').modal()
  }

  selectItemForInventory(item) {
    this.selectedS3 = item;
    this.errText = '';
  }

  addToInventory() {
    if(this.units !== '' && this.units) {
      let toAdd = this.selectedS3;
      toAdd.units = parseInt(this.units, 10);
      this.inventory.addS3Item(toAdd);
      this.units = ''

      $('#addToInventoryModal').modal('hide');
    }
  }

}
