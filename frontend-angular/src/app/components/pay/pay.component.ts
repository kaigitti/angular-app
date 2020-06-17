import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  imageForm = new FormGroup({
    img: new FormControl('', [Validators.required]),  
  });

  constructor() { }

  previewLoaded: boolean = false;

  ngOnInit(): void {
  }

  onChangeImg (e:any){ 
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      var pattern = /image-*/; 
      const reader = new FileReader(); 
      if (!file.type.match(pattern)) {
        alert('invalid format');
        this.imageForm.reset(); 
      }else{
        reader.readAsDataURL(file); 
        reader.onload = () => {
          this.previewLoaded = true; 
          this.imageForm.patchValue({
            img: reader.result
          });
        };
      }
    }
  }

}
