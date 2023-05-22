import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  url ='http://127.0.0.1:8081/api/v1/auth/';

  constructor(private http : HttpClient , private router : Router) { }

  adddepot(depot:any){
    return this.http.post<any>("http://localhost:8081/api/v1/savedepot" , depot);
  }

  getalldepot(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllDepot")
  }

  deletedepot(iddepot:any){
    return this.http.delete<any>("http://localhost:8081/api/v1/deletedepot/" + iddepot);
  }

  getdepotbyid(iddepot:any){
    return this.http.get<any>("http://localhost:8081/api/v1/getdepotbyid/" +iddepot);
  }

  updatedepot(depot:any , iddepot:any){
    return this.http.put<any>("http://localhost:8081/api/v1/editdepot/" + iddepot , depot)
  }
}
