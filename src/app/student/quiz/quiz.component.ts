import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  StudentDashboardService,
  Quiz,
  QuizResult
} from '../student.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  lessonId!: number;

  quiz!: Quiz;

  answers: { [key: number]: string } = {};
result: QuizResult = {
  totalQuestions: 0,
  correctAnswers: 0,
  percentage: 0,
  passed: false
};

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private service: StudentDashboardService
  ) {}

  ngOnInit(): void {

    this.lessonId = Number(
      this.route.snapshot.paramMap.get('lessonId')
    );

   this.service.getQuizzes(this.lessonId).subscribe({

  next: (quizzes) => {

    console.log("Quiz Response:", quizzes);

    this.quiz = quizzes[0];

    console.log("Questions:", this.quiz.questions);

  }

});

  }

  choose(questionId: number, answer: string): void {

    this.answers[questionId] = answer;

  }

//   submitQuiz(): void {

//     this.service.submitQuiz(
//       this.quiz.id,
//       this.answers
//     ).subscribe({

//    next: (res: QuizResult) => {

//   this.result = res;
//   this.submitted = true;

// },

//       error: (err) => {

//         console.error(err);

//       }

//     });

//   }

}