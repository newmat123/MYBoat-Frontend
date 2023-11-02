import { createContext, useEffect, useState } from "react";
import axios from "axios";
import MainComponent from "../../components/mainComponent";
import DataBoxCurrent from "../../components/dataBoxCurrent";

type controls = "wifi" | "control" | "temp" | "hum" | "heat" | undefined;

type environmentData_ = {
    type: string;
    type2: string;
    unit: string;
    unit2: string;
    value: number | boolean;
    value2: number;
};

export type data_ = {
    requestSuccess: boolean;
    wifiStatus: boolean;
    ssid: string;
    pwd: string;
    waterInBilge: boolean;
};

type contextType = {
    reloadApp: () => void;
    resetWarning: () => void;
    getEnvironment: () => void;
    handleSubmit: () => void;
    handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedControl: (con: controls) => void;
    data: data_;
    environmentData: environmentData_[];
    selectedControl: controls;
};

export const Context = createContext<contextType | null>(null);

function MainPagesController() {

    //192.168.69.75          test
    //192.168.1.1            soft ap
    //boatmanager.ddns.net   noip dDns
    const apiUrl = "http://192.168.1.1/";
    const [data, setData] = useState<data_>({
        requestSuccess: true,
        wifiStatus: false,
        ssid: "",
        pwd: "",
        waterInBilge: false
    });

    console.log(data);

    const [environmentData, setEnvironmentData] = useState<any | undefined>();

    const [selectedControl, setSelectedControl] = useState<controls>();

    const getEnvironment = async () => {
        !data.requestSuccess && setData({
            ...data,
            requestSuccess: true
        });

        console.log('GetEnvironment handler was called!');

        axios.get(apiUrl + 'data')
            .then(function (response) {

                var temp: any[] = response.data;
                for (let i = 0; i < response.data.length - 1; i++) {
                    temp[i].value = Math.round(response.data[i].value * 100) / 100;
                    temp[i].value2 = Math.round(response.data[i].value2 * 100) / 100;
                }
                setEnvironmentData(temp);
                console.log(environmentData);
                console.log(response.data);
                console.log("---------");

                setData({
                    ...data,
                    waterInBilge: response.data[3].value
                });
            })
            .catch(function (error) {
                console.log(error);
                setData({
                    ...data,
                    requestSuccess: false
                });
            });
    }

    const getWifiStatus = async () => {
        !data.requestSuccess && setData({
            ...data,
            requestSuccess: true
        });
        console.log('GetWifiStatus handler was called!');

        axios.get(apiUrl + 'wifiStatus')
            .then(function (response) {
                console.log(response);
                console.log("response");

                setData({
                    ...data,
                    wifiStatus: response.data.value
                });
            })
            .catch(function (error) {
                console.log(error);
                setData({
                    ...data,
                    wifiStatus: false,
                    requestSuccess: false
                });

            });
    }

    const resetWarning = async () => {
        !data.requestSuccess && setData({
            ...data,
            requestSuccess: true
        });
        console.log('resetWarning handler was called!');

        axios.get(apiUrl + 'resetWarning')
            .then(function (response) {
                console.log(response);
                console.log("response");

                setData({
                    ...data,
                    waterInBilge: response.data.value,
                })
            })
            .catch(function (error) {
                console.log(error);
                setData({
                    ...data,
                    requestSuccess: false
                });
            });
    }

    const handleSubmit = async () => {
        !data.requestSuccess && setData({
            ...data,
            requestSuccess: true
        });
        console.log('Post handler was called!');

        await axios.post(apiUrl + 'wifi', {
            SSID: data.ssid,
            PWD: data.pwd
        }, {
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(function (response) {
                console.log(response);
                setData({
                    ...data,
                    wifiStatus: true
                });
            })
            .catch(async function (error) {
                console.log(error);
                setData({
                    ...data,
                    wifiStatus: false,
                    requestSuccess: false
                });
            });
    }

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const reloadApp = async () => {
        await getEnvironment();
        await getWifiStatus();
    }

    useEffect(() => {
        reloadApp();
    }, [])

    const context = {
        reloadApp,
        resetWarning,
        getEnvironment,
        handleSubmit,
        handleOnchange,
        setSelectedControl,
        data,
        environmentData,
        selectedControl,
    };

    return (
        <Context.Provider value={context}>
            <MainComponent />
        </Context.Provider>
    );
}

export default MainPagesController;