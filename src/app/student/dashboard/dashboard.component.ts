import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentDashboardService, StudentDashboardDTO, MyCourse } from '../student.service';
@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class StudentDashboard implements OnInit {
  dashboard: StudentDashboardDTO = {} as StudentDashboardDTO;

  constructor(private StudentDashboardService: StudentDashboardService, private router: Router) {
     console.log("StudentDashboard component loaded");
   
  }
  courses: MyCourse[] = [];

  ngOnInit(): void {

    this.StudentDashboardService.getDashboard().subscribe({
  next: (data:any) => {

    console.log("RAW RESPONSE:", JSON.stringify(data));

    this.dashboard = data;
    this.StudentDashboardService.setStudentName(data.studentName);
  },
  error: (err) => console.error(err)
});
    //my courses

    this.StudentDashboardService.getMyCourses().subscribe({

  next: (data) => {

    console.log("My Courses:", data);

    data.forEach((course: any) => {
      console.log(course);
    });

    this.courses = data;
  },

  error: (err) => {
    console.error(err);
  }

});
}
continueLearning(courseId: number): void {
  console.log("Course ID:", courseId);
    this.router.navigate(['/student/lesson', courseId]);
  }
}