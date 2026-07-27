import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quizDto';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { QuizResult } from '../models/quizresult';

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
  addQuiz(lessonId: number, quiz: any): Observable<any> {

  return this.http.post(
    `${this.quizApi}/lesson/${lessonId}`,
    quiz
  );

}

submitQuiz(quizId: number, answers: any) {

  const request = {
    quizId: quizId,
    answers: Object.keys(answers).map(key => ({
      questionId: Number(key),
      selectedAnswer: answers[key]
    }))
  };

  console.log(request);

  return this.http.post<QuizResult>(
    `${environment.apiUrl}/quizsanswer/submit`,
    request
  );
}

}
