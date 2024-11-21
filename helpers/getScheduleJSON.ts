import fs from "fs";

import {
  fetchFaculties,
  fetchCourses,
  fetchGroups,
  fetchSchedule,
} from "../fetching";

export async function getScheduleJSON(
  url: string,
  groupValue: string = "",
  courseValue: string = "",
  facultyValue: string = ""
): Promise<{
  jsonScheduleString: string;
  jsonFacultiesString: string;
  jsonCoursesString: string;
  jsonGroupsString: string;
}> {
  const facultiesData = await fetchFaculties(
    url,
    groupValue,
    courseValue,
    facultyValue
  );
  const coursesDataPromises = facultiesData.map(async (arrItem) => {
    return await fetchCourses(
      url,
      groupValue,
      courseValue,
      arrItem.sequenceNumber
    );
  });
  const coursesData = await Promise.all(coursesDataPromises);
  const groupsData = await fetchGroups(
    url,
    groupValue,
    courseValue,
    facultyValue
  );
  const scheduleData = await fetchSchedule(
    url,
    groupValue,
    courseValue,
    facultyValue
  );

  const jsonScheduleString = JSON.stringify(scheduleData, null, 2);
  const jsonFacultiesString = JSON.stringify(facultiesData, null, 2);
  const jsonCoursesString = JSON.stringify(coursesData, null, 2);
  const jsonGroupsString = JSON.stringify(groupsData, null, 2);
  try {
    fs.writeFileSync("schedule.json", jsonScheduleString);
    fs.writeFileSync("faculties.json", jsonFacultiesString);
    fs.writeFileSync("courses.json", jsonCoursesString);
    fs.writeFileSync("groups.json", jsonGroupsString);
    console.log("JSON files written successfully!");
    return {
      jsonScheduleString,
      jsonFacultiesString,
      jsonCoursesString,
      jsonGroupsString,
    };
  } catch (err) {
    console.error("Error writing JSON files:", err);
    throw err;
  }
}
