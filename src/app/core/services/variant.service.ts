import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  constructor(private http:HttpClient) { }

  addvariant(request :any , idarticle:any): Observable<any>{
    return this.http.post<any>("http://localhost:8081/api/v1/addvariant/" + idarticle, request);
  }

  getvariantbyidarticle(idarticle:any){
    return this.http.get<any>("http://localhost:8081/api/v1/getVariantbyarticle/" + idarticle)
  }


  getVariantbyarticleid(idarticle:any){
    return this.http.get<any>("http://localhost:8081/api/v1/getVariantbyarticleid/" + idarticle)
  }

  deletevariant(idvariant:any){
    return this.http.delete<any>("http://localhost:8081/api/v1/deletevariant/"+idvariant)
  }
}
