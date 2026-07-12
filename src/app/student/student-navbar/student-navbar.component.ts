import { Component } from '@angular/core';
import { StudentDashboardService } from '../student.service';

@Component({
  selector: 'app-student-navbar',
  standalone: true,
  imports: [],
  templateUrl: './student-navbar.component.html',
  styleUrl: './student-navbar.component.css'
})
export class StudentNavbar {
studentName = '';

constructor(private  StudentDashboardService: StudentDashboardService) {}

ngOnInit() {

  this.StudentDashboardService.studentName$.subscribe(name => {
    this.studentName = name;
  });

}
}
