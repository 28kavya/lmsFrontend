import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Instructor {

  id: number;
  image: string;
  name: string;
  designation: string;
  email: string;
  department: string;
  courses: number;
  students: number;
  status: string;

}

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

  searchText = '';

  totalInstructors = 0;
  activeInstructors = 0;
  totalCourses = 0;
  totalStudents = 0;

  instructors: Instructor[] = [];

  constructor(private router: Router) {

    this.loadInstructors();

  }

  loadInstructors() {

    const data = localStorage.getItem('instructors');

    if (data) {

      this.instructors = JSON.parse(data);

    } else {

      this.instructors = [

        {
          id: 1,
          image: 'https://randomuser.me/api/portraits/men/11.jpg',
          name: 'John Smith',
          designation: 'Senior Trainer',
          email: 'john@gmail.com',
          department: 'Programming',
          courses: 12,
          students: 1350,
          status: 'Active'
        },

        {
          id: 2,
          image: 'https://randomuser.me/api/portraits/women/20.jpg',
          name: 'Emily Davis',
          designation: 'Angular Expert',
          email: 'emily@gmail.com',
          department: 'Web Development',
          courses: 8,
          students: 980,
          status: 'Active'
        }

      ];

      localStorage.setItem(
        'instructors',
        JSON.stringify(this.instructors)
      );

    }

    this.updateStatistics();

  }
    get filteredInstructors() {

    return this.instructors.filter(instructor =>

      instructor.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase()) ||

      instructor.email
        .toLowerCase()
        .includes(this.searchText.toLowerCase()) ||

      instructor.department
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

  updateStatistics() {

    this.totalInstructors = this.instructors.length;

    this.activeInstructors =
      this.instructors.filter(i => i.status === 'Active').length;

    this.totalCourses =
      this.instructors.reduce(
        (total, instructor) => total + instructor.courses,
        0
      );

    this.totalStudents =
      this.instructors.reduce(
        (total, instructor) => total + instructor.students,
        0
      );

  }

  addInstructor() {

    this.router.navigate(['/admin/instructors/add']);

  }

  viewInstructor(instructor: Instructor) {

    alert('Viewing : ' + instructor.name);

  }
    editInstructor(instructor: Instructor) {

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

      this.saveToLocalStorage();

      this.updateStatistics();

      alert('Instructor deleted successfully!');

    }

  }

  saveToLocalStorage() {

    localStorage.setItem(
      'instructors',
      JSON.stringify(this.instructors)
    );

  }

}