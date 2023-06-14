import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http:HttpClient) { }

  getAllCommandeClient(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllCommandeClient")
  }

  getAllCommandeFounisseur(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllCommandeFournisseur")
  }

  addcomandeclient(idclient:any , nom:any , request:any){
  return this.http.post<any>("http://localhost:8081/api/v1/saveCommandeclient/"+idclient +"/" +nom,request)
}

addcommandefournisseur(idfournisseur:any , nom , request:any){
  return this.http.post<any>("http://localhost:8081/api/v1/saveCommandefournisseur/"+idfournisseur+"/"+nom,request)
}

 deletecommande(idcommande:any){
  return this.http.delete<any>("http://localhost:8081/api/v1/deleteCommande/"+idcommande);
 }
 
 getcommandebyid(idcommande:any){
  return this.http.get<any>("http://localhost:8081/api/v1/getCommandeById/"+idcommande)
 }
 deletecommandefournisseur(idcommande:any){
  return this.http.delete<any>("http://localhost:8081/api/v1/deletecommandefournisseur/"+idcommande)
 }


 jareb(idclient:any , nom:any , request:any){
  return this.http.post<any>("http://localhost:8081/api/v1/saveCommandeclientwithvariant/"+idclient +"/" +nom,request)
}
}
