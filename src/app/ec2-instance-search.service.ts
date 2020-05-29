import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { AWSUtilsService } from './AWS-utils.service';

@Injectable({
  providedIn: 'root'
})
export class Ec2InstanceSearchService {

  constructor(private awsUtil: AWSUtilsService) { }

  searchInstances(searchParams: any) {
    let filters = [];
    let requestParams = {
      ServiceCode: 'AmazonEC2',
      FormatVersion: "aws_v1",
      MaxResults: 100,
      Filters: []
    }
    for(let p in searchParams) {
      let f = {
        Field: p,
        Type: "TERM_MATCH",
        Value: searchParams[p]
      }
      filters.push(f);
    }

    requestParams.Filters = filters;

    // console.log(requestParams);

    return this.awsUtil.pricing.getProducts(requestParams).promise().then(data => {
      let returnArr = [];
      let pricelist = data.PriceList;
      for(let element of pricelist) {
        let returnObj = { product: {}, priceDimensions: {} };
        
        returnObj.product = element.product;
        let onDemand = element.terms.OnDemand;
        for(var p in onDemand) {
          for(var pd in onDemand[p].priceDimensions) {
            returnObj.priceDimensions = onDemand[p].priceDimensions[pd];
          }
        }
        returnArr.push(returnObj);
      }
      return returnArr;
    });
  }
}
