import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-instructor',
  imports: [RouterOutlet,RouterLink],
  standalone:true,
  templateUrl: './instructor.html',
  styleUrl: './instructor.css',
})
export class Instructor {
    username: string = '';
    constructor(public loginService:LoginService){}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }
}
