import { Injectable } from '@angular/core';
import { StoredbService } from '../services/storedb.service'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn:"root"
})
 export class CartService {

  counter = 0;
  sumPrice = 0;
  storedb: any;
  itemInCart: any = [];
  product: any;

  constructor( private stdb: StoredbService, private http: HttpClient ) { }

  getId(p_id){
    return this.stdb.getSomeProduct(p_id).subscribe( product => {
      this.product = product;
    });
  }

  // add(p_id){
  //   var pprice = this.product;
  //   console.log('Add item ID: ' + p_id + ' to cart.');
  //   this.getId(p_id);
  //   this.itemInCart.push(this.product);
  //   pprice.for(data => {
  //     this.sumPrice = this.sumPrice + data.p_price;
  //   })
  //   console.log(this.sumPrice);
  //   this.counter = this.itemInCart.length;
  // }

  getCounter(){
    return this.counter;
  }

  getSumPrice(){
    

    return this.sumPrice;
  }

  // getItemInCart(){
  //   return this.itemInCart;
  // }

  // getSomeProduct(p_id){
  //   return this.storedb.p_id;
  // }
  
}
