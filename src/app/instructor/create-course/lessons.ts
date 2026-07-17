import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/courseDto';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-lessons',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './lessons.html',
  styleUrls: ['./lessons.css'],
})
export class LessonsComponent implements OnInit {


  
  lessonName = '';
  videoUrl = '';

  lessons: any[] = [];
  course: Course[] = [];
  selectedCourseId: number | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    const storedLessons = localStorage.getItem('lessons');
    if (storedLessons) {
      try {
        const parsed = JSON.parse(storedLessons);
        if (Array.isArray(parsed)) {
          this.lessons = parsed.map((lesson: any, index: number) => ({
            title: lesson.title || `Lesson ${index + 1}`,
            lessonName: lesson.lessonName || '',
            videoUrl: lesson.video || '',
            video: this.sanitizer.bypassSecurityTrustResourceUrl(lesson.video || ''),
          }));
        }
      } catch (error) {
        console.warn('Failed to load saved lessons', error);
      }
    }

    this.getAllCourses();
  }

  addLesson() {
    let url = this.videoUrl;

    if (url.includes('<iframe')) {
      const match = url.match(/src="([^"]+)"/);
      if (match) {
        url = match[1];
      }
    }

    this.lessons.push({
      title: `Lesson ${this.lessons.length + 1}`,
      lessonName: this.lessonName,
      video: this.sanitizer.bypassSecurityTrustResourceUrl(url),
    });

    // Save plain URLs, not SafeResourceUrl objects
    localStorage.setItem(
      'lessons',
      JSON.stringify(
        this.lessons.map((l) => ({
          title: l.title,
          lessonName: l.lessonName,
          video: url,
        })),
      ),
    );

    this.lessonName = '';
    this.videoUrl = '';
  }
  deleteLesson(index: number) {
    this.lessons.splice(index, 1);

    this.lessons.forEach((lesson, i) => {
      lesson.title = 'Lesson ' + (i + 1);
    });

    localStorage.setItem('lessons', JSON.stringify(this.lessons));
  }

  previousLesson(index: number) {
    if (index > 0) {
      const previousCard = document.getElementById('lesson-' + (index - 1));

      previousCard?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  createCourse() {
    alert('🎉 Your lessons has been successfully created!');
  }
  createLessons() {
    if (this.lessons.length === 0) {
      alert('Please add at least one lesson.');
      return;
    }

    alert('🎉 Your lessons are created successfully!');
  }

  //get all the courses
  getAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        console.log('Courses:', data);
        this.course = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
