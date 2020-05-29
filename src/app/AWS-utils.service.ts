import { Injectable, Inject } from '@angular/core';
import * as AWS from 'aws-sdk';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AWSUtilsService {
  
  private creds;
  private pricing;
  
  constructor() { 
    this.creds = new AWS.Credentials("AKIA5OTORPR7LQ3DVENO", "LhWfTuFuZan9x+V0SlCgsInHZzpwvJp2mWH8i/aS");
    this.pricing = new AWS.Pricing({
      region: 'us-east-1',
      credentials: this.creds
    });
  }

  async getValsForAttribute(serviceName: string, attributeName: string) {
    return await this.getAllAttribVals(this.pricing, serviceName, attributeName);
  }

  private getValues(pricing, nt, params, vals = []) {
    if(nt) {
      params.NextToken = nt;
    }
  
    return pricing.getAttributeValues(params).promise().then(data => {
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
  
  private getAllAttribVals(pricing, service, attribName) {
    let attrib_params = {
      ServiceCode: service,
      AttributeName: attribName,
      MaxResults: 100
    }
    return this.getValues(pricing, null, attrib_params);
  }
}
