import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { AWSUtilsService } from './AWS-utils.service';

@Injectable({
  providedIn: 'root'
})
export class Ec2InstanceSearchService {

  constructor(private awsUtil: AWSUtilsService) { }

  async searchInstances(searchParams: any) {
    let filters = [];
    let requestParams = {
      ServiceCode: 'AmazonEC2',
      FormatVersion: "aws_v1",
      MaxResults: 100,
      Filters: [],
      NextToken: null
    }
    for(let p in searchParams) {
      if(searchParams[p] === "none"){
        continue;
      }
      let f = {
        Field: p,
        Type: "TERM_MATCH",
        Value: searchParams[p]
      }
      filters.push(f);
    }

    requestParams.Filters = filters;

    // console.log(requestParams);

    return await this.getAllProducts(requestParams);
  }

  private getAllProducts(requestParams) {
    return this.getSearchProduct(null, requestParams);
  }

  private getSearchProduct(nt, params, vals = []) {
    if(nt) {
      params.NextToken = nt;
    }

    return this.awsUtil.pricing.getProducts(params).promise().then(data => {
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
        vals.push(returnObj);
      }
      if(data.NextToken) {
        return this.getSearchProduct(data.NextToken, params, vals);
      }else {
        return vals; 
      }
    }).catch(err => console.error(err));
  }
}
