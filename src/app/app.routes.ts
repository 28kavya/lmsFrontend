import { Routes } from '@angular/router';
import { StudentLayout } from './student/student-layout/student-layout.component';
import { StudentDashboard } from './student/dashboard/dashboard.component';
import { ExploreCoursesComponent } from './student/explore-courses/explore-courses.component';
import { MyCoursesComponent } from './student/my-courses/my-courses.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing/landing.component';
import { LessonComponent } from './student/lesson/lesson.component';
import { QuizComponent } from './student/quiz/quiz.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },

  { path: 'login', component: LoginComponent
   },

  { path: 'register', component: RegisterComponent },
    {
path:'student',

component:StudentLayout,

children:[

{
path:'dashboard',
component:StudentDashboard
},

{
path:'explore-courses',
component:ExploreCoursesComponent
},

{
path:'my-courses',
component:MyCoursesComponent
},
{
  path: 'lesson/:courseId',
  component: LessonComponent
},
{
   path:'quiz/:lessonId',
   component: QuizComponent
},
{
path:'',
redirectTo:'dashboard',
pathMatch:'full'
}]
    }
];
