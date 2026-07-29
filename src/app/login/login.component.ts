import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: LoginService, private router: Router){}
  email: string = '';
  password: string = '';
showPassword = false;
togglePassword() {
  this.showPassword = !this.showPassword;
}
login() {

  const loginData = {

    email: this.email,
    password: this.password

  };


  this.authService.login(loginData).subscribe({
    
    next: (response) => {

      console.log(response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("username", response.username);

      alert("Login Successful");

if (response.role === 'ADMIN') {
  this.router.navigate(['/admin/dashboard']);
}
else if (response.role === 'INSTRUCTOR') {
  this.router.navigate(['/instructor/dashboard']);
}
else if (response.role === 'STUDENT') {
  this.router.navigate(['/student/dashboard']);
}
    },

    error: (error) => {

      console.error(error);

      alert("Invalid Email or Password");

    }

  });

}

}
