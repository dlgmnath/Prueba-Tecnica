import { items } from './../../services/data.service';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { DataListComponent } from '../data-list/data-list.component';
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit,OnChanges {

  /**
   * @variable {data} - De tipo input recibe la informacion del componente data-list referente a la respuesta de la peticion
   * @variable {item} - De tipo Input recibe la informacion del cmponente data-lista referente a el item que sera modificado
   * @evenEmitter {getNewData} - De tipo Output envia la informacion modificada al componete data-lsit para actualizar la tabla.
   * @variable {modify} variable boolena de control para vizualizar iconos de guardar/agregar
   * @variable {_about, accessURL, title} variables que alimentan el formulario mediante NgModel
   */
  @Input() data: items[];
  @Input() item: any;
  @Output() getNewData = new EventEmitter();

  modify:boolean = false;
  _about: string;
  accessURL: string;
  title: string;  
  
  constructor() {}

  ngOnInit() {}

  /**
  * @description Escucha los cambios delde el componente data-list
  *              y asi ejecutar cambios en el presente componente.
  */
  ngOnChanges(cambios){
    if(this.item){
      this.modify = true;
      this._about = this.item._about;
      this.accessURL = this.item.accessURL;
      this.title = this.item.title;
    }
  }

  /**
  * @description agregar nuevos registros al objeto JSON data
  */
  addData(){
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

  /**
  * @description Guardar modificaciones en la informacion de los registros del objeto JSON
  */
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

  /**
  * @description Limpieza del formulario
  */
 cleanData(){
  this._about = '';
  this.accessURL = '';
  this.title = '';
}
}
 
