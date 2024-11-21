import puppeteer, { Page } from "puppeteer";
import { getSelectorInfo } from "./getSelectorInfo";

export async function getPageContent(
  url: string,
  groupValue: string,
  courseValue: string,
  facultyValue: string
): Promise<string> {
  const groupSelector: string = `select[name="ctl00$ContentPlaceHolder1$ddlObjectValue"]`;
  const courseSelector: string = `select[name="ctl00$ContentPlaceHolder1$ddlCorse"]`;
  const facultySelector: string = `select[name="ctl00$ContentPlaceHolder1$ddlSubDivision"]`;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    if (groupValue !== "") {
      await getSelectorInfo(page, groupValue, groupSelector);
    }
    if (facultyValue !== "") {
      await getSelectorInfo(page, facultyValue, facultySelector);
    }
    if (courseValue !== "") {
      await getSelectorInfo(page, courseValue, courseSelector);
    }
    const content = await page.content();
    browser.close();

    return content;
  } catch (err) {
    throw err;
  }
}
