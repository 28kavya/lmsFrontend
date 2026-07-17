import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  StudentDashboardService,
} from '../../services/student.service';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lessonDto';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  lessons: Lesson[] = [];

  courseId!: number;

  selectedVideo!: SafeResourceUrl;

  // Currently selected lesson
  selectedLesson!: Lesson;

  quizUnlocked = false;
  

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private studentDashboardService: StudentDashboardService,
    private lessonService:LessonService
  ) {}

  ngOnInit(): void {

    this.courseId = Number(
      this.route.snapshot.paramMap.get('courseId')
    );

    this.loadLessons();
  }

  loadLessons(): void {

    this.lessonService.getLessons(this.courseId)
      .subscribe({

        next: (data) => {

          this.lessons = data;
          console.log("Lessons:", data);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  watchLesson(lesson: Lesson): void {

    this.selectedLesson = lesson;

    this.selectedVideo =
      this.sanitizer.bypassSecurityTrustResourceUrl(
        lesson.videoUrl
      );

    // Hide quiz until lesson is completed
    this.quizUnlocked = false;
  }

markCompleted(): void {

  if (!this.selectedLesson) {
    return;
  }

  this.studentDashboardService
      .completeLesson(this.selectedLesson.id)
      .subscribe({

        next: () => {

          alert("Lesson completed!");

          this.quizUnlocked = true;

        },

        error: (err) => {
          console.error(err);
        }

      });

}

 startQuiz() {

  this.router.navigate([
    '/student/quiz',
    this.selectedLesson.id
  ]);

}

}