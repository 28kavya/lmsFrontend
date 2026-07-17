import { Question } from "./questionDto";

export interface Quiz {

  id: number;
  title: string;
  questions: Question[];

}