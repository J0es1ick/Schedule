import { load } from "cheerio";
import { IGroup } from "../models";

export async function fetchGroups(html: string): Promise<IGroup[]> {
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
