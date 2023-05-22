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
}
