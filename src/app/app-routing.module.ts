import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Ec2SearchComponent } from './ec2-search/ec2-search.component';
import { Ec2SearchResultsComponent } from './ec2-search-results/ec2-search-results.component';
import { S3SearchComponent } from './s3-search/s3-search.component';
import { S3SearchResultsComponent } from './s3-search-results/s3-search-results.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo:"home" },
  { path: "home", component: HomeComponent },
  { path: "ec2", component: Ec2SearchComponent },
  { path: "ec2/searchresults", component: Ec2SearchResultsComponent},
  { path: "s3", component: S3SearchComponent},
  { path: "s3/searchresults", component: S3SearchResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

