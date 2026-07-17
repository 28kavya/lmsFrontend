import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/courseDto';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class Courses implements OnInit {

  constructor(private router: Router,private adminService: AdminService,private courseService: CourseService) {}

  searchText = '';
  selectedCategory = 'All Categories';
  selectedStatus = 'All Status';

  totalCourses = 0;
  activeCourses = 0;
  totalStudents = 0;
  totalRevenue = '₹0';

  courses: Course[] = [];
  dashboard: any;

  ngOnInit(): void {

    this.loadCourses();
    this.loadCourseCarddetails();
  }
  //course page load all courses
loadCourses(){
    this.courseService.getAllCourses().subscribe({
      next:(data)=>{
        console.log(data);
        this.courses=data;
        // this.updateStatistics();

      },
      error:(err)=>{
        console.log(err);
      }
    });

}
//course page card details
 loadCourseCarddetails() {
    this.adminService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  // updateStatistics() {
  //   this.totalCourses = this.courses.length;
  //   // this.activeCourses =
  //   //   this.courses.filter(c => c.status === 'Active').length;
  //   this.totalStudents =
  //     this.courses.reduce((sum, c) => sum + c.students, 0);
  //   const revenue =this.courses.reduce((sum, c) => sum + c.price, 0);
  //   this.totalRevenue = '₹' + revenue.toLocaleString();
  // }
  addCourse() {
    this.router.navigate(['/admin/courses/add']);
  }
 editCourse(course: Course) {
  this.router.navigate(['/admin/courses/edit', course.id]);
}

deleteCourse(id: number) {
  if (!confirm('Delete this course?')) {
    return;
  }
  this.courseService.deleteCourse(id).subscribe({
    next: () => {
      this.loadCourses();
      alert("Course deleted successfully");
    },
    error: (err) => {
      console.log(err);
    }
  
  });

}

get filteredCourses() {
  if (!this.searchText.trim()) {
    return this.courses;
  }

  return this.courses.filter(course =>
    course.title.toLowerCase().includes(this.searchText.toLowerCase())
    // course.instructor.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

}