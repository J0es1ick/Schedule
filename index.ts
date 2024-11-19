import "dotenv/config";

import fs from "fs";
import { load } from "cheerio";
import { getPageContent } from "./helpers/getPageContent";
import { removeLessonWithSubject } from "./helpers/removeLessonWithSubject";
import { ILesson, IFaculty } from "./models";
import {
  fetchCourses,
  fetchFaculties,
  fetchGroups,
  fetchSchedule,
} from "./fetching";

const BASE_URL = process.env.BASE_URL;

/*fetchCourses(BASE_URL!).then((result) => {
  console.log(result);
});*/

/*async function useFaculties() {
  const groupValue = "ваше_значение_группы";
  const courseValue = "ваше_значение_курса";
  const facultyValue = "ваше_значение_факультета";

  try {
    const { lessons, courses, faculties, groups } = await fetchSchedule(
      BASE_URL!,
      "918",
      "2",
      "30000"
    );

    console.log(lessons);
    console.log(courses);
    console.log(faculties);
    console.log(groups);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

useFaculties();*/

async function getScheduleJSON(
  url: string,
  groupValue: string,
  courseValue: string,
  facultyValue: string
): Promise<string> {
  const scheduleData = await fetchSchedule(
    url,
    groupValue,
    courseValue,
    facultyValue
  );
  const jsonString = JSON.stringify(scheduleData, null, 2);
  return jsonString;
}

getScheduleJSON(BASE_URL!, "918", "2", "30000")
  .then((jsonString) => {
    fs.writeFileSync("data.json", jsonString);
  })
  .catch((error) => {
    console.error("Error fetching schedule:", error);
  });
