import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AddressService} from '../../services/address.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-updateaddress',
  templateUrl: './updateaddress.component.html',
  styleUrls: ['./updateaddress.component.css']
})
export class UpdateaddressComponent implements OnInit {

  address: any;

  constructor(private addr: AddressService,private router: Router) { 
    this.onLoading();
  }

  ngOnInit(): void {
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

  deleteAddress(event){
  this.addr.deleteAddress(event).subscribe(
    data => {
      console.log(data)
      alert('Delete Address Success!');
      this.router.navigate(['/address']);
    },
    err => {
      console.log(err);
    });
}


}
