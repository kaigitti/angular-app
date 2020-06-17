import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

    address_Form = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name_surname: new FormControl('',[Validators.required]),
    tel: new FormControl('',[Validators.required,Validators.pattern('[0-9]{9}')]),
    province: new FormControl('',[Validators.required]),
    district: new FormControl('',[Validators.required]),
    sub_district: new FormControl('',[Validators.required]),
    postcode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{5}')]),
    other: new FormControl('',[Validators.required]),
  });

  previewLoaded: boolean = false; 

  constructor(private addr: AddressService,private router: Router) { }

  ngOnInit(): void {
  }

  addAddress(){
    this.addr.addAddress(this.address_Form.value).subscribe(
      data => {
        if(this.address_Form.invalid == false){
        console.log(data)
        alert('Add Address Success!');
        this.address_Form.reset;
        this.router.navigate(['/payment']);
        } else {
          alert('Please complete all fields.');
        }
      },
      err => {
        console.log(err)
      }
    );
  }

  resetForm(){
    this.address_Form.reset();
    this.previewLoaded = false;
  }

  get tel() { return this.address_Form.get('tel');}
  get postcode() { return this.address_Form.get('postcode');}
  get id() {return this.address_Form.get('id');}
  get name_surname() {return this.address_Form.get('name_surname');}
  get province() {return this.address_Form.get('province');}
  get district() {return this.address_Form.get('district');}
  get sub_district() {return this.address_Form.get('sub_district');}
  get other() {return this.address_Form.get('other');}
  

}
