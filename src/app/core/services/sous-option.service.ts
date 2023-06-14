import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SousOptionService {

  constructor(private http:HttpClient) { }

  getAllsou_optionByIdOption(idoption:any){
    return this.http.get<any>("http://localhost:8081/api/v1/getSousOptionsbyidoption/"+idoption)
  }

  deletesous_option(idsous_option:any){
    return this.http.delete<any>("http://localhost:8081/api/v1/deletesous_option/"+idsous_option)
  }

  savesous_option(sous_option:any , idoption:any){
    return this.http.post<any>("http://localhost:8081/api/v1/savesousvariant/"+idoption , sous_option);
  }
}
