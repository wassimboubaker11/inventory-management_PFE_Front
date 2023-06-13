import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllcategory(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllcategory")
  }

  deletecategorybyid(idcategpry:any){
    return this.http.delete<any>("http://localhost:8081/api/v1/deletecategorybyid/"+idcategpry)
  }
  addcategory(category:any){
    return this.http.post<any>("http://localhost:8081/api/v1/savecategory",category)
  }

  getcategorybyid(idcategory:any){
    return this.http.get<any>("http://localhost:8081/api/v1/getCatgorybyID/"+idcategory)
  }

  updatedecategory(category:any , idcategory){
    return this.http.put<any>("http://localhost:8081/api/v1/updateCategory/"+idcategory, category)
  }
}
