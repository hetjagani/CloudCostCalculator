import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Loader } from './loader/loader.model';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader = new BehaviorSubject<Loader>({id: 'global', status: false}); 

  loaderStatus$ = this.loader.asObservable();

  constructor() { }

  public showLoader(id: string = 'global') {
    this.loader.next({id: id, status: true});
  }

  public hideLoader(id: string = 'global'): void {
    this.loader.next({id: id, status: false});
  }
}
