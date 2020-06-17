import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class StoredbService {

  baseUrl = 'http://localhost:3000';  
  storedb: any;
  token: any;

  constructor( private http: HttpClient, public local: LocalStorageService) {
    
  }

  showItems(){
    this.token = this.local.get('user').token;
    const headers = {'Authorization': this.token}
    return this.http.get(this.baseUrl + '/products/manager',{headers})
    .pipe(map(data => {
      if(data){
        this.storedb = data;
        console.log(this.storedb);
      }
      return this.storedb;
    }));
  }

  showItemsUser(){
    return this.http.get(this.baseUrl + '/products/showproducts')
    .pipe(map(data => {
      if(data){
        this.storedb = data;
        console.log(this.storedb);
      }
      return this.storedb;
    }));
  }

  addItems(storedb){
    
    return this.http.post(this.baseUrl + '/products/addItems', storedb)
    .pipe(map(data => {
      return data;
    }))
  }

  deleteItems(id){
    return this.http.delete(this.baseUrl + '/products/deleteItems/' + id);
  }

  getSomeProduct(p_id){
    return this.http.get(this.baseUrl + '/products/showproducts/' + p_id)
    .pipe(map(data => {
      if(data){
        this.storedb = data;
        console.log(this.storedb);
      }
      return this.storedb;
    }));
  }


}
