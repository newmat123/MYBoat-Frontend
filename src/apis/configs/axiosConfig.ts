import axios from "axios";

export const serverApi = axios.create({
  baseURL: process.env.REACT_APP_EXSPRESS_BACKEND,
});
// REACT_APP_EXSPRESS_BACKEND

// defining a custom error handler for all APIs
const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
serverApi.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
