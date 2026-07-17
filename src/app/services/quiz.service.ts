import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quizDto';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }
  private quizApi = environment.apiUrl+"/quiz";
  
  getQuizzes(lessonId: number): Observable<Quiz[]> {
  
    return this.http.get<Quiz[]>(
      `${this.quizApi}/lesson/${lessonId}`
    );
  
  }

}
