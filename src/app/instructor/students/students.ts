import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructorStudent } from '../../models/instructor-student';
import { InstructorService } from '../../services/Instructor.service';
@Component({
  selector: 'app-students',
  standalone: true,
   imports: [FormsModule,CommonModule],
   templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students {
students: InstructorStudent[] = [];

  filteredStudents = [...this.students];
constructor(private service: InstructorService) {}

ngOnInit(){

  this.service.getStudents().subscribe({

  next: (res: InstructorStudent[]) => {

  this.students = res;
  this.filteredStudents = res;   // <-- IMPORTANT
  console.log(res);

}

  });

}
  

searchText = '';

  searchStudent() {

  this.filteredStudents = this.students.filter(student =>
    student.name.toLowerCase().includes(this.searchText.toLowerCase())
  );

  }
  

}