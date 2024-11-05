export interface Lesson {
  //Включает название предмета, преподавателя и аудиторию (временно)
  name: string;

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
