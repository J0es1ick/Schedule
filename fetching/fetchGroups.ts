import { load } from "cheerio";
import { getPageContent } from "../helpers/getPageContent";
import { IGroup } from "../models";

export async function fetchGroups(url: string): Promise<{
  groups: IGroup[];
}> {
  const html = await getPageContent(url);
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

  return { groups };
}
