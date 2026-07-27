import { DomSanitizer,SafeResourceUrl } from "@angular/platform-browser";
export interface Lesson {

  id?: number;

  title?: string;
  videoUrl: string;
 safeVideoUrl?: SafeResourceUrl;
 lessonName?:string;
  courseId: number;
   description?: string;
   lessonOrder:number;
}