import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  dashboardStats = [
    {
      title: 'Total Students',
      value: '2,548',
      icon: 'bi-people-fill',
      color: 'bg-blue',
      growth: '+12%'
    },
    {
      title: 'Total Courses',
      value: '148',
      icon: 'bi-journal-bookmark-fill',
      color: 'bg-green',
      growth: '+8%'
    },
    {
      title: 'Instructors',
      value: '56',
      icon: 'bi-person-workspace',
      color: 'bg-orange',
      growth: '+5%'
    },
    {
      title: 'Revenue',
      value: '₹4.8L',
      icon: 'bi-currency-rupee',
      color: 'bg-red',
      growth: '+18%'
    }
  ];

  recentStudents = [
    {
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      course: 'Java Full Stack',
      status: 'Active',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Kumari',
      email: 'priya@gmail.com',
      course: 'Angular',
      status: 'Active',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Arjun Kumar',
      email: 'arjun@gmail.com',
      course: 'Spring Boot',
      status: 'Pending',
      image: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
      name: 'Sneha Reddy',
      email: 'sneha@gmail.com',
      course: 'Python',
      status: 'Completed',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];

  recentCourses = [
    {
      title: 'Java Full Stack',
      instructor: 'John Smith',
      students: 450,
      price: '₹4999'
    },
    {
      title: 'Angular 22',
      instructor: 'David Lee',
      students: 320,
      price: '₹3999'
    },
    {
      title: 'Spring Boot',
      instructor: 'Emily Davis',
      students: 280,
      price: '₹4499'
    }
  ];

  activities = [
    {
      icon: 'bi-person-plus-fill',
      color: 'bg-success',
      title: 'New Student Registered',
      description: 'Rahul joined Java Full Stack.',
      time: '10 mins ago'
    },
    {
      icon: 'bi-journal-check',
      color: 'bg-primary',
      title: 'New Course Added',
      description: 'Angular 22 Masterclass published.',
      time: '1 hour ago'
    },
    {
      icon: 'bi-award-fill',
      color: 'bg-warning',
      title: 'Certificate Issued',
      description: 'Certificate awarded to Priya.',
      time: '3 hours ago'
    },
    {
      icon: 'bi-cash-stack',
      color: 'bg-danger',
      title: 'Payment Received',
      description: '₹4,999 received successfully.',
      time: 'Today'
    }
  ];

  instructors = [
    {
      name: 'John Smith',
      subject: 'Java',
      students: 980,
      image: 'https://randomuser.me/api/portraits/men/51.jpg'
    },
    {
      name: 'Emily Davis',
      subject: 'Spring Boot',
      students: 860,
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      name: 'David Lee',
      subject: 'Angular',
      students: 720,
      image: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  ];

  constructor() {}

  addCourse() {
    alert('Add Course Clicked');
  }

  addStudent() {
    alert('Add Student Clicked');
  }

  viewReports() {
    alert('Reports Clicked');
  }

  settings() {
    alert('Settings Clicked');
  }

}