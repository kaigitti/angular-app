import { Component, OnInit } from '@angular/core';
import { StoredbService } from '../../services/storedb.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';


import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
  
@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  faEdit = faEdit; 
  faTrash = faTrash;
  faSearch = faSearch;
  faPlus = faPlus;

  storedb: any;
  token: any;

  searchText;

  constructor(
    private stdb: StoredbService, 
    private http: HttpClient,
    private router: Router,
    public local: LocalStorageService) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  onLoading(){
    
    try {
      this.token = this.local.get('user').token;
      this.stdb.showItems(this.token).subscribe(
        data => {
          this.storedb = data;
        },
        err => {
          this.router.navigate(['/signin']);
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  
  deleteItems(event){
    this.stdb.deleteItems(event).subscribe(
      data => {
        console.log(data)
        alert('Delete Success!');
        this.onLoading();
      },
      err => {
        console.log(err);
      });
  }

  navigateToAddProducts(){
    this.router.navigate(['/additem']);
  }

}
