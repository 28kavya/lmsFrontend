import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/courseDto';
import { Observable } from 'rxjs';
import { Instructor } from '../models/Instructor';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = environment.apiUrl + '/course';

  constructor(private http: HttpClient) {}

  //get all courses
  getAllCourses() {
    return this.http.get<Course[]>('http://localhost:8081/api/course/getall');
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(
      `http://localhost:8081/api/course/deletecourse/${id}`,
      { responseType: 'text' },
    );
  }
  editCourse(id: number, course: Course) {
    return this.http.put<Course>(
      `http://localhost:8081/api/course/updatecourse/${id}`,
      course,
    );
  }

  getCourseById(id: number) {
    return this.http.get<Course>(
      `http://localhost:8081/api/course/getcourse/${id}`,
    );
  }

  getAllInstructor():Observable<Instructor[]>
  {
     return this.http.get<Instructor[]>(
      `http://localhost:8081/api/course/instructors`,
    );
  }
}
