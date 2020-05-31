import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private data: any;

  constructor() { }

  public setData(d: any) {
    this.data = d;
  }

  public getData() {
    let retval = this.data;
    this.data = null;
    return retval;
  }
}
