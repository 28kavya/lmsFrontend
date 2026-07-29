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

submitQuiz(
  quizId: number,
  answers: { [key: string]: string }
) {
  const answerList = Object.entries(answers).map(
    ([questionId, selectedAnswer]) => ({
      questionId: Number(questionId),
      selectedAnswer: selectedAnswer
    })
  );

  const request = {
    quizId: quizId,
    answers: answerList
  };

  console.log('Final request:', request);

  return this.http.post<QuizResult>(
    'http://localhost:8081/api/quizsanswer/submit',
    request
  );
}
}
