import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: any;

  constructor(private http: HttpClient) { }

  addProduct(product){
    return this.http.post<any>('http://localhost:3000/products/add', product)
    .pipe(map(data => {
      return data;
    }));
  }

  getProducts(){
    return this.http.get<any>('http://localhost:3000/producst/get')
    .pipe(map(data => {
      if(data) {
        this.products =data;
        console.log(this.products);
      }
      return this.products;
    }));
  }
}
