import { Day } from "../../api";

export const parseDateTime = (dateStr: Day, timeStr: string) => {
  // the hour to consider the start of the next day
  // shows run after midnight but are still considered
  // shows for the previous day
  // we shouldn't expect shows after 4:00 AM but it would be pretty awesome if there was
  const dayEndHour = 4;

  switch (dateStr) {
  }

  const date = getDate(dateStr);

  // Parse the time string into hours and minutes
  let [hours, minutes] = timeStr.split(":").map((str) => parseInt(str.trim()));
  const isPM = timeStr.includes("PM");

  // Adjust the hours if the time is in PM
  if (isPM && hours < 12) {
    hours += 12;
  }

  if (hours < dayEndHour) {
    date.setDate(date.getDate() + 1);
  }

  // Set the hours and minutes on the date object
  date.setHours(hours, minutes);

  return date;
};

const getDate = (dateStr: Day) => {
  //TODO: Get date should be dynamic
  const date = new Date(import.meta.env.VITE_EVENT_START_DATE);
  let offset = 0;
  switch (dateStr) {
    case "Mon":
      // do nothing
      break;
    case "Tue":
      offset = 1;
      break;
    case "Wed":
      offset = 2;
      break;
    case "Thu":
      offset = 3;
      break;
    case "Fri":
      offset = 4;
      break;
    case "Sat":
      offset = 5;
      break;
    case "Sun":
      offset = 6;
      break;
  }
  date.setDate(date.getDate() + offset);
  return date;
};
