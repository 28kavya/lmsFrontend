import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-instructor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-instructor.html',
  styleUrls: ['./add-instructor.css']
})

export class AddInstructor {

  constructor(private router: Router) {}

  instructor = {

    id: 0,

    image: '',

    name: '',

    designation: '',

    email: '',

    department: 'Programming',

    courses: 0,

    students: 0,

    status: 'Active'

  };

  saveInstructor() {

    const instructors =
      JSON.parse(localStorage.getItem('instructors') || '[]');

    this.instructor.id = Date.now();

    instructors.push(this.instructor);

    localStorage.setItem(
      'instructors',
      JSON.stringify(instructors)
    );

    alert('Instructor Added Successfully!');

    this.router.navigate(['/admin/instructors']);

  }

}