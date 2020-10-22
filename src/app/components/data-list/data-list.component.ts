
import { Component, OnInit } from '@angular/core';
import { DataService, items } from '../../services/data.service'
@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})

export class DataListComponent implements OnInit {
 
  /**
   * @variable {data} - Recibe la informacion del servicio.
   * @variable {item} - Recibe la informacion del item seleccionado de la tabla
   * @variable {_about, accessURL, title} variables que alimentan el formulario mediante NgModel para cargar la informacion 
   *           en el componente maintenance.
   */
  data : items[];
  item : any;

  _about: string;
  accessURL: string;
  title: string;  

  constructor(private dataService: DataService ) {}

  ngOnInit() {
    this.dataService.returnData().
    then(items => {
      this.data = items;
    }) 
  }

  /**
  * @description Busca la informacion del item seleccionado mediante la url y lo almacena en la variable Item 
  *              que sera emitida al componente Maintenance.
  * @paramtero {url} - de Tipo String hace referencia la Url como identificador del item
  */
  loadData(url:string){
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

  /**
  * @description Busca la informacion del item seleccionado mediante la url y lo elimina del JSON
  * @paramtero {url} - de Tipo String hace referencia la Url como identificador del item
  */
  deleteData(url:string){
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i].accessURL == url){
        this.data.splice(i, 1);
      }
    }
  }

  /**
  * @description Escucha el eventEmitter del componente maintenance para recibir las modificaciones/inserciones en el objeto JSON 
  * @paramtero {event} - Cambios que se han generado en el objeto JSON data.
  */
  newData(event){
    // refresh
    this.data = [...event];
  }
}