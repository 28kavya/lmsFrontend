import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardService } from '../../services/student.service';
import { Course } from '../../models/courseDto';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-explore-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explore-courses.component.html',
  styleUrls: ['./explore-courses.component.css']
})
export class ExploreCoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(private studentDashboardService: StudentDashboardService,private courseService:CourseService ) {}

  ngOnInit(): void {

    this.courseService.getAllCourses().subscribe({

      next: (data: any) => {

  console.log("Courses:", data);

  console.log("First Course:", data[0]);

  console.log("Course ID:", data[0].courseId);

  console.log("ID:", data[0].id);

  this.courses = data;

},

      error: (err) => {
        console.error(err);
      }

    });

  }

  enroll(courseId: number): void {

    this.studentDashboardService.enrollCourse(courseId).subscribe({

      next: () => {

        alert("Enrolled Successfully");

      },

      error: (err) => {

        alert(err.error?.message || "Enrollment Failed");

      }

    });

  }

}