import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-course.html',
  styleUrls: ['./add-course.css']
})
export class AddCourse {

  constructor(private router: Router) {}

  course = {
    id: 0,
    image: '',
    title: '',
    instructor: '',
    category: '',
    duration: '',
    price: 0,
    students: 0,
    status: 'Active',
    description: ''
  };

  saveCourse() {

    // Get existing courses
    const storedCourses = localStorage.getItem('courses');

    let courses = storedCourses
      ? JSON.parse(storedCourses)
      : [];

    // Generate new ID
    this.course.id = Date.now();

    // Add new course
    courses.push(this.course);

    // Save back to localStorage
    localStorage.setItem(
      'courses',
      JSON.stringify(courses)
    );

    alert('Course Added Successfully!');

    // Navigate back to Course List
    this.router.navigate(['/admin/courses']);

  }

}