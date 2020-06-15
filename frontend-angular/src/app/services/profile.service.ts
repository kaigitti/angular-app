import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile: any;
  body: any;
  userlogin: any;

  constructor(public local: LocalStorageService, private http: HttpClient) { }

  getAllProfile(token: any){

    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/api/profile',{headers}) //แปะ body
    .pipe(map(data => {
      if(data){

        console.log(data);
        this.profile = data;
        return this.profile;
      }
      
    }));
  }

}

