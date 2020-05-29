import { Injectable, Inject } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class AWSUtilsService {
  
  private creds;
  public pricing;
  
  constructor() { 
    this.creds = new AWS.Credentials("AKIA5OTORPR7LQ3DVENO", "LhWfTuFuZan9x+V0SlCgsInHZzpwvJp2mWH8i/aS");
    this.pricing = new AWS.Pricing({
      region: 'ap-south-1',
      credentials: this.creds
    });
  }

  async getValsForAttribute(serviceName: string, attributeName: string) {
    return await this.getAllAttribVals(serviceName, attributeName);
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
  
  private getAllAttribVals(service, attribName) {
    let attrib_params = {
      ServiceCode: service,
      AttributeName: attribName,
      MaxResults: 100
    }
    return this.getValues(null, attrib_params);
  }
}
