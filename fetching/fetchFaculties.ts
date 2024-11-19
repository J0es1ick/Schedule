import { load } from "cheerio";
import { IFaculty } from "../models";

export async function fetchFaculties(html: string): Promise<IFaculty[]> {
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
