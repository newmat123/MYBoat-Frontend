import { environment_ } from "../controllers/pages/main.controller";
import { api } from "./configs/axiosConfig"
import { defineCancelApiObject } from "./configs/axiosUtils"

const roundNumber = (response: environment_) => {
    if (response === undefined || response.value === undefined || typeof response.value === "boolean" || response.value2 === undefined) {
        return response;
    }
    var fixedResponse = response;
    fixedResponse.value = Math.round(response.value * 100) / 100
    fixedResponse.value2 = Math.round(response.value2 * 100) / 100
    return fixedResponse;
}

export const ClientApi = {
    getTemperature: async function (cancel = false) {
        const response = await api.request({
            url: `/temperature`,
            method: "GET",
            // retrieving the signal value by using the property name
            signal: cancel ? cancelApiObject[this.getTemperature.name].handleRequestCancellation().signal : undefined,
        })
        // returning the product returned by the API
        return roundNumber(response.data);
    },
    getHeat: async function (cancel = false) {
        const response = await api.request({
            url: `/heat`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getHeat.name].handleRequestCancellation().signal : undefined,
        })
        return roundNumber(response.data);
    },
    getHumidity: async function (cancel = false) {
        const response = await api.request({
            url: `/humidity`,
            method: "GET",
            signal: cancel ? cancelApiObject[this.getHumidity.name].handleRequestCancellation().signal : undefined,
        })
        return roundNumber(response.data);
    },
    getEnvironment: async function (cancel = false) {
        const response = await api.request({
            url: "/data",
            method: "GET",
            signal: cancel ? cancelApiObject[this.getEnvironment.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },
    getWifiStatus: async function (cancel = false) {
        const response = await api.request({
            url: "/wifiStatus",
            method: "GET",
            signal: cancel ? cancelApiObject[this.getWifiStatus.name].handleRequestCancellation().signal : undefined,
        })
        return response.data.value
    },
    getBilgeStatus: async function (cancel = false) {
        const response = await api.request({
            url: "/bilgeStatus",
            method: "GET",
            signal: cancel ? cancelApiObject[this.getBilgeStatus.name].handleRequestCancellation().signal : undefined,
        })
        return response.data.value
    },
    resetBilgeStatus: async function (cancel = false) {
        const response = await api.request({
            url: "/resetBilgeStatus",
            method: "GET",
            signal: cancel ? cancelApiObject[this.getBilgeStatus.name].handleRequestCancellation().signal : undefined,
        })
        return response.data.value
    },
    postWifiCredentials: async function (ssid_: string, pwd_: String, cancel = false) {
        const response = await api.request({
            url: "/wifi",
            method: "POST",
            data: {
                SSID: ssid_,
                PWD: pwd_
            },
            headers: {
                'content-type': 'application/json',
            },
            signal: cancel ? cancelApiObject[this.postWifiCredentials.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(ClientApi)