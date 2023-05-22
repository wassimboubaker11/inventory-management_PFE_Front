import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor( private http : HttpClient ) { }

  saveoption(option:any){
    return this.http.post<any>("http://localhost:8081/api/v1/seveoption" , option)
  }
  
  getalloption(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAlloption")
  }

  deleteoption(idoption){
    return this.http.delete<any>("http://localhost:8081/api/v1/deleteoption/"  +idoption)
  }
}
