import { environment_ } from "../controllers/pages/main.controller";

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
