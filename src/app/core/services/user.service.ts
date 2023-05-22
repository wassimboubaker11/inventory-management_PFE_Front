import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    getuserbyemailandrole(email:any , role:any){
        return this.http.get<any>("http://localhost:8081/api/v1/getuserbyemailandrole/" + email +"/"+role);
    }
   
}
