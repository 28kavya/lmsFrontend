import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css'
})
export class StudentSidebar {
  constructor(public loginService:LoginService){}

}
