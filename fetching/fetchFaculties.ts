import { load } from "cheerio";
import { getPageContent } from "../helpers/getPageContent";
import { IFaculty } from "../models";

export async function fetchFaculties(url: string): Promise<{
  faculties: IFaculty[];
}> {
  const html = await getPageContent(url);
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

  return { faculties };
}
