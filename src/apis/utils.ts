import { environmentByDays_, environment_ } from "../shared/types/shared.types";

const getDay = (str: string | undefined) => {
  return str !== undefined ? str.split("-")[2].split("T")[0] : "null";
};

export const splitByDays = (data: environment_, daysToGet = 3) => {
  if (data === undefined) {
    return undefined;
  }
  var days: environmentByDays_ = [];
  var day = getDay(data[0].timestamp); //first day
  let j = 0;

  for (let i = 0; i < daysToGet; i++) {
    while (j < data.length && day === getDay(data[j]?.timestamp)) {
      if (!days[i]) {
        days[i] = [data[j]];
      } else {
        days[i].push(data[j]);
      }
      j++;
    }
    day = getDay(data[j]?.timestamp);
  }

  return days;
};
