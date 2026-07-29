import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  StudentDashboardService,
} from '../../services/student.service';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lessonDto';
import { ProgressService } from '../../services/progress.service';

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
    private lessonService:LessonService,
    private progressService:ProgressService
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
    console.error('No lesson selected');
    return;
  }
  this.quizUnlocked = true;
  alert('Lesson marked as completed!');
  this.progressService.addProgress(this.selectedLesson.id!).subscribe();
  
}

 completeCurrentLesson(): void {

  // Make sure a lesson is selected
  if (!this.selectedLesson) {
    console.error('No lesson selected');
    return;
  }

  // Make sure lesson ID exists
  if (this.selectedLesson.id === undefined) {
    console.error('Lesson ID is missing');
    return;
  }
}

  // Now TypeScript knows id is definitely a number
//   this.lessonService
//     .completeLesson(this.selectedLesson.id)
//     .subscribe({

//       next: (response) => {

//         console.log(
//           'Lesson completed successfully:',
//           response
//         );

//       },

//       error: (error) => {

//         console.error(
//           'Error completing lesson:',
//           error
//         );

//       }

//     });

// }

 startQuiz() {

  this.router.navigate([
    '/student/quiz',
    this.selectedLesson.id
  ]);

}
}
// }