import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quizzes.html',
  styleUrls: ['./quizzes.css']
})
export class Quizzes {

  lesson = '';
  question = '';

  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';

  correctAnswer = '';

  quizList: any[] = [];

  addQuestion() {

    if (
      !this.lesson ||
      !this.question ||
      !this.optionA ||
      !this.optionB ||
      !this.optionC ||
      !this.optionD ||
      !this.correctAnswer
    ) {
      alert("Please fill all fields");
      return;
    }

    const newQuestion = {

      question: this.question,

      optionA: this.optionA,
      optionB: this.optionB,
      optionC: this.optionC,
      optionD: this.optionD,

      answer: this.correctAnswer,

      editing: false

    };

    const lessonExists = this.quizList.find(
      x => x.lesson === this.lesson
    );

    if (lessonExists) {

      lessonExists.questions.push(newQuestion);

    } else {

      this.quizList.push({

        lesson: this.lesson,

        questions: [newQuestion]

      });

    }

    // Clear inputs

    this.lesson = '';
    this.question = '';

    this.optionA = '';
    this.optionB = '';
    this.optionC = '';
    this.optionD = '';

    this.correctAnswer = '';

  }

  // Delete Question

  deleteQuestion(lessonIndex: number, questionIndex: number) {

    this.quizList[lessonIndex]
      .questions
      .splice(questionIndex, 1);

    // Remove lesson if no questions left
    if (this.quizList[lessonIndex].questions.length === 0) {

      this.quizList.splice(lessonIndex, 1);

    }

  }

  // Edit Question

  editQuestion(lessonIndex: number, questionIndex: number) {

    this.quizList[lessonIndex]
      .questions[questionIndex]
      .editing = true;

  }

  // Save Question

  saveQuestion(lessonIndex: number, questionIndex: number) {

    this.quizList[lessonIndex]
      .questions[questionIndex]
      .editing = false;

  }

}