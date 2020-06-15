import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { EditproductsComponent } from './components/editproducts/editproducts.component';
import { SigninComponent } from './components/signin/signin.component'
import { ProfileComponent } from './components/profile/profile.component'
import { SignupComponent } from './components/signup/signup.component'

const routes: Routes = [
  { 
    path: 'manager', 
    component: ShowproductsComponent 
  },
  { 
    path: 'additem', 
    component: AddproductsComponent 
  },
  { 
    path: 'edit', 
    component: EditproductsComponent 
  },
  {
    path: 'signin', 
    component: SigninComponent
  },
  {
    path: 'profile', 
    component: ProfileComponent
  },
  {
    path: 'signup', 
    component: SignupComponent
  },
  { 
    path: '', 
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
