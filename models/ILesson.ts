import { ICourse } from "./ICourse";
import { IFaculty } from "./IFaculty";
import { IGroup } from "./IGroup";

export interface ILesson {
  //faculty: IFaculty;

  //course: ICourse;

  //group: IGroup;

  //Название предмета
  subject: string;

  //Тип предмета (сем || лек || лаб)
  type: string;

  //Фамилия и инициалы преподавателя
  teacher: string;

  //Аудитория проводимого предмета
  room: string;

  //Время проведения пары
  time: {
    //Время начала пары
    start: string;

    //Время конца пары
    end: string;
  };

  //День проведения пары
  day: string;

  //1 или 2 неделя
  week: number;
}
