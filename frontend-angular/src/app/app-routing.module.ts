import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsmanagerComponent } from './components/productsmanager/productsmanager.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { EditproductsComponent } from './components/editproducts/editproducts.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PayComponent } from './components/pay/pay.component';
import { AddressComponent } from './components/address/address.component';
import { UpdateaddressComponent } from './components/updateaddress/updateaddress.component';

const routes: Routes = [
  { 
    path: 'manager', 
    component: ProductsmanagerComponent 
  },{ 
    path: 'additem', 
    component: AddproductsComponent 
  },{ 
    path: 'edit', 
    component: EditproductsComponent 
  },{
    path: 'signin', 
    component: SigninComponent
  },{
    path: 'profile', 
    component: ProfileComponent
  },{
    path: 'signup', 
    component: SignupComponent
  },{
    path: 'showproducts',
    component: ShowproductsComponent
  },{
    path: 'pay',
    component: PayComponent
  },{
    path: 'payment',
    component: PaymentComponent
  },{
    path: 'address',
    component: AddressComponent
  },{
    path: 'updateaddress',
    component: UpdateaddressComponent
  },
  { 
    path: '', 
    redirectTo: 'showproducts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
