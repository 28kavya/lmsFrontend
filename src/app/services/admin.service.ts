import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/getuser`);
  }
 //add instructor
  addInstructor(instructor: any): Observable<any> {
    return this.http.post(
         `${this.apiUrl}/auth/addInstructor`,
      instructor
    );
  }

    //dashboard component
    getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/dashboard`);
  }
//add a course
addCourse(course:any){
  return this.http.post(
    "http://localhost:8081/api/course/courses",
    course
  );
}
//get all instructors
getAllInstructors(){
  return this.http.get<any[]>(
    "http://localhost:8081/api/course/instructors"
  );
}

//delete instructor
deleteInstructor(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/instructor/delete/${id}`,
    { responseType: 'text' }
  );

  }
}
