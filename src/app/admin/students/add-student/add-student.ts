import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css']
})
export class AddStudent {

  student = {

    id: 0,

    image: '',

    name: '',

    email: '',

    course: '',

    phone: '',

    status: 'Active'

  };

  constructor(private router: Router) {}

  saveStudent() {

    const students = JSON.parse(
      localStorage.getItem('students') || '[]'
    );

    this.student.id = Date.now();

    if (!this.student.image) {

      this.student.image =
        'https://randomuser.me/api/portraits/lego/1.jpg';

    }

    students.push(this.student);

    localStorage.setItem(
      'students',
      JSON.stringify(students)
    );

    alert('Student Added Successfully!');

    this.router.navigate(['/admin/students']);

  }

}