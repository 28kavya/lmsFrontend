import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Instructor } from '../../models/Instructor';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './instructors.html',
  styleUrls: ['./instructors.css']
})

export class Instructors {


  instructors: Instructor[] = [];

  constructor(private router: Router,private adminService:AdminService) {

    this.loadInstructors();

  }

 loadInstructors(){

   this.adminService.getAllInstructors().subscribe({

      next:(res)=>{
        console.log(res);

         this.instructors=res;

      }

   });
  }
  //   get filteredInstructors() {

  //   return this.instructors.filter(instructor =>

  //     instructor.name
  //       .toLowerCase()
  //       .includes(this.searchText.toLowerCase()) ||

  //     instructor.email
  //       .toLowerCase()
  //       .includes(this.searchText.toLowerCase()) ||

  //     instructor.department
  //       .toLowerCase()
  //       .includes(this.searchText.toLowerCase())

  //   );

  // }


  addInstructor() {

    this.router.navigate(['/admin/instructors/add']);

  }
    editInstructor(instructor: Instructors) {

    localStorage.setItem(
      'selectedInstructor',
      JSON.stringify(instructor)
    );

    this.router.navigate(['/admin/instructors/edit']);

  }

  deleteInstructor(id: number) {

    const confirmDelete = confirm(
      'Are you sure you want to delete this instructor?'
    );

    if (confirmDelete) {

      this.instructors = this.instructors.filter(
        instructor => instructor.id !== id
      );

      alert('Instructor deleted successfully!');

    }

  }

}