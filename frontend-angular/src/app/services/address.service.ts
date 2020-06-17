import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  baseUrl = 'http://localhost:3000';
  address: any;


  constructor(private http: HttpClient) { }

  addAddress(addressData:any){
    return this.http.post(this.baseUrl + '/address/addAddress/' , addressData)
    .pipe(map(data => {
      return data;
    }))
  }

  

    showAddress(){
    return this.http.get(this.baseUrl + '/address/showAddress/')
    .pipe(map(data => {
      if(data){
        this.address = data;
        console.log(this.address);
      }
      return this.address;
    }));
  }

  deleteAddress(id){
    return this.http.delete(this.baseUrl + '/address/deleteAddress/' + id);
  }

}
