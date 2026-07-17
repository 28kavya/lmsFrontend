import { Enrollment } from "./Enrollments";

export interface User {
  id: number;
  name: string;
  email: string;
  role?:string;

  enrollments: Enrollment[];
}