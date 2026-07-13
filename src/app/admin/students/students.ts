import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Student {
  id: number;
  image: string;
  name: string;
  email: string;
  course: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students {

  searchText = '';

  students: Student[] = [];

  constructor(private router: Router) {}

  ngOnInit() {

    const savedStudents = localStorage.getItem('students');

    if (savedStudents) {

      this.students = JSON.parse(savedStudents);

    } else {

      this.students = [

        {
          id: 1,
          image: 'https://randomuser.me/api/portraits/women/15.jpg',
          name: 'Priya Sharma',
          email: 'priya@gmail.com',
          course: 'Java Full Stack',
          phone: '9876543210',
          status: 'Active'
        },

        {
          id: 2,
          image: 'https://randomuser.me/api/portraits/men/20.jpg',
          name: 'Rahul Kumar',
          email: 'rahul@gmail.com',
          course: 'Angular',
          phone: '9876501234',
          status: 'Completed'
        }

      ];

      localStorage.setItem(
        'students',
        JSON.stringify(this.students)
      );

    }

  }

  // ==========================
  // Statistics
  // ==========================

  get totalStudents() {
    return this.students.length;
  }

  get activeStudents() {
    return this.students.filter(
      student => student.status === 'Active'
    ).length;
  }

  // ==========================
  // Search
  // ==========================

  get filteredStudents() {

    return this.students.filter(student =>

      student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||

      student.email.toLowerCase().includes(this.searchText.toLowerCase()) ||

      student.course.toLowerCase().includes(this.searchText.toLowerCase())

    );

  }

  // ==========================
  // Add
  // ==========================

  addStudent() {

    this.router.navigate(['/admin/students/add']);

  }

  // ==========================
  // Edit
  // ==========================

  editStudent(student: Student) {

    this.router.navigate([
      '/admin/students/edit',
      student.id
    ]);

  }

  // ==========================
  // Delete
  // ==========================

  deleteStudent(id: number) {

    const confirmDelete = confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmDelete) return;

    this.students = this.students.filter(
      student => student.id !== id
    );

    localStorage.setItem(
      'students',
      JSON.stringify(this.students)
    );

    alert('Student Deleted Successfully!');

  }

}