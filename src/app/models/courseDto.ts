import { Instructor } from "./Instructor";

export interface Course{

    id:number;
    title:string;
    description:string;
    instructorId:number;
    students?:number;
    price:number;
    instructor:string;
}