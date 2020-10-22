import { items } from './../../services/data.service';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { DataListComponent } from '../data-list/data-list.component';
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit,OnChanges {

  @Input() data: items[];
  @Input() item: any;

  @Output() getNewData = new EventEmitter();

  modify:boolean = false;
  _about: string;
  accessURL: string;
  title: string;  
  
  constructor() {}

  ngOnInit() {

    }

  ngOnChanges(cambios ){
    if(this.item){
      this.modify = true;
      this._about = this.item._about;
      this.accessURL = this.item.accessURL;
      this.title = this.item.title;
    }
  }

  addData(event){
    let itemtemp = {
      _about: this._about,
      accessURL: this.accessURL,
      title: this.title,
    }
    this.data.push(itemtemp);
      this.getNewData.emit(this.data);
      // clean
      this.cleanData();
  }


  cleanData(){
      this._about = '';
      this.accessURL = '';
      this.title = '';
  }

 

  saveData(){
    this.data.forEach(data => {
      if(data.accessURL == this.accessURL){
        data._about = this._about;
        data.accessURL = this.accessURL;
        data.title = this.title ;
      }
    }); 
    this.modify = false;
    this.cleanData()
  }
}
