import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: any;

    admin:any;

    url ='http://127.0.0.1:8081/api/v1/auth/';

    


    constructor( private http : HttpClient , private router : Router) { }

    getUserDATAFromToken(){
      let token = localStorage.getItem('token');
      if(token){
        let data = JSON.parse(window.atob(token.split('.')[1]))
        return data.Role;
      }
    }
    

    isLoggedIn(){
        let token = localStorage.getItem('token');
  
        if (token){
          return true ;
        }else{
          return false;
        }
      }
    logOut(){
        localStorage.removeItem('token');
        this.router.navigate(['/account/login']);
      }

    register (admin : any){

     return this.http.post(this.url+'register',admin);

      }

    login(admin : any){
      return this.http.post(this.url+'authenticate',admin);
    }
    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    // login(email: string, password: string) {
    //     return getFirebaseBackend().loginUser(email, password).then((response: any) => {
    //         const user = response;
    //         return user;
    //     });
    // }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    // register(email: string, password: string) {
    //     return getFirebaseBackend().registerUser(email, password).then((response: any) => {
    //         const user = response;
    //         return user;
    //     });
    // }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getFirebaseBackend().logout();
    }
}

