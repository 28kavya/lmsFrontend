import { Component } from '@angular/core';
import { StudentNavbar } from './student-navbar/student-navbar.component';
import { RouterOutlet } from '@angular/router';
import { StudentSidebar } from './student-sidebar/student-sidebar.component';
@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    StudentSidebar,
    StudentNavbar
  ],
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayout {

}