import { Question } from "./questionDto";

export interface Quiz {

  id: number;
  title: string;
  quizTitle:string;
  questions: Question[];

}