import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register';
import { LoginResponse } from '../models/login-response';
import { LoginRequest } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }
  login(loginData: LoginRequest){
    return this.http.post<LoginResponse>(
        `${this.apiUrl}/login`,
        loginData
    );
}
}
