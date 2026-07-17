import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/courseDto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';
import { Instructor } from '../../../models/Instructor';


@Component({
  selector: 'app-edit-course',
   standalone: true,
   imports: [CommonModule, FormsModule],
  templateUrl: './edit-course.html',
  styleUrls: ['./edit-course.css']
})
export class EditCourseComponent implements OnInit {

  course: Course = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    instructorId: 0,
    instructor:''
  };

  courseId!: number;
  insturctorList:Instructor[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.getAllInstructor()
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    // Load existing course
    this.courseService.getCourseById(this.courseId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.course = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  updateCourse(): void {

    this.courseService.editCourse(this.courseId, this.course)
      .subscribe({
        next: (data) => {
          alert('Course updated successfully');
          console.log(data);
          this.router.navigate(['/admin/courses']);
        },
        error: (err) => {
          console.error(err);
          alert('Update failed');
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/admin/courses']);
  }


  getAllInstructor()
  {
    this.courseService.getAllInstructor().subscribe({
      next:(responseData)=>
      {
        this.insturctorList=responseData;
      },

      error:(err)=>{
        console.log(err)
      }
    });
  }
}