import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentDashboardService } from '../../services/student.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class StudentsComponent implements OnInit {

  students: User[] = [];
  filteredStudents: User[] = [];

  searchText = '';

  constructor(private studentService: StudentDashboardService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {

    this.studentService.getAllStudents().subscribe({

      next: (data) => {
console.log(data);
        this.students = data;
        this.filteredStudents = data;

      },

      error: (err) => {
        console.error('Error fetching students', err);
      }

    });

  }

}