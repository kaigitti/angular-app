import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';
import { Local } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class StoredbService {

  baseUrl = 'http://localhost:3000';  
  storedb: any;
 

  constructor( private http: HttpClient, public local: LocalStorageService) {
    
  }

  showItems(token: any){
    
    const headers = {'Authorization': token}
    return this.http.get(this.baseUrl + '/products/manager',{headers})
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

  updateItems(id, data){
    return this.http.put(this.baseUrl + '/updateItems/' + id, data)
  }

  deleteItems(id){
    return this.http.delete(this.baseUrl + '/products/deleteItems/' + id);
  }

}
