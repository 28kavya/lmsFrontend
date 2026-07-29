import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/courseDto';
import { Lesson } from '../models/lessonDto';

import { InstructorStudent } from '../models/instructor-student';
@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private api="http://localhost:8081/api";

  constructor(private http:HttpClient){}

  getMyCourses(){

    return this.http.get<Course[]>(`${this.api}/instructor/my-courses`);

  }

  createLesson(data:Lesson){

    return this.http.post(`${this.api}/lesson/create`,data);

  }

  getStudents() {
  return this.http.get<InstructorStudent[]>(
    "http://localhost:8081/api/instructor/students"
  );
}

}