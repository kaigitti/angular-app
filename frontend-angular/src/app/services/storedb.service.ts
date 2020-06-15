import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoredbService {

  baseUrl = 'http://localhost:3000';  
  storedb: any;

  constructor(private http: HttpClient) { }

  showItems(){
    return this.http.get(this.baseUrl + '/getItems')
    .pipe(map(data => {
      if(data){
        this.storedb = data;
        console.log(this.storedb);
      }
      return this.storedb;
    }));
  }

  addItems(storedb){
    return this.http.post(this.baseUrl + '/addItems', storedb)
    .pipe(map(data => {
      return data;
    }))
  }

  updateItems(id,name,detail,quantity,price){
    const obj = {
      id,
      name,
      detail,
      quantity,
      price 
    }
    return this.http.put(this.baseUrl + '/updateItems/' + id, obj).subscribe(res => {
      this.storedb.navigate(['stdb'])
    });
    
  }

  deleteItems(id){
    return this.http.delete(this.baseUrl + '/deleteItems/' + id);
  }

}
