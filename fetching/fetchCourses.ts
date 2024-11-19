import { load } from "cheerio";
import { ICourse } from "../models";

export async function fetchCourses(html: string): Promise<ICourse[]> {
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
