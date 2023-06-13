import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionaireService {

  constructor(private http : HttpClient) { }

  getAllGestionairebyidadmin(idadmin:any){
    return this.http.get<any>("http://localhost:8081/api/v1/user/getAllGestionairebyidadmin/" +idadmin);
}

activegestionaire(idg :any , gestionaire:any){
    return this.http.put<any>("http://localhost:8081/api/v1/user/valid/" +idg , gestionaire );
}

getgestionairebyemail(email:any){
  return this.http.get<any>("http://localhost:8081/api/v1/user/getgestionairebyemail/" + email);
}

savegestionaire(gestionaire:any , idadmin:any){
return this.http.post<any>("http://localhost:8081/api/v1/user/register/"+idadmin , gestionaire);
}

deletegestionairebyid(idcategory:any){
  return this.http.delete<any>("http://localhost:8081/api/v1/user/deletegestionaire/"+idcategory)
}
}
