import { Page } from "puppeteer";

export async function getSelectorInfo(
  page: Page,
  optionValue: string,
  selectorValue: string
) {
  try {
    const selector = selectorValue;
    await page.click(selector);

    await page.select(selector, optionValue);
    await page.waitForSelector("#someElementThatAppearsAfterSelection", {
      timeout: 2000,
    });
  } catch (error) {
    console.error(`Error selecting option ${optionValue}:`, error);
  }
}
