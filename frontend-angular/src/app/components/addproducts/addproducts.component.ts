import { Component, OnInit, DoBootstrap } from '@angular/core';
import { FormControl, FormGroup, Validators,} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { StoredbService } from '../../services/storedb.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  // product_Type: String[] = ['Food','Drink','Snack','Phamarcy','Healthy','Electronics','Home appliance'];

  id = "";
  detail = "";
  name = "";
  qtt = "";
  price = "";

  product_Form = new FormGroup({
    p_id: new FormControl('', [Validators.required]),
    p_name: new FormControl('', [Validators.required]),
    p_detail: new FormControl('', [Validators.required]),
    p_quantity: new FormControl('', [Validators.required]),
    p_price: new FormControl('', [Validators.required]),
    p_img: new FormControl('',[Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private stdb: StoredbService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  addItems() {
    this.stdb.addItems(this.product_Form.value).subscribe(
      data => {
        console.log(data)
        alert('Add Product Succes');
        this.product_Form.reset;
      },
      err => {
        console.log(err)
      }
    );
  }

  onChangeImg(e: any){
    if (e.target.files.length>0){
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invaliad format');
        this.product_Form.reset();
      }else{
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.product_Form.patchValue({
            img: reader.result
          });
        };
      }
    }
  }

  navigateToManager(){
    this.router.navigate(['/manager']);
  }

  resetForm() {
    this.product_Form.reset();
    this.previewLoaded = false;
  }

}
