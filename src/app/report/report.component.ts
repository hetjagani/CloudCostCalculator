import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state-service.service';
import { isUndefined } from 'util';
import * as html2pdf from 'html2pdf.js'

declare var $:any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public reportObj: any;
  public selectedInstance: any;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.reportObj = this.stateService.getData();
    if(isUndefined(this.reportObj)){
      this.reportObj = {};
    }
    // console.log(this.reportObj);
  }

  saveToPDF() {
    $('#pdfButton').hide();
    $('.extraDetails').hide();
    let element = document.getElementsByClassName('container-fluid')[0];
    let opt = {
      margin: [4, 2],
      jsPDF: {
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
      }
    }
    html2pdf(element, opt).then(res => {
      $('#pdfButton').show();
      $('.extraDetails').show();
    }); 
  }

  showDetails(ins) {
    let attributes = ins.product.attributes;
    let attribVal = []
    for(let a in attributes) {
      attribVal.push({ key: a, val: attributes[a] });
    }

    this.selectedInstance = {
      description:  ins.description,
      attributes: attribVal
    }

    // console.log(this.selectedInstance);
    $('#instanceDetails').modal()
  }

}
