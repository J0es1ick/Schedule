import { load } from "cheerio";
import { getPageContent } from "../helpers/getPageContent";
import { ICourse } from "../models";

export async function fetchCourses(url: string): Promise<{
  courses: ICourse[];
}> {
  const html = await getPageContent(url);
  const $ = load(html);

  const courses: ICourse[] = [];

  $('select[name="ctl00$ContentPlaceHolder1$ddlCorse"] option').each(
    (i, el) => {
      courses.push({
        name: $(el).attr("value") || "",
      });
    }
  );

  return { courses };
}
