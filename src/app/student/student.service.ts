import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface StudentDashboardDTO {
  
  enrolledCourses: number;
  certificates: number;
  overallProgress: number;
  studentName: string;
}
export interface MyCourse {
  courseId: number;
  title: string;
  instructor: string;
  progress: number;
  description: string;
  price: number;
}
export interface Lesson{

    id:number;

    title:string;

    description:string;

    videoUrl:string;

    lessonOrder:number;

}
// Quiz Interfaces
export interface Question {

  id: number;
  questionText: string;

  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;

  correctAnswer?: string;

}

export interface Quiz {

  id: number;
  title: string;
  questions: Question[];

}

// Result returned after submitting quiz
export interface QuizResult {

  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;

}
@Injectable({
  providedIn: 'root',
})
export class StudentDashboardService {
  private apiUrl = 'http://localhost:8081/api/student/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<StudentDashboardDTO> {
    return this.http.get<StudentDashboardDTO>(this.apiUrl);
  }
  getMyCourses() {
    return this.http.get<MyCourse[]>('http://localhost:8081/api/student/my-courses');
  }

  //for name 
   private nameSource = new BehaviorSubject<string>('');

  studentName$ = this.nameSource.asObservable();

  setStudentName(name: string) {
    this.nameSource.next(name);
  }
//get all courses
  getAllCourses():Observable<MyCourse[]>{

    return this.http.get<MyCourse[]>('http://localhost:8081/api/course/getall');

  }
enrollCourse(courseId: number) {
  return this.http.post(
    `http://localhost:8081/api/enroll/${courseId}`,
    {}
  );
}

 private api="http://localhost:8081/api/lesson";

  getLessons(courseId:number):Observable<Lesson[]>{

      return this.http.get<Lesson[]>(
      `${this.api}/getlesson/${courseId}`);

  }

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

