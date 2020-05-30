import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Loader } from './loader.model';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() public id: string = 'global';
  public show: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loaderStatus$.subscribe((res: Loader) => {
      this.show = this.id === res.id && res.status;
    });
  }

}
