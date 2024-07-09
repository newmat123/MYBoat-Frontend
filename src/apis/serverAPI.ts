import { switch_ } from "../shared/types/main.types";
import { environmentByDays_ } from "../shared/types/shared.types";
import { serverApi } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";
import { roundNumber, splitByDays } from "./utils";

export const API = {
  getEnvironment: async function (take = 73, cancel = false) {
    try {
      const response = await serverApi().request({
        url: `/environment?take=${take}`,
        method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel
          ? cancelApiObject[
              this.getEnvironment.name
            ].handleRequestCancellation().signal
          : undefined,
      });
      // returning the product returned by the API
      const days: environmentByDays_ = splitByDays(roundNumber(response.data));
      return days;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getTemperature: async function (take = 73, cancel = false) {
    try {
      const response = await serverApi().request({
        url: `/temperature?take=${take}`,
        method: "GET",
        signal: cancel
          ? cancelApiObject[
              this.getTemperature.name
            ].handleRequestCancellation().signal
          : undefined,
      });
      const days: environmentByDays_ = splitByDays(roundNumber(response.data));
      return days;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getHeat: async function (take = 73, cancel = false) {
    try {
      const response = await serverApi().request({
        url: `/heat?take=${take}`,
        method: "GET",
        signal: cancel
          ? cancelApiObject[this.getHeat.name].handleRequestCancellation()
              .signal
          : undefined,
      });
      const days: environmentByDays_ = splitByDays(roundNumber(response.data));
      return days;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getHumidity: async function (take = 73, cancel = false) {
    try {
      const response = await serverApi().request({
        url: `/humidity?take=${take}`,
        method: "GET",
        signal: cancel
          ? cancelApiObject[this.getHumidity.name].handleRequestCancellation()
              .signal
          : undefined,
      });
      const days: environmentByDays_ = splitByDays(roundNumber(response.data));
      return days;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getBilgeStatus: async function (cancel = false) {
    try {
      const response = await serverApi().request({
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
  resetBilgeStatus: async function (cancel = false) {
    try {
      const response = await serverApi().request({
        url: `/resetBilgeStatus`,
        method: "PUT",
        signal: cancel
          ? cancelApiObject[
              this.resetBilgeStatus.name
            ].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },
  getSwitches: async function (cancel = false) {
    try {
      const response = await serverApi().request({
        url: "/switches",
        method: "GET",
        signal: cancel
          ? cancelApiObject[
              this.getSwitches.name
            ].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch {
      console.log("couldn't fetch switches");
      return undefined;
    }
  },
  putSwitch: async function (
    concreteSwitch: switch_,
    cancel = false
  ) {
    try {
      const response = await serverApi().request({
        url: `/switch`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        data: concreteSwitch,
        signal: cancel
          ? cancelApiObject[
              this.putSwitch.name
            ].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch {
      console.log("couldn't fetch environment");
      return undefined;
    }
  },

  getWifiStatus: async function (cancel = false) {
    const response = await serverApi().request({
      url: "/wifiStatus",
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getWifiStatus.name].handleRequestCancellation()
            .signal
        : undefined,
    });
    return response.data;
  },
  putWifiCredentials: async function (
    ssid_: string,
    pwd_: String,
    cancel = false
  ) {
    const response = await serverApi().request({
      url: "/clientWifi",
      method: "PUT",
      data: {
        SSID: ssid_,
        PWD: pwd_,
      },
      headers: {
        "content-type": "application/json",
      },
      signal: cancel
        ? cancelApiObject[
            this.putWifiCredentials.name
          ].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
  putTime: async function (
    dateTime: Date,
    cancel = false
  ) {
    const response = await serverApi().request({
      url: "/setTime",
      method: "PUT",
      data: {
        year: dateTime.getFullYear(),
        month: dateTime.getMonth(),
        day: dateTime.getDay(),
        h: dateTime.getHours(),
        m: dateTime.getMinutes(),
        s: dateTime.getSeconds()
      },
      headers: {
        "content-type": "application/json",
      },
      signal: cancel
        ? cancelApiObject[
            this.putTime.name
          ].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(API);
