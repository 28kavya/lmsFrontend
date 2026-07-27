import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../models/lessonDto';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  // Course related APIs
  private courseApiUrl = environment.apiUrl + '/course';

  // Lesson related APIs
  private lessonApiUrl = environment.apiUrl + '/lesson';

  // Progress APIs
  private progressApiUrl = environment.apiUrl + '/progress';

  constructor(
    private http: HttpClient
  ) {}


  // ============================================
  // GET ALL LESSONS FOR A COURSE
  // ============================================

  getLessons(courseId: number): Observable<Lesson[]> {

    return this.http.get<Lesson[]>(
      `${this.lessonApiUrl}/getlesson/${courseId}`
    );

  }


  // ============================================
  // CREATE LESSON
  // ============================================

  createLesson(lesson: Lesson): Observable<Lesson> {

    return this.http.post<Lesson>(
      `${this.lessonApiUrl}/create`,
      lesson
    );

  }


  // ============================================
  // MARK LESSON AS COMPLETE
  // ============================================

  completeLesson(lessonId: number): Observable<string> {

    return this.http.post(
      `${this.progressApiUrl}/${lessonId}/video-complete`,
      {},
      {
        responseType: 'text'
      }
    );

  }

}