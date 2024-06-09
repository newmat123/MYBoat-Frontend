import axios from "axios";
import { CapacitorWifiConnect } from "@falconeta/capacitor-wifi-connect";

var url_ = process.env.REACT_APP_TEST_URL; //REACT_APP_EXSPRESS_BACKEND;
var autoConnect = true;

const updateConnection = async () => {
  autoConnect = false;
  if (process.env.REACT_APP_SOFT_AP_SSID === undefined) {
    throw new Error("REACT_APP_SOFT_AP_SSID is not defined in .env.local");
  }

  // if ((await CapacitorWifiConnect.getAppSSID()).status === 0) {
  //   url_ = process.env.REACT_APP_SOFT_AP;
  //   return;
  // }
  const currentSsid = await CapacitorWifiConnect.getDeviceSSID(); // Maybe getAppSSID
  if (currentSsid.value === process.env.REACT_APP_SOFT_AP_SSID) {
    url_ = process.env.REACT_APP_SOFT_AP;
    return;
  }

  const ssid = await CapacitorWifiConnect.getSSIDs();
  if (!ssid.value.includes(process.env.REACT_APP_SOFT_AP_SSID)) {
    url_ = process.env.REACT_APP_TEST_URL; //REACT_APP_EXSPRESS_BACKEND;
    return;
  }

  if (process.env.REACT_APP_SOFT_AP_PASSWORD === undefined) {
    throw new Error("REACT_APP_SOFT_AP_PASSWORD is not defined in .env.local");
  }

  CapacitorWifiConnect.connect({
    ssid: process.env.REACT_APP_SOFT_AP_SSID,
    saveNetwork: true,
  }).then((res) => {
    if (res.value === 0) {
      url_ = process.env.REACT_APP_SOFT_AP_SSID;
    }
  });
  // CapacitorWifiConnect.secureConnect({
  //   ssid: process.env.REACT_APP_SOFT_AP_SSID,
  //   password: process.env.REACT_APP_SOFT_AP_PASSWORD,
  //   saveNetwork: true,
  // }).then((res) => {
  //   if (res.value === 0) {
  //     url_ = process.env.REACT_APP_SOFT_AP_SSID;
  //   }
  // });
};

export const serverApi = () => {
  autoConnect && updateConnection();
  console.log("url: " + url_);
  return axios.create({
    baseURL: url_,
  });
};

// process.env.REACT_APP_EXSPRESS_BACKEND
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
serverApi().interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
