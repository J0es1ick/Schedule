import axios from "axios";
import { load } from "cheerio";
import { getPageContent } from "./helpers/getPageContent";
import { Course } from "./models/course";
import { Group } from "./models/group";
import { Lesson } from "./models/lesson";

const BASE_URL = "http://schedule.ispu.ru/";

async function fetchCoursesAndGroups(): Promise<{
  courses: Course[];
  groups: Group[];
}> {
  const html = await getPageContent(BASE_URL);
  const $ = load(html);

  const courses: Course[] = [];
  const groups: Group[] = [];

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

  return { courses, groups };
}

async function fetchSchedule(): Promise<Lesson[]> {
  const html = await getPageContent(BASE_URL);
  const $ = load(html);

  const lessons: Lesson[] = [];

  return lessons;
}

fetchCoursesAndGroups().then((result) => {
  console.log(result);
});
