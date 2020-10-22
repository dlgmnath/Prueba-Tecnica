import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @description interfaz para almacenar los items la peticion
 * @item {_about}  estructura de la respuesta ---
 * @item {accessURL}  estructura de la respuesta ---
 * @item {title} estructura de la respuesta ---
 */
export interface items{
    _about: string;
    accessURL: string;
    title: string;  
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /** Header solicitados en el requerimiento */
   newHeader = {
      Accept: 'application/json'
    }

  constructor( private http: HttpClient ) { }
 
  /**
 * @description Peticion GET a la uri
 */
   returnData(){
    const headers = new HttpHeaders(this.newHeader);
    return this.http.get<any>("https://datos.gob.es/apidata/catalog/distribution",{headers})
   .toPromise()
   .then( res =>  <items[]>res.result.items)
  }
}

