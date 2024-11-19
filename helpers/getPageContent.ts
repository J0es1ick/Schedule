import puppeteer, { Page } from "puppeteer";

export async function getPageContent(
  url: string,
  groupValue: string,
  courseValue: string,
  facultyValue: string
): Promise<string> {
  async function getGroup(page: Page, optionValue: string) {
    try {
      const selector = `select[name="ctl00$ContentPlaceHolder1$ddlObjectValue"]`;
      await page.click(selector);

      await page.select(selector, optionValue);
      await page.waitForSelector("#someElementThatAppearsAfterSelection", {
        timeout: 2000,
      });
    } catch (error) {
      console.error(`Error selecting option ${optionValue}:`, error);
    }
  }

  async function getCourse(page: Page, optionValue: string) {
    try {
      const selector = `select[name="ctl00$ContentPlaceHolder1$ddlCorse"]`;
      await page.click(selector);

      await page.select(selector, optionValue);
      await page.waitForSelector("#someElementThatAppearsAfterSelection", {
        timeout: 2000,
      });
    } catch (error) {
      console.error(`Error selecting option ${optionValue}:`, error);
    }
  }

  async function getFaculty(page: Page, optionValue: string) {
    try {
      const selector = `select[name="ctl00$ContentPlaceHolder1$ddlSubDivision"]`;
      await page.click(selector);

      await page.select(selector, optionValue);
      await page.waitForSelector("#someElementThatAppearsAfterSelection", {
        timeout: 2000,
      });
    } catch (error) {
      console.error(`Error selecting option ${optionValue}:`, error);
    }
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await getFaculty(page, facultyValue);
    await getCourse(page, courseValue);
    await getGroup(page, groupValue);
    const content = await page.content();
    browser.close();

    return content;
  } catch (err) {
    throw err;
  }
}
