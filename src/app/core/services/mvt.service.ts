import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MvtService {

  constructor(private http : HttpClient) { }

  getAllMVTByIdcommande(idcommande:any){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllMVTbyIdCommande/"+idcommande)
  }

  getAllMVT(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllMVT")
  }
}
