import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './edit-course.html',
  styleUrls: ['./edit-course.css']
})
export class EditCourse implements OnInit {

  constructor(private router: Router) {}

  course: any = {
    id: 0,
    image: '',
    title: '',
    instructor: '',
    category: '',
    duration: '',
    price: 0,
    students: 0,
    status: '',
    description: ''
  };

  ngOnInit(): void {

    const selectedCourse = localStorage.getItem('selectedCourse');

    if (selectedCourse) {
      this.course = JSON.parse(selectedCourse);
    }

  }

  updateCourse() {

    let courses = JSON.parse(localStorage.getItem('courses') || '[]');

    const index = courses.findIndex(
      (c: any) => c.id === this.course.id
    );

    if (index !== -1) {

      courses[index] = this.course;

      localStorage.setItem(
        'courses',
        JSON.stringify(courses)
      );

      localStorage.removeItem('selectedCourse');

      alert('Course Updated Successfully!');

      this.router.navigate(['/admin/courses']);

    }

  }

  cancel() {

    this.router.navigate(['/admin/courses']);

  }

}