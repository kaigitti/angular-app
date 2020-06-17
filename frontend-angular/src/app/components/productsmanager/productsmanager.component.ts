import { Component, OnInit } from '@angular/core';
import { StoredbService } from '../../services/storedb.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
  
@Component({
  selector: 'app-productsmanager',
  templateUrl: './productsmanager.component.html',
  styleUrls: ['./productsmanager.component.css']
})
export class ProductsmanagerComponent implements OnInit {

  faEdit = faEdit; 
  faTrash = faTrash;
  faSearch = faSearch;
  faPlus = faPlus;

  storedb: any;

  searchText;

  constructor(
    private stdb: StoredbService, 
    private http: HttpClient,
    private router: Router) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  onLoading(){
    try {
      this.stdb.showItems().subscribe(
        data => {
          this.storedb = data;
        },
        err => {
          console.log(err)
          this.router.navigate(['/signin']);
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
