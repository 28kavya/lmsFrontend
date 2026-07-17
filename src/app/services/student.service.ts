import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { StudentDashboardDTO } from '../models/studentDashboardDto';
import { Course } from '../models/courseDto';
import { Lesson } from '../models/lessonDto';
import { Quiz } from '../models/quizDto';
import { User } from '../models/User';



@Injectable({
  providedIn: 'root',
})
export class StudentDashboardService {

  private apiUrl = environment.apiUrl+'/student/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<StudentDashboardDTO> {
    return this.http.get<StudentDashboardDTO>(this.apiUrl);
  }
  getMyCourses() {
    return this.http.get<Course[]>('http://localhost:8081/api/student/my-courses');
  }

  //for name 
   private nameSource = new BehaviorSubject<string>('');

  studentName$ = this.nameSource.asObservable();

  setStudentName(name: string) {
    this.nameSource.next(name);
  }
enrollCourse(courseId: number) {
  return this.http.post(
    `http://localhost:8081/api/enroll/${courseId}`,
    {}
  );
}

 private api="http://localhost:8081/api/lesson";



  completeLesson(lessonId: number): Observable<string> {

  return this.http.post(
    `http://localhost:8081/progress/${lessonId}/video-complete`,
    {},
    {
      responseType: 'text'
    }
  );

}

private quizApi = "http://localhost:8081/api/quiz";

getQuizzes(lessonId: number): Observable<Quiz[]> {

  return this.http.get<Quiz[]>(
    `${this.quizApi}/lesson/${lessonId}`
  );

}getAllStudents(): Observable<User[]> {
  return this.http.get<User[]>(`${environment.apiUrl}/course/studentsenrollments`);
}
// submitQuiz() {

//   console.log(this.answers);

//   this.service.submitQuiz(this.quiz.id, this.answers)
//       .subscribe({

//         next: (res) => {

//           console.log("Quiz Result:", res);

//           this.result = res;
//           this.submitted = true;

//         },

//         error: (err) => {

//           console.error(err);

//         }

//       });

// }
}

