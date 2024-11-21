import { load } from "cheerio";
import { IFaculty } from "../models";
import { getPageContent } from "../helpers/getPageContent";

export async function fetchFaculties(
  url: string,
  groupValue: string = "",
  courseValue: string = "",
  facultyValue: string = ""
): Promise<IFaculty[]> {
  const html = await getPageContent(url, groupValue, courseValue, facultyValue);
  const $ = load(html);

  const faculties: IFaculty[] = [];

  $('select[name="ctl00$ContentPlaceHolder1$ddlSubDivision"] option').each(
    (i, el) => {
      faculties.push({
        sequenceNumber: $(el).attr("value") || "",
        name: $(el).text(),
      });
    }
  );

  return faculties;
}
