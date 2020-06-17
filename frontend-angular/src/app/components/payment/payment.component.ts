import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AddressService} from '../../services/address.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  address : any;
  data : any;
  

  constructor(private router:Router,private addr: AddressService) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  submitData(){
    console.log(this.data)
    const data  = this.data
    this.router.navigate(['/address']);
  }

  PayMoney(){
    console.log(this.data)
    const data  = this.data
    this.router.navigate(['/pay']);
  }

  editAddress(){
    console.log(this.data)
    const data  = this.data
    this.router.navigate(['/myadd']);
  }
  
  onLoading(){
    try {
      this.addr.showAddress().subscribe(
        data => {
          this.address = data;
        },
        err => {
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

}
