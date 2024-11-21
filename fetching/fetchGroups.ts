import { load } from "cheerio";
import { IGroup } from "../models";
import { getPageContent } from "../helpers/getPageContent";

export async function fetchGroups(
  url: string,
  groupValue: string = "",
  courseValue: string = "",
  facultyValue: string = ""
): Promise<IGroup[]> {
  const html = await getPageContent(url, groupValue, courseValue, facultyValue);
  const $ = load(html);

  const groups: IGroup[] = [];

  $('select[name="ctl00$ContentPlaceHolder1$ddlObjectValue"] option').each(
    (i, el) => {
      groups.push({
        sequenceNumber: $(el).attr("value") || "",
        name: $(el).text(),
      });
    }
  );

  return groups;
}
