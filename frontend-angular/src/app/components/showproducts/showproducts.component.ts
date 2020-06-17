import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoredbService } from '../../services/storedb.service';
import { CartService } from '../../services/cart.service';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
  
@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  faEdit = faEdit; 
  faTrash = faTrash;
  faSearch = faSearch;
  faPlus = faPlus;

  storedb: any;
  counter = 0;
  sumPrice = 0;
  itemInCart: any = [];
  product: any[]=[];

  cartItem: any;

  itemArray: any[]=[];  

  searchText;

  constructor( private stdb: StoredbService, private router: Router, private cart: CartService) 
  { 
    this.onLoading();
    // this.cart = this.cart.getItemInCart();
  }

  ngOnInit(): void {
  }

  onLoading(){
    try {
      this.stdb.showItemsUser().subscribe(
        data => {
          this.storedb = data;
        },
        err => {
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  getId(p_id){

    return this.stdb.getSomeProduct(p_id).subscribe( product => {
      this.cartItem = product;
      this.product.push(product);
      this.counter = this.counter + 1
      console.log(this.product)
    });
    
  }

  getProduct(){ 
    var array=[];
      this.product.forEach(item => {
      array.push(item)
    });
    return array;
  }

  addToCart(p_id){
    
    return this.getId(p_id);
  }

  getCounter(){ 
    return this.cart.getCounter();
  }

  getSumPrice(){ 
    return this.cart.getSumPrice();
  }

}
