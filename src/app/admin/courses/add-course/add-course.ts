import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-course.html',
  styleUrls: ['./add-course.css']
})
export class AddCourse implements OnInit {

  constructor(private adminService: AdminService) {}

  // List of instructors for the dropdown
  instructors: any[] = [];
  dashboard: any;
  // Course object
  course = {
    title: '',
    description: '',
    price: 0,
    instructorId: 0
  };

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors() {
    this.adminService.getAllInstructors().subscribe({
      next: (data) => {
        this.instructors = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  saveCourse() {
    this.adminService.addCourse(this.course).subscribe({
      next: (res) => {
         console.log(res);
        alert('Course Added Successfully');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

 
}