import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lesson } from '../../models/lessonDto';
import { InstructorService } from '../../services/Instructor.service';
import { Course } from '../../models/courseDto';
import { LessonService } from '../../services/lesson.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quizzes.html',
  styleUrls: ['./quizzes.css']
})
export class Quizzes {
  courses: Course[] = [];
lessons: Lesson[] = [];

selectedCourse = 0;
selectedLesson = 0;

  lesson = '';
  question = '';

  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';

  correctAnswer = '';

  quizList: any[] = [];
  constructor(private instrutorService:InstructorService,private lessonService:LessonService,private quizservice:QuizService){};
  ngOnInit(){
    this.loadCourses();
  }

  addQuestion() {

  const question = {

    questionText: this.question,

    optionA: this.optionA,

    optionB: this.optionB,

    optionC: this.optionC,

    optionD: this.optionD,

    correctAnswer: this.correctAnswer

  };

  this.quizList.push(question);

  // Clear form

  this.question = '';
  this.optionA = '';
  this.optionB = '';
  this.optionC = '';
  this.optionD = '';
  this.correctAnswer = '';

  alert("Question Added");
}
  loadCourses() {

    this.instrutorService.getMyCourses().subscribe({

        next:(res)=>{

            this.courses= res;

        }

    });
  }
onCourseChange() {

    this.lessonService.getLessons(this.selectedCourse)
        .subscribe({

            next:(res)=>{

                this.lessons = res;

            }

        });

}
submitQuiz() {

  if (this.selectedLesson == 0) {
    alert("Please select a lesson");
    return;
  }

  if (this.quizList.length === 0) {
    alert("Please add at least one question");
    return;
  }

  const quiz = {
    questions: this.quizList
  };

  this.quizservice.addQuiz(this.selectedLesson, quiz)
    .subscribe({

      next: (res) => {

        alert("✅ Quiz submitted successfully!");

        this.quizList = [];

      },

      error: (err) => {

        console.error(err);

        alert("❌ Failed to submit quiz.");

      }

    });

}
  // Delete Question

deleteQuestion(index: number) {

  this.quizList.splice(index, 1);

}

  // Edit Question
editIndex: number = -1;

editQuestion(index: number) {

  this.editIndex = index;

}

  // Save Question

  saveQuestion(lessonIndex: number, questionIndex: number) {

    this.quizList[lessonIndex]
      .questions[questionIndex]
      .editing = false;

  }

}