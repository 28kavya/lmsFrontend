import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quizDto';
import { QuizResult } from '../../models/quizresult';

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

  result!: QuizResult;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {
    console.log("QuizComponent Loaded");
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('lessonId');

    if (id) {
      this.lessonId = Number(id);
      this.loadQuiz();
    }

  }

  loadQuiz(): void {

    this.quizService.getQuizzes(this.lessonId).subscribe({

      next: (data) => {

        console.log("Quiz:", data);

        if (data.length > 0) {
          this.quiz = data[0];
        }

      },

      error: (err) => {

        console.error("Quiz Error:", err);

      }

    });

  }

  choose(questionId: number, answer: string): void {

    this.answers[questionId] = answer;

  }

submitQuiz(): void {

  console.log("Quiz ID:", this.quiz.id);
  console.log("Answers:", this.answers);

  this.quizService.submitQuiz(this.quiz.id, this.answers).subscribe({

    next: (data) => {

      console.log("Quiz Result:", data);

      this.result = data;       // ✅ Save the response
      this.submitted = true;    // ✅ Show the result card

    },

    error: (err) => {

      console.error("Submit Error:", err);

    }

  });

}

}