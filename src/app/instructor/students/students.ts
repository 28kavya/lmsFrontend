import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
   imports: [FormsModule,CommonModule],
   templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students {

  students = [
    {
      name: 'John',
      email: 'john@gmail.com',
      course: 'Angular',
      progress: '80%',
      status: 'Active'
    },
    {
      name: 'Emma',
      email: 'emma@gmail.com',
      course: 'Java',
      progress: '100%',
      status: 'Completed'
    },
    {
      name: 'David',
      email: 'david@gmail.com',
      course: 'Python',
      progress: '45%',
      status: 'Active'
    },
    {
      name: 'Sophia',
      email: 'sophia@gmail.com',
      course: 'React',
      progress: '20%',
      status: 'New Student'
    }
  ];

  filteredStudents = [...this.students];
searchText = '';

  searchStudent() {

  this.filteredStudents = this.students.filter(student =>
    student.name.toLowerCase().includes(this.searchText.toLowerCase())
  );

  }

}