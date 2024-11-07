import { ILesson } from "../models/ILesson";

export function removeLessonWithSubject(
  lessons: ILesson[],
  subject: string
): void {
  for (let i = 0; i < lessons.length; i++) {
    if (lessons[i].subject === subject) {
      lessons.splice(i--, 1);
    }
  }
}
