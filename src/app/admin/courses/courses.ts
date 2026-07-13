import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

export interface Course {
  id: number;
  image: string;
  title: string;
  instructor: string;
  category: string;
  students: number;
  duration: string;
  price: number;
  status: string;
  description?: string;
}

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

  constructor(private router: Router) {}

  searchText = '';
  selectedCategory = 'All Categories';
  selectedStatus = 'All Status';

  totalCourses = 0;
  activeCourses = 0;
  totalStudents = 0;
  totalRevenue = '₹0';

  courses: Course[] = [];

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {

    const storedCourses = localStorage.getItem('courses');

    if (storedCourses) {

      this.courses = JSON.parse(storedCourses);

    } else {

      this.courses = [

        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120',
          title: 'Java Full Stack Development',
          instructor: 'John Smith',
          category: 'Programming',
          students: 450,
          duration: '6 Months',
          price: 4999,
          status: 'Active',
          description: ''
        },

        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=120',
          title: 'Angular Development',
          instructor: 'David Lee',
          category: 'Web Development',
          students: 320,
          duration: '4 Months',
          price: 3999,
          status: 'Active',
          description: ''
        },

        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120',
          title: 'Spring Boot Masterclass',
          instructor: 'Emily Davis',
          category: 'Programming',
          students: 280,
          duration: '5 Months',
          price: 4499,
          status: 'Draft',
          description: ''
        },

        {
          id: 4,
          image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=120',
          title: 'MySQL Database',
          instructor: 'Michael Brown',
          category: 'Database',
          students: 190,
          duration: '2 Months',
          price: 2999,
          status: 'Active',
          description: ''
        }

      ];

      localStorage.setItem('courses', JSON.stringify(this.courses));
    }

    this.updateStatistics();
  }

  updateStatistics() {

    this.totalCourses = this.courses.length;

    this.activeCourses =
      this.courses.filter(c => c.status === 'Active').length;

    this.totalStudents =
      this.courses.reduce((sum, c) => sum + c.students, 0);

    const revenue =
      this.courses.reduce((sum, c) => sum + c.price, 0);

    this.totalRevenue = '₹' + revenue.toLocaleString();
  }

  addCourse() {
    this.router.navigate(['/admin/courses/add']);
  }

  editCourse(course: Course) {

    localStorage.setItem(
      'selectedCourse',
      JSON.stringify(course)
    );

    this.router.navigate(['/admin/courses/edit']);
  }

  deleteCourse(id: number) {

    const confirmDelete = confirm(
      'Are you sure you want to delete this course?'
    );

    if (!confirmDelete) return;

    this.courses =
      this.courses.filter(c => c.id !== id);

    localStorage.setItem(
      'courses',
      JSON.stringify(this.courses)
    );

    this.updateStatistics();

    alert('Course Deleted Successfully');
  }

  
 get filteredCourses() {

  if (!this.searchText.trim()) {
    return this.courses;
  }
  

  return this.courses.filter(course =>

    course.title.toLowerCase().includes(this.searchText.toLowerCase()) ||

    course.instructor.toLowerCase().includes(this.searchText.toLowerCase()) ||

    course.category.toLowerCase().includes(this.searchText.toLowerCase())

  );

}
}