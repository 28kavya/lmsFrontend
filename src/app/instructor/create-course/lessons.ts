import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-lessons',
  imports: [FormsModule,CommonModule],
  standalone:true,
  templateUrl: './lessons.html',
  styleUrls: ['./lessons.css']
})
export class LessonsComponent {

  lessonName = '';
  videoUrl = '';

  lessons: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}
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
    video: this.sanitizer.bypassSecurityTrustResourceUrl(url)
  });

  // Save plain URLs, not SafeResourceUrl objects
  localStorage.setItem(
    'lessons',
    JSON.stringify(
      this.lessons.map(l => ({
        title: l.title,
        lessonName: l.lessonName,
        video: url
      }))
    )
  );

  this.lessonName = '';
  this.videoUrl = '';
}
  deleteLesson(index: number) {

  this.lessons.splice(index, 1);

  this.lessons.forEach((lesson, i) => {
    lesson.title = 'Lesson ' + (i + 1);
  });

  localStorage.setItem(
    'lessons',
    JSON.stringify(this.lessons)
  );
}

previousLesson(index: number) {

  if (index > 0) {

    const previousCard = document.getElementById('lesson-' + (index - 1));

    previousCard?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
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

}