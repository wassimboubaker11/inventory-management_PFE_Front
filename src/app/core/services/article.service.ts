import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  savearticle(article:any , iddepot:any , idcategory:any){
    return this.http.post<any>("http://localhost:8081/api/v1/savearticle/" +iddepot +"/" + idcategory , article )
  }

  getallarticle(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllarticle");
  }

  deletearticle(idarticle:any ){
    return this.http.delete<any>("http://localhost:8081/api/v1/deletearticle/" + idarticle );
  }

 

  getarticlebyid(idarticle:any){
    return this.http.get<any>("http://localhost:8081/api/v1/getarticlebyid/" + idarticle);
  }

  updatearticle(idarticle:any , article:any){
    return this.http.put<any>("http://localhost:8081/api/v1/updatearticle/" + idarticle, article);
  }

  getallarticlebyiddepot(iddepot:any){
    return this.http.get<any>("http://localhost:8081/api/v1/getallarticlebyiddepot/" +iddepot)
  }

  getAllArticlewithOutAlert(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllArticlewithOutAlert")
  }
}
