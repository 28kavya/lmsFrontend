import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-instructor',
  imports: [RouterOutlet,RouterLink],
  standalone:true,
  templateUrl: './instructor.html',
  styleUrl: './instructor.css',
})
export class Instructor {}
