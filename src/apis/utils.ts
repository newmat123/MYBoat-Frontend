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

const countDecimals = (num: number) => {
  if (Math.floor(num) === num) return 0;
  try {
    return num.toString().split(".")[1].length;
  } catch {
    return 0;
  }
};

export const roundNumber = (env: environment_) => {
  if (env === undefined) {
    return undefined;
  }
  for (let i = 0; i < env.length; i++) {
    if (countDecimals(env[i].temperature ?? 0) > 2) {
      env[i].temperature = env[i].temperature
        ? Math.round((env[i].temperature ?? 0) * 100) / 100
        : undefined;
    }
    if (countDecimals(env[i].heat ?? 0) > 2) {
      env[i].heat = env[i].heat
        ? Math.round((env[i].heat ?? 0) * 100) / 100
        : undefined;
    }
    if (countDecimals(env[i].humidity ?? 0) > 2) {
      env[i].humidity = env[i].humidity
        ? Math.round((env[i].humidity ?? 0) * 100) / 100
        : undefined;
    }
  }
  return env;
};
