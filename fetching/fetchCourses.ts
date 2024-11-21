import { load } from "cheerio";
import { ICourse } from "../models";
import { getPageContent } from "../helpers/getPageContent";

export async function fetchCourses(
  url: string,
  groupValue: string = "",
  courseValue: string = "",
  facultyValue: string = ""
): Promise<ICourse[]> {
  const html = await getPageContent(url, groupValue, courseValue, facultyValue);
  const $ = load(html);

  const courses: ICourse[] = [];

  $('select[name="ctl00$ContentPlaceHolder1$ddlCorse"] option').each(
    (i, el) => {
      courses.push({
        name: $(el).attr("value") || "",
      });
    }
  );

  return courses;
}
