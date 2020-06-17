import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  accountStatusType: String[] = ['admin','user'];

  profile: any;
  hidden: boolean;

  authForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  get username() { return this.authForm.get('username');}
  get password() { return this.authForm.get('password');}

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  signIn(){
    console.log(this.authForm.value);
    this.auth.signIn(this.authForm.value).subscribe(
      data => {
        if(data.status == true){  
          if(data.result.accountStatus == 'admin'){
            alert('Sign in (As Admin) Success!');
            this.router.navigate(['/manager']);
          }else{
            alert('Sign in Success!');
            this.router.navigate(['/profile']);
          }
        }else{
          alert('Username or Password is incorrect!');
        }
        
      },
    err => {
      console.log(err);
      alert('Username or Password is incorrect!');
    }
    );
  }

  signup(){
    this.router.navigate(['/signup'])  
  }

}
