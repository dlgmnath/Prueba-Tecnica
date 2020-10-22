import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface items{
    _about: string;
    accessURL: string;
    title: string;  
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
   newHeader = {
      Accept: 'application/json'
    }

  constructor( private http: HttpClient ) { }
 
   returnData(){
    const headers = new HttpHeaders(this.newHeader);
    return this.http.get<any>("https://datos.gob.es/apidata/catalog/distribution",{headers})
   .toPromise()
   .then( res =>  <items[]>res.result.items)
  }
}

