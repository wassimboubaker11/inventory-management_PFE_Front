import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http:HttpClient) { }

 savefacture(idcommande:any){
  return this.http.post<any>("http://localhost:8081/api/v1/saveFacture/"+idcommande, {})
 }


 getfacturebyidcommande(idcommande:any){
  return this.http.get<any>("http://localhost:8081/api/v1/getFactureById/"+idcommande);
 }
}
