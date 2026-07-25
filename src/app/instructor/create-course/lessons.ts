import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InstructorService } from '../../services/Instructor.service';
import { Course } from '../../models/courseDto';
import { Lesson } from '../../models/lessonDto';

@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './lessons.html',
  styleUrls: ['./lessons.css']
})
export class CreateLessonComponent implements OnInit {

  // ============================================
  // COURSES FROM BACKEND
  // ============================================

  courses: Course[] = [];

  // ============================================
  // SELECTED COURSE
  // ============================================

  course = {
    courseId: 0
  };

  // ============================================
  // LESSON FORM
  // ============================================

  lessonName: string = '';
  videoUrl: string = '';

  // ============================================
  // TEMPORARY LESSON LIST
  // ============================================

  lessons: Lesson[] = [];

  // ============================================
  // LOADING STATES
  // ============================================

  loadingCourses: boolean = false;
  creatingLessons: boolean = false;

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(
    private instructorService: InstructorService
  ) {}

  // ============================================
  // ON INIT
  // ============================================

  ngOnInit(): void {

    this.loadCourses();

  }

  // ============================================
  // FETCH COURSES FROM BACKEND
  // ============================================

  loadCourses(): void {

    this.loadingCourses = true;

    this.instructorService.getMyCourses().subscribe({

      next: (response: Course[]) => {

        console.log('Courses received from backend:', response);

        this.courses = response;

        this.loadingCourses = false;

      },
      

      error: (error) => {

        console.error('Error fetching courses:', error);

        this.loadingCourses = false;

        alert('Failed to load courses from backend');

      }

    });

  }

  // ============================================
  // ADD LESSON TO TEMPORARY LIST
  // ============================================

  addLesson(): void {

    // Check course selection
    if (!this.course.courseId || this.course.courseId === 0) {

      alert('Please select a course');

      return;

    }

    // Check lesson name
    if (!this.lessonName.trim()) {

      alert('Please enter lesson name');

      return;

    }

    // Check video URL
    if (!this.videoUrl.trim()) {

      alert('Please enter video URL');

      return;

    }

    // Find selected course
    const selectedCourse = this.courses.find(
      course => course.id === this.course.courseId
    );

    // Create temporary lesson object
    const newLesson: Lesson = {

      // This is needed by your HTML
      title: selectedCourse?.title || 'Course Lesson',

      lessonName: this.lessonName.trim(),

      videoUrl: this.videoUrl.trim(),

      // Course ID required by backend
      courseId: this.course.courseId

    };

    // Add lesson to list
    this.lessons.push(newLesson);

    console.log('Lesson added:', newLesson);

    console.log('All temporary lessons:', this.lessons);

    // Clear only lesson fields
    this.lessonName = '';

    this.videoUrl = '';

  }

  // ============================================
  // DELETE LESSON
  // ============================================

  deleteLesson(index: number): void {

    if (index < 0 || index >= this.lessons.length) {

      return;

    }

    this.lessons.splice(index, 1);

  }

  // ============================================
  // MOVE LESSON UP
  // ============================================

  previousLesson(index: number): void {

    if (index <= 0) {

      return;

    }

    const temp = this.lessons[index];

    this.lessons[index] = this.lessons[index - 1];

    this.lessons[index - 1] = temp;

  }

  // ============================================
  // CREATE ALL LESSONS IN DATABASE
  // ============================================

  createLessons(): void {

    // Check course
    if (!this.course.courseId || this.course.courseId === 0) {

      alert('Please select a course');

      return;

    }

    // Check lessons
    if (this.lessons.length === 0) {

      alert('Please add at least one lesson');

      return;

    }

    // Prevent duplicate clicks
    if (this.creatingLessons) {

      return;

    }

    this.creatingLessons = true;

    console.log(
      'Sending lessons to Spring Boot:',
      this.lessons
    );

    // Create each lesson in backend
    const requests = this.lessons.map(
      lesson => this.instructorService.createLesson(lesson)
    );

    // Execute all API calls
    let completedRequests = 0;

    requests.forEach(request => {

      request.subscribe({

        next: (response) => {

          console.log(
            'Lesson created successfully:',
            response
          );

          completedRequests++;

          // All lessons created
          if (completedRequests === requests.length) {

            this.creatingLessons = false;

            alert(
              `${completedRequests} lesson(s) created successfully`
            );

            // Clear temporary list
            this.lessons = [];

          }

        },

        error: (error) => {

          console.error(
            'Error creating lesson:',
            error
          );

          this.creatingLessons = false;

          alert(
            'Failed to create lesson. Please check backend.'
          );

        }

      });

    });

  }

}