import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientFournisseurService {

  constructor(private http:HttpClient) { }

getAllFournisseur(){
    return this.http.get<any>("http://localhost:8081/api/v1/getAllFounisseur");
}
saveFounisseur(fournisseur:any){
  return this.http.post<any>("http://localhost:8081/api/v1/saveFournisseur", fournisseur)
}
deleteFounisseur(idFounisseur:any){
  return this.http.delete<any>("http://localhost:8081/api/v1/deleteFounisseur/"+idFounisseur)
}

getAllClient(){
  return this.http.get<any>("http://localhost:8081/api/v1/getAllClient")
}

saveClient(client:any){
  return this.http.post<any>("http://localhost:8081/api/v1/saveClient" , client);
}

deleteclient(idclient:any){
  return this.http.delete<any>("http://localhost:8081/api/v1/deleteClient/"+ idclient)
}

updateClient(idclient:any , client:any ){
  return this.http.put<any>("http://localhost:8081/api/v1/updateClient/"+idclient , client)
}

updateFournisseur(idFournisseur:any , Fournisseur:any ){
  return this.http.put<any>("http://localhost:8081/api/v1/updateFounisseur/"+idFournisseur , Fournisseur)
}

getGetClient_FournisseurbyID(idtier:any){
  return this.http.get<any>("http://localhost:8081/api/v1/GetClient_FournisseurbyID/" +idtier)
}
 
}
