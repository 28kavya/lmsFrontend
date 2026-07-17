import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentDashboardService } from '../../services/student.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  courses: any[] = [];

  constructor(
    private studentDashboardService: StudentDashboardService,
    private router: Router
  ) {
    console.log("MyCoursesComponent Loaded");
  }

  ngOnInit(): void {

    this.studentDashboardService.getMyCourses().subscribe({

      next: (data) => {
        console.log("My Courses:", data);
        this.courses = data;
      },

      error: (err) => {
        console.error("My Courses Error:", err);
      }

    });

  }

  continueLearning(courseId: number): void {
    this.router.navigate(['/student/lesson', courseId]);
  }

}