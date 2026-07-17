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
  styleUrl: './dashboard.css'
})
export class InstructorDashboard {

  // =========================
  // Dashboard Statistics
  // =========================

  stats = [
    {
      title: 'My Courses',
      value: 12,
      icon: 'bi-journal-bookmark-fill',
      color: 'bg-primary'
    },
    {
      title: 'Students',
      value: 245,
      icon: 'bi-people-fill',
      color: 'bg-success'
    },
    {
      title: 'Assignments',
      value: 18,
      icon: 'bi-file-earmark-text-fill',
      color: 'bg-warning'
    },
    {
      title: 'Earnings',
      value: '₹1,25,000',
      icon: 'bi-currency-rupee',
      color: 'bg-danger'
    }
  ];

  // =========================
  // Students
  // =========================

  students = [
    {
      name: 'Rahul Sharma',
      course: 'Angular',
      attendance: '98%',
      marks: '92%'
    },
    {
      name: 'Priya',
      course: 'Java',
      attendance: '95%',
      marks: '88%'
    },
    {
      name: 'Arjun',
      course: 'Spring Boot',
      attendance: '91%',
      marks: '84%'
    }
  ];

  // =========================
  // Assignments
  // =========================

  assignments = [
    {
      title: 'Angular Project',
      submitted: 20,
      pending: 5
    },
    {
      title: 'Java Assessment',
      submitted: 30,
      pending: 3
    }
  ];

  // =========================
  // Notifications
  // =========================

  notifications = [
    'New student enrolled.',
    'Assignment submitted.',
    'Live class starts at 2 PM.',
    'Course approved.'
  ];

  // =========================
  // Upcoming Classes
  // =========================

  upcomingClasses = [
    {
      subject: 'Angular',
      date: 'Today',
      time: '10:00 AM'
    },
    {
      subject: 'Java',
      date: 'Tomorrow',
      time: '2:00 PM'
    }
  ];

  // =========================
  // Reviews
  // =========================

  reviews = [
    {
      student: 'Rahul',
      rating: 5,
      comment: 'Excellent explanation.'
    },
    {
      student: 'Priya',
      rating: 4,
      comment: 'Very useful course.'
    }
  ];

  // =========================
  // Button Methods
  // =========================

  startClass() {
    alert('Starting Live Class...');
  }

  uploadCourse() {
    alert('Upload Course');
  }

  addAssignment() {
    alert('Add Assignment');
  }

  viewMessages() {
    alert('Opening Messages');
  }

  logout() {
    alert('Logout');
  }

}