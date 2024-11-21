import { load } from "cheerio";
import { getPageContent } from "../helpers/getPageContent";
import { removeLessonWithSubject } from "../helpers/removeLessonWithSubject";
import { ICourse, IFaculty, IGroup, ILesson } from "../models";
import { fetchCourses } from "./fetchCourses";
import { fetchFaculties } from "./fetchFaculties";
import { fetchGroups } from "./fetchGroups";

export async function fetchSchedule(
  url: string,
  groupValue: string = "",
  courseValue: string = "",
  facultyValue: string = ""
): Promise<ILesson[]> {
  const html = await getPageContent(url, groupValue, courseValue, facultyValue);
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

  removeLessonWithSubject(lessons, "");
  return lessons;
}
