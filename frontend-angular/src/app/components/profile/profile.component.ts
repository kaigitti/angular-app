import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  token: string;

  constructor(public local: LocalStorageService, private pf: ProfileService, private router: Router) {
    try {
      this.token = this.local.get('user').token; // tokenที่ได้จากการห่อ data มา
      this.pf.getAllProfile(this.token).subscribe( // ต้องส่ง username ไปด้วย
        data => {
          this.profile = data;
        },
        err => {
          this.router.navigate(['/signin']);
        }
      );
    } catch (error) {
      console.log(error);
    }

    
   }

  ngOnInit(): void {

  }

}
