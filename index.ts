import "dotenv/config";

import { load } from "cheerio";
import { getScheduleJSON } from "./helpers/getScheduleJSON";

const BASE_URL = process.env.BASE_URL;

getScheduleJSON(BASE_URL!).catch((error) => {
  console.error("An error occurred:", error);
});
