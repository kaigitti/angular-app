import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

 addUser(UserData){
    return this.http.post<any>('http://localhost:3000/user/signup', UserData)
    .pipe(map(data => {
      return data;
    }));
  }

}
