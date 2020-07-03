import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { Ec2SearchComponent } from './ec2-search/ec2-search.component';
import { AWSUtilsService } from './services/AWS-utils.service';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { Ec2SearchResultsComponent } from './ec2-search-results/ec2-search-results.component';
import { StateService } from './services/state-service.service';
import { InventoryService } from './services/inventory.service';
import { S3SearchComponent } from './s3-search/s3-search.component';
import { S3SearchResultsComponent } from './s3-search-results/s3-search-results.component';
import { RdsSearchComponent } from './rds-search/rds-search.component';
import { RdsSearchResultsComponent } from './rds-search-results/rds-search-results.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Ec2SearchComponent,
    LoaderComponent,
    Ec2SearchResultsComponent,
    S3SearchComponent,
    S3SearchResultsComponent,
    RdsSearchComponent,
    RdsSearchResultsComponent,
    InventoryComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AWSUtilsService, 
    LoaderService,
    StateService,
    InventoryService,
  ],
  bootstrap: [AppComponent, HeaderComponent]
})
export class AppModule { }
