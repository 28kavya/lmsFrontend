import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-instructor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-instructor.html',
  styleUrls: ['./edit-instructor.css']
})

export class EditInstructor {

  instructor: any = {};

  constructor(private router: Router) {

    const data = localStorage.getItem('selectedInstructor');

    if (data) {

      this.instructor = JSON.parse(data);

    }

  }

  updateInstructor() {

    const instructors = JSON.parse(
      localStorage.getItem('instructors') || '[]'
    );

    const index = instructors.findIndex(
      (i: any) => i.id === this.instructor.id
    );

    if (index !== -1) {

      instructors[index] = this.instructor;

      localStorage.setItem(
        'instructors',
        JSON.stringify(instructors)
      );

    }

    alert('Instructor Updated Successfully!');

    this.router.navigate(['/admin/instructors']);

  }

  cancel() {

    this.router.navigate(['/admin/instructors']);

  }

}