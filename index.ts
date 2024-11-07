import axios from "axios";
import { load } from "cheerio";
import { getPageContent } from "./helpers/getPageContent";
import { ICourse } from "./models/ICourse";
import { IGroup } from "./models/IGroup";
import { IFaculty } from "./models/IFaculty";
import { ILesson } from "./models/ILesson";

const BASE_URL = "http://schedule.ispu.ru/";

function removeItemsWithName(lessons: ILesson[], subject: string): void {
  for (let i = 0; i < lessons.length; i++) {
    if (lessons[i].subject === subject) {
      lessons.splice(i--, 1);
    }
  }
}

async function fetchCoursesAndGroups(): Promise<{
  courses: ICourse[];
  groups: IGroup[];
  faculties: IFaculty[];
}> {
  const html = await getPageContent(BASE_URL);
  const $ = load(html);

  const courses: ICourse[] = [];
  const groups: IGroup[] = [];
  const faculties: IFaculty[] = [];

  $('select[name="ctl00$ContentPlaceHolder1$ddlCorse"] option').each(
    (i, el) => {
      courses.push({
        name: $(el).attr("value") || "",
      });
    }
  );

  $('select[name="ctl00$ContentPlaceHolder1$ddlObjectValue"] option').each(
    (i, el) => {
      groups.push({
        sequenceNumber: $(el).attr("value") || "",
        name: $(el).text(),
      });
    }
  );

  $('select[name="ctl00$ContentPlaceHolder1$ddlSubDivision"] option').each(
    (i, el) => {
      faculties.push({
        sequenceNumber: $(el).attr("value") || "",
        name: $(el).text(),
      });
    }
  );

  return { courses, groups, faculties };
}

async function fetchSchedule(): Promise<ILesson[]> {
  const html = await getPageContent(BASE_URL);
  const $ = load(html);

  const lessons: ILesson[] = [];
  let currentTime: { start: string; end: string } | null = null;
  let currentDayIndex = 0;
  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  let currentWeek: number = 1;

  $("tr[height='30']").each((i, el) => {
    if ($("tr[height='30']").length / 2 <= i) {
      currentWeek = 2;
    }

    const timeElement = $(el).find('td[width="80px"]');

    if (timeElement.length > 0) {
      const timeText = timeElement.text().trim();
      const rgx = new RegExp(
        [/^\d+(\.\d+)?-\d+(\.\d+)?$/, /\d+\.\d+ - \d+\.\d+/]
          .map(function (r) {
            return (r + "").replace(/\//g, "");
          })
          .join("|"),
        "g"
      );
      if (timeText.match(rgx)) {
        const timeParts = timeText.split("-");
        currentTime = { start: timeParts[0], end: timeParts[1] };
      }
    }

    $(el)
      .find('td[rowspan="1"]')
      .each((j, lessonEl) => {
        const lessonString: string = $(lessonEl).text().trim();
        if (currentTime) {
          const parts: string[] = lessonString.split(/\s+/);
          if (parts.length < 4) {
            lessons.push({
              subject: "",
              type: "",
              teacher: "",
              room: "",
              time: currentTime,
              day: daysOfWeek[currentDayIndex],
              week: currentWeek,
            });
          }
          const room: string = parts.pop()!;
          let teacherLastName: string;
          let teacherFirstName: string;
          if (parts.includes("XX")) {
            teacherLastName = parts.pop()!;
            teacherFirstName = "";
          } else {
            teacherLastName = parts.pop()!;
            teacherFirstName = parts.pop()!;
          }
          const type: string = parts.pop()!;
          const teacher: string = `${teacherFirstName} ${teacherLastName}`;
          const subject: string = parts.join(" ");

          lessons.push({
            subject,
            type,
            teacher,
            room,
            time: currentTime,
            day: daysOfWeek[currentDayIndex],
            week: currentWeek,
          });

          currentDayIndex = (currentDayIndex + 1) % 7;
        }
      });
  });

  removeItemsWithName(lessons, "");
  return lessons;
}

fetchCoursesAndGroups().then((result) => {
  console.log(result);
});

fetchSchedule().then((result) => {
  console.log(result);
});
