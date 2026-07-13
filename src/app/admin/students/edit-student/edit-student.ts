import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css']
})
export class EditStudent {

  student: any = {};

  studentId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    const students = JSON.parse(
      localStorage.getItem('students') || '[]'
    );

    const foundStudent = students.find(
      (s: any) => s.id === this.studentId
    );

    if (foundStudent) {
      this.student = foundStudent;
    }

  }

  updateStudent() {

    const students = JSON.parse(
      localStorage.getItem('students') || '[]'
    );

    const index = students.findIndex(
      (s: any) => s.id === this.studentId
    );

    if (index !== -1) {

      students[index] = this.student;

      localStorage.setItem(
        'students',
        JSON.stringify(students)
      );

      alert('Student Updated Successfully!');

      this.router.navigate(['/admin/students']);

    }

  }

  cancel() {

    this.router.navigate(['/admin/students']);

  }

}