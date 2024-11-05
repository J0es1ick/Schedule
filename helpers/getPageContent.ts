import puppeteer from "puppeteer";

export async function getPageContent(url: string): Promise<string> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    browser.close();

    return content;
  } catch (err) {
    throw err;
  }
}
