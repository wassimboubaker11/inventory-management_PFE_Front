import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  ajouteradmin(admin:any){
    return this.http.post<any>("http://localhost:8081/api/v1/admin/register", admin);
  }

  getallAdmin(){
    return this.http.get<any>("http://localhost:8081/api/v1/admin/getAllAdmin");
  }

  valideadmin(idadmin:any , admin:any):Observable<any>{
    return this.http.put<any>("http://localhost:8081/api/v1/admin/edit" +"/" +idadmin, admin);
  }

  getadminbyid(idadmin:any){
    return this.http.get<any>("http://localhost:8081/api/v1/admin/getadminbyid/" + idadmin);
  }

  deleteadmin(idadmin:any){
    return this.http.delete<any>("http://localhost:8081/api/v1/admin/deleteadmin/"+ idadmin);
  }

  getadminbyemail(email:any){
    return this.http.get<any>("http://localhost:8081/api/v1/admin/getadminbyemail/" + email);
  }
}
