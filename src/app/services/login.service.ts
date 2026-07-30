import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register';
import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login';
import { environment } from '../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   private apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient,private router:Router) { }
  login(loginData: LoginRequest){
    return this.http.post<LoginResponse>(
        `${this.apiUrl}/login`,
        loginData
    );
}
logout() {
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
