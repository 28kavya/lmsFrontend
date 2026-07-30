import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { RegisterRequest } from '../models/register';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   constructor(private RegisterService: RegisterService) {}
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  role: string = '';
  password: string = '';
  confirmPassword: string = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

 register(): void {

  if (
    !this.firstName ||
    !this.email ||
    !this.password ||
    !this.confirmPassword
  ) {
    alert('Please fill all the fields.');
    return;
  }

  if (this.password !== this.confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  const registerData: RegisterRequest = {

    name: this.firstName+" "+this.lastName,
    email: this.email,
    password: this.password

  };

  this.RegisterService.register(registerData).subscribe({

    next: (response) => {

      console.log(response);
      localStorage.setItem('token', response.token);
localStorage.setItem('role', response.role);
      alert("Registration Successful!");

      this.firstName = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';

    },

    error: (error) => {

      console.error(error);
      alert("Registration Failed!");

    }

  });

}

}
