import { Routes } from '@angular/router';
import { StudentLayout } from './student/student-layout.component';
import { StudentDashboard } from './student/dashboard/dashboard.component';
import { ExploreCoursesComponent } from './student/explore-courses/explore-courses.component';
import { MyCoursesComponent } from './student/my-courses/my-courses.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing/landing.component';
import { LessonComponent } from './student/lesson/lesson.component';
import { AdminLayout } from './admin/admin-layout/admin-layout';

import { Courses } from './admin/courses/courses';
import { StudentsComponent } from './admin/students/students';
import { Instructors } from './admin/instructors/instructors';
import { Settings } from './admin/settings/settings';
import { Instructor } from './instructor/instructor';
import { Quizzes } from './instructor/quizzes/quizzes';
import { CreateLessonComponent } from './instructor/create-course/lessons';
import { Analytics } from './instructor/analytics/analytics';
import { InstructorDashboard } from './instructor/dashboard/dashboard';
import { AdminDashboard } from './admin/dashboard/dashboard';
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';
import { AddCourse } from './admin/courses/add-course/add-course';
import { AddInstructor } from './admin/instructors/add-instructor/add-instructor';
import { EditCourseComponent } from './admin/courses/edit-course/edit-course';
import { Students } from './instructor/students/students';
import { CertificatesComponent } from './student/certificate/certificate.component';

export const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Student
  {
    path: 'student',
    component: StudentLayout,
    canActivate: [authGuard, roleGuard],
    data: { role: 'STUDENT' },
    children: [
      { path: 'dashboard', component: StudentDashboard },
      { path: 'explore-courses', component: ExploreCoursesComponent },
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'lesson/:courseId', component: LessonComponent },
      {path:'certificates',component:CertificatesComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Admin
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: 'dashboard', component:AdminDashboard },
         { path: 'courses', component: Courses },
    { path: 'courses/add', component: AddCourse },
    {path: 'courses/edit/:id',component: EditCourseComponent},
      { path: 'students', component: StudentsComponent },
      { path: 'instructors', component: Instructors },
        { path: 'instructors/add', component: AddInstructor },
      { path: 'settings', component: Settings },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Instructor
  {
    path: 'instructor',
    component: Instructor,
    canActivate: [authGuard, roleGuard],
    data: { role: 'INSTRUCTOR' },
    children: [
      { path: 'dashboard', component: InstructorDashboard },
      { path: 'create-course', component: CreateLessonComponent },
      { path: 'students', component: Students },
      { path: 'quizzes', component: Quizzes },
      { path: 'analytics', component: Analytics },
      { path: 'settings', component: Settings },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'landing' }

];