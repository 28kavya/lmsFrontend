import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quizDto';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { QuizResult } from '../models/quizresult';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private http: HttpClient) { }
  private progressApi = environment.apiUrl+"/progress";
  
 
  addProgress(lessonId: number): Observable<any> {

  return this.http.post(
    `${this.progressApi}/${lessonId}/video-complete`,null);
  

}

}
