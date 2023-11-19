import { environmentByDays_ } from "../shared/types/shared.types";
import { serverApi } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";
import { splitByDays } from "./utils";

export const ServerAPI = {
  getEnvironment: async function (cancel = false) {
    try {
      const response = await serverApi.request({
        url: "/environment",
        method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel
          ? cancelApiObject[
              this.getEnvironment.name
            ].handleRequestCancellation().signal
          : undefined,
      });
      // returning the product returned by the API
      const days: environmentByDays_ = splitByDays(response.data);
      return days;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getTemperature: async function (take = 24, cancel = false) {
    try {
      const response = await serverApi.request({
        url: `/temperature?take=${take}`,
        method: "GET",
        signal: cancel
          ? cancelApiObject[
              this.getTemperature.name
            ].handleRequestCancellation().signal
          : undefined,
      });
      const days: environmentByDays_ = splitByDays(response.data);
      return days;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getHeat: async function (take = 24, cancel = false) {
    try {
      const response = await serverApi.request({
        url: `/heat?take=${take}`,
        method: "GET",
        signal: cancel
          ? cancelApiObject[this.getHeat.name].handleRequestCancellation()
              .signal
          : undefined,
      });
      const days: environmentByDays_ = splitByDays(response.data);
      return days;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getHumidity: async function (take = 24, cancel = false) {
    try {
      const response = await serverApi.request({
        url: `/humidity?take=${take}`,
        method: "GET",
        signal: cancel
          ? cancelApiObject[this.getHumidity.name].handleRequestCancellation()
              .signal
          : undefined,
      });
      const days: environmentByDays_ = splitByDays(response.data);
      return days;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getBilgeStatus: async function (cancel = false) {
    try {
      const response = await serverApi.request({
        url: "/bilgeStatus",
        method: "GET",
        signal: cancel
          ? cancelApiObject[
              this.getBilgeStatus.name
            ].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },

  // getWifiStatus: async function (cancel = false) {
  //   const response = await api.request({
  //     url: "/wifiStatus",
  //     method: "GET",
  //     signal: cancel
  //       ? cancelApiObject[this.getWifiStatus.name].handleRequestCancellation()
  //           .signal
  //       : undefined,
  //   });
  //   return response.data.value;
  // },
  // resetBilgeStatus: async function (cancel = false) {
  //   const response = await api.request({
  //     url: "/resetBilgeStatus",
  //     method: "GET",
  //     signal: cancel
  //       ? cancelApiObject[this.getBilgeStatus.name].handleRequestCancellation()
  //           .signal
  //       : undefined,
  //   });
  //   return response.data.value;
  // },
  // postWifiCredentials: async function (
  //   ssid_: string,
  //   pwd_: String,
  //   cancel = false
  // ) {
  //   const response = await api.request({
  //     url: "/wifi",
  //     method: "POST",
  //     data: {
  //       SSID: ssid_,
  //       PWD: pwd_,
  //     },
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     signal: cancel
  //       ? cancelApiObject[
  //           this.postWifiCredentials.name
  //         ].handleRequestCancellation().signal
  //       : undefined,
  //   });
  //   return response.data;
  // },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(ServerAPI);
