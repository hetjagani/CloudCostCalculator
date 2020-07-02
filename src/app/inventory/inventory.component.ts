import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import * as html2pdf from 'html2pdf.js'
import { LoaderService } from '../services/loader.service';
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
    $('#pdfButton').hide();
    $('#reportButton').hide();
    $('.extraDetails').hide();
    let element = document.getElementsByClassName('container-fluid')[0];
    html2pdf(element).then(res => {
      $('#reportButton').show();
      $('#pdfButton').show();
      $('.extraDetails').show();
    }); 
  }

  generateReport() {
    console.log("Generating Report");
    console.log(this.calculateEC2Cost());
    console.log(this.calculateS3Cost());
    console.log(this.calculateRDSCost());
  }

  calculateEC2Cost() {
    let retObj: {
      totalMonthlyCost: number,
      totalDailyCost: number,
      costArray: any[]
    } = {
      totalMonthlyCost: 0,
      totalDailyCost: 0,
      costArray: []
    };    
    
    for(let i=0; i<this.ec2.length; i++) {
      let ins = this.ec2[i];
      let cObj: any = {};
      cObj.product = ins.product;
      cObj.description = ins.priceDimensions.description;
      if(ins.priceDimensions.unit === 'Hrs') {
        let ppu = parseFloat(ins.priceDimensions.pricePerUnit.USD);
        cObj.dailyCost = ins.unitsperday * ppu;
        cObj.monthlyCost = ins.unitsperday * ppu * 30;
      }
      retObj.costArray.push(cObj);
      retObj.totalDailyCost += cObj.dailyCost;
      retObj.totalMonthlyCost += cObj.monthlyCost;
    }

    return retObj;
  }

  calculateS3Cost() {
    let retObj: {
      totalMonthlyCost: number,
      totalDailyCost?: number,
      costArray: any[]
    } = {
      totalMonthlyCost: 0,
      costArray: []
    };    
    
    for(let i=0; i<this.s3.length; i++) {
      let ins = this.s3[i];
      let cObj: any = {};
      cObj.product = ins.product;
      cObj.description = ins.priceDimensions.description;
      
      if(ins.priceDimensions.unit === 'GB') {
        let ppu = parseFloat(ins.priceDimensions.pricePerUnit.USD);
        cObj.monthlyCost = ins.units * ppu;
      }else if(ins.priceDimensions.unit === 'GB-Mo') {
        let ppu = parseFloat(ins.priceDimensions.pricePerUnit.USD);
        cObj.monthlyCost = ins.units * ppu;
      }else if(ins.priceDimensions.unit === 'Requests') {
        let ppu = parseFloat(ins.priceDimensions.pricePerUnit.USD);
        cObj.monthlyCost = ins.units * ppu;
      }
      retObj.costArray.push(cObj);
      retObj.totalMonthlyCost += cObj.monthlyCost;
    }

    return retObj;
  }

  calculateRDSCost() {
    let retObj: {
      totalMonthlyCost: number,
      totalDailyCost?: number,
      costArray: any[]
    } = {
      totalMonthlyCost: 0,
      costArray: []
    };    
    
    for(let i=0; i<this.rds.length; i++) {
      let ins = this.rds[i];
      let cObj: any = {};
      cObj.product = ins.product;
      cObj.description = ins.priceDimensions.description;
      
      if(ins.priceDimensions.unit === 'Hrs') {
        let ppu = parseFloat(ins.priceDimensions.pricePerUnit.USD);
        cObj.dailyCost = ins.units * ppu;
        cObj.monthlyCost = ins.units * ppu * 30;
      }else if(ins.priceDimensions.unit === 'GB-Mo') {
        let ppu = parseFloat(ins.priceDimensions.pricePerUnit.USD);
        cObj.monthlyCost = ins.units * ppu;
      }else if(ins.priceDimensions.unit === 'GB') {
        let ppu = parseFloat(ins.priceDimensions.pricePerUnit.USD);
        cObj.monthlyCost = ins.units * ppu;
      }
      retObj.costArray.push(cObj);
      retObj.totalMonthlyCost += cObj.monthlyCost;
      if(cObj.dailyCost) {
        retObj.totalDailyCost += cObj.dailyCost;
      }
    }

    return retObj;
  }
}
