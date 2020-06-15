import { Component, OnInit } from '@angular/core';
import { StoredbService } from '../../services/storedb.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
 
@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  faEdit = faEdit; 
  faTrash = faTrash;
  faSearch = faSearch;

  storedb: any;

  searchText;

  constructor(private stdb: StoredbService, private http: HttpClient) { 
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
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  deleteItems(_id){
    this.stdb.deleteItems(_id).subscribe(res => {
      this.storedb.splice(_id,1)
    })
    location.reload();
  }

}
