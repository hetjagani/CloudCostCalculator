import { Injectable, Inject } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class AWSUtilsService {
  
  private creds;
  public pricing;
  
  constructor() {
    this.creds = new AWS.Credentials("access", "secret");
    this.pricing = new AWS.Pricing({
      region: 'ap-south-1',
      credentials: this.creds
    });
  }

  // Fetches all the values for given attribute of Service
  async getValsForAttribute(serviceName: string, attributeName: string) {
    return await this.getAllAttribVals(serviceName, attributeName);
  }

  private getAllAttribVals(service, attribName) {
    let attrib_params = {
      ServiceCode: service,
      AttributeName: attribName,
      MaxResults: 100
    }
    return this.getValues(null, attrib_params);
  }

  private getValues(nt, params, vals = []) {
    if(nt) {
      params.NextToken = nt;
    }
  
    return this.pricing.getAttributeValues(params).promise().then(data => {
      data.AttributeValues.forEach(element => {
        vals.push(element.Value);
      });
      // vals.push.apply(vals, data.AttributeValues);
      if(data.NextToken) {
        return this.getValues(data.NextToken, params, vals);
      }else {
        return vals; 
      }
    }).catch(err => console.log(err));
  }

  // Search for products acc to given parameters and service Code
  async search(searchParams: any, serviceCode: string) {
    let filters = [];
    let requestParams = {
      ServiceCode: serviceCode,
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

    return this.pricing.getProducts(params).promise().then(data => {
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
