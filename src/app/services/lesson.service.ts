import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../models/lessonDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = environment.apiUrl+'/course';

  constructor(private http: HttpClient) { }
  //get all lessons
    getLessons(courseId:number):Observable<Lesson[]>{
  
        return this.http.get<Lesson[]>(
        `${this.apiUrl}/getlesson/${courseId}`);
  
    }
//mark as complete function 
      completeLesson(lessonId: number): Observable<string> {

  return this.http.post(
    `http://localhost:8081/progress/${lessonId}/video-complete`,
    {},
    {
      responseType: 'text'
    }
  );

}
}
