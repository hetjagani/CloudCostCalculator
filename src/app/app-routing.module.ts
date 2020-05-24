import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Ec2SearchComponent } from './ec2-search/ec2-search.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo:"home" },
  { path: "home", component: HomeComponent },
  { path: "ec2", component: Ec2SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

