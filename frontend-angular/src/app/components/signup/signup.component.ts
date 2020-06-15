import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignupService } from '../../services/signup.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  genderGeneral: String[] = ['male','female'];
  birthday_dd: Number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  birthday_mm: String[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  birthday_yy: Number[] = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,
                          2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
  UserForm = new FormGroup({
     username: new FormControl('',[Validators.required]),
     password: new FormControl('',[Validators.required]),
     firstname: new FormControl('',[Validators.required]),
     lastname: new FormControl('',[Validators.required]),
     email: new FormControl('',[Validators.required, Validators.email]),
     gender: new FormControl('',[Validators.required]),
     dd: new FormControl('',[Validators.required]),
     mm: new FormControl('',[Validators.required]),
     yy: new FormControl('',[Validators.required]),
     file: new FormControl('',[Validators.required]),
     img: new FormControl('',[Validators.required]),
  });

  get username() { return this.UserForm.get('username');}
  get password() { return this.UserForm.get('password');}
  get firstname() { return this.UserForm.get('firstname');}
  get lastname() { return this.UserForm.get('lastname');}
  get email() { return this.UserForm.get('email');}
  get gender() { return this.UserForm.get('gender');}
  get dd() { return this.UserForm.get('dd');}
  get mm() { return this.UserForm.get('mm');}
  get yy() { return this.UserForm.get('yy');}




  previewLoaded: boolean = false;

  constructor(private router: Router, private sp: SignupService) { }

  ngOnInit(): void {
  }

  addUser(){
    this.sp.addUser(this.UserForm.value).subscribe(
      data =>{
        alert('Sign up successfully');
        console.log(data);
        this.router.navigate(['/signin']);
        this.UserForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.UserForm.patchValue({
          img: reader.result
        })
      }
    }
  }

  BackSignin(){
    this.router.navigate(['/signin'])  
  }


}
