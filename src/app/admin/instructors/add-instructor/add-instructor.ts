import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

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

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  instructor = {
    name: '',
    email: '',
    password: ''
  };

  saveInstructor() {

    this.adminService.addInstructor(this.instructor).subscribe({

      next: (res) => {

        alert("Instructor Added Successfully");

        this.router.navigate(['/admin/instructors']);

      },

      error: (err) => {

        console.log(err);

        alert("Unable to Add Instructor");

      }

    });

  }

}