import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http:HttpClient) { }


  getallalert(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllalert")
  }

  deletealertbyid(idalert:any){
    return this.http.delete<any>("http://localhost:8081/api/v1/deletealertbyid/"+idalert)
  }

  savealert(alert:any , idarticle:any){
    return this.http.post<any>("http://localhost:8081/api/v1/addalert/"+idarticle , alert);
  }
}
