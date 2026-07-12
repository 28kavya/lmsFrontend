import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: LoginService, private router: Router){}
  email: string = '';
  password: string = '';
login() {

  const loginData = {

    email: this.email,
    password: this.password

  };

  this.authService.login(loginData).subscribe({

    next: (response) => {

      console.log(response);

      localStorage.setItem("token", response.token);

      alert("Login Successful");

      this.router.navigate(['/student/dashboard']);

    },

    error: (error) => {

      console.error(error);

      alert("Invalid Email or Password");

    }

  });

}

}
