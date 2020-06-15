import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StoredbService } from '../../services/storedb.service';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent implements OnInit {

  storedb: any;

  product_Form = new FormGroup({
    p_id: new FormControl('',[Validators.required]),
    p_name: new FormControl('',[Validators.required]),
    p_detail: new FormControl('',[Validators.required]),
    p_quantity: new FormControl('',[Validators.required]),
    p_price: new FormControl('',[Validators.required]),
    // p_img: new FormControl('',[Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private stdb: StoredbService) { }

  ngOnInit(): void{
    
  }
  
  deleteItems(_id){
    this.stdb.deleteItems(_id).subscribe(res => {
      this.storedb.splice(_id,1)
    })
  }

  resetForm(){
    this.product_Form.reset();
    this.previewLoaded = false;
  }

}
