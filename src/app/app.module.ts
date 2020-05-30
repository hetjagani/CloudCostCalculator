import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { Ec2SearchComponent } from './ec2-search/ec2-search.component';
import { AWSUtilsService } from './AWS-utils.service';
import { Ec2InstanceSearchService } from './ec2-instance-search.service';
import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader/loader.component';
import { Ec2SearchResultsComponent } from './ec2-search-results/ec2-search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Ec2SearchComponent,
    LoaderComponent,
    Ec2SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AWSUtilsService, 
    Ec2InstanceSearchService,
    LoaderService
  ],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule { }
