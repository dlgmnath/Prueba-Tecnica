
import { Component, OnInit } from '@angular/core';
import { DataService, items } from '../../services/data.service'
@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})

export class DataListComponent implements OnInit {
 

  data : items[];
  item : any;
  newItem: items[];

  _about: string;
  accessURL: string;
  title: string;  

  modify:boolean = false;

  constructor(private dataService: DataService ) {}

  ngOnInit() {
    this.dataService.returnData().
    then(items => {
      this.data = items;
    }) 
  }

  loadData(url:string){
    this.modify = true;
    this.data.forEach(data => {
     if(data.accessURL == url){
      this._about = data._about;
      this.accessURL = data.accessURL;
      this.title = data.title;
      this.item = {
        _about : data._about,
        accessURL : data.accessURL,
        title : data.title,
      }
     }
   }); 
  }

  deleteData(url:string){
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i].accessURL == url){
        this.data.splice(i, 1);
      }
    }
  }

  newData(event){
    console.log(event);
    // refresh
    this.data = [...event];
  }
}