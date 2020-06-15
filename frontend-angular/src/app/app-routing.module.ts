import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { EditproductsComponent } from './components/editproducts/editproducts.component';

const routes: Routes = [
  {path: 'manager', component: ShowproductsComponent},
  {path: 'additem', component: AddproductsComponent},
  {path: 'edit', component: EditproductsComponent},
  {path: '', 
    redirectTo: 'manager',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
