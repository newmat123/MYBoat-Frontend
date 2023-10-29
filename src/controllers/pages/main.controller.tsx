import { createContext, useEffect, useState } from "react";
import axios from "axios";
import MainComponent from "../../components/mainComponent";

interface environmentData_ {
    type: string;
    type2: string;
    unit: string;
    unit2: string;
    value: number | boolean;
    value2: number;
}

interface data_ {
    requestSuccess: boolean;
    wifiStatus: boolean;
    ssid: string;
    pwd: string;
    waterInBilge: boolean;
}

// interface contextType {
//     reloadApp: () => void;
//     resetWarning: () => void;
//     getEnvironment: () => void;
//     handleSubmit: () => void;
//     setSsid: (ssid: string) => void;
//     setPwd: (pwd: string) => void;
//     waterInBilge: boolean;
//     requestSuccess: boolean;
//     currentData: currentData_[];
//     wifiStatus: boolean;
//     ssid: string;
//     pwd: string;
// }

interface contextType {
    reloadApp: () => void;
    resetWarning: () => void;
    getEnvironment: () => void;
    handleSubmit: () => void;
    setData: (obj: data_) => void;
    data: data_;
    environmentData: environmentData_[];
}

export const Context = createContext<contextType | null>(null);

function MainPagesController() {

    //192.168.69.75          test
    //192.168.1.1            soft ap
    //boatmanager.ddns.net   noip dDns
    const apiUrl = "http://192.168.69.75/";
    const [data, setData] = useState<data_>({
        requestSuccess: true,
        wifiStatus: false,
        ssid: "",
        pwd: "",
        waterInBilge: false
    });

    // const [requestSuccess, setSuccess] = useState(true);
    // const [ssid, setSsid] = useState("");
    // const [pwd, setPwd] = useState("");
    // const [wifiStatus, setWifiStatus] = useState(false);
    // const [waterInBilge, setWater] = useState(false);

    const [environmentData, setEnvironmentData] = useState<any>();

    const getEnvironment = async () => {
        // setSuccess(true);
        setData({
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

                // setWater(response.data[3].value);
                setData({
                    ...data,
                    waterInBilge: response.data[3].value
                });
            })
            .catch(function (error) {
                console.log(error);
                // setSuccess(false);
                setData({
                    ...data,
                    requestSuccess: false
                });
            });
    }

    const getWifiStatus = async () => {
        // setSuccess(true);
        setData({
            ...data,
            requestSuccess: true
        });
        console.log('GetWifiStatus handler was called!');

        axios.get(apiUrl + 'wifiStatus')
            .then(function (response) {
                console.log(response);
                console.log("response");

                // setWifiStatus(response.data.value);
                setData({
                    ...data,
                    wifiStatus: response.data.value
                });
            })
            .catch(function (error) {
                console.log(error);
                // setWifiStatus(false);
                // setSuccess(false);
                setData({
                    ...data,
                    wifiStatus: false,
                    requestSuccess: false
                });
                
            });
    }

    const resetWarning = async () => {
        // setSuccess(true);
        setData({
            ...data,
            requestSuccess: true,
        })
        console.log('resetWarning handler was called!');

        axios.get(apiUrl + 'resetWarning')
            .then(function (response) {
                console.log(response);
                console.log("response");

                // setWater(response.data.value);
                setData({
                    ...data,
                    waterInBilge: response.data.value,
                })
            })
            .catch(function (error) {
                console.log(error);
                // setSuccess(false);
                setData({
                    ...data, 
                    requestSuccess: false
                });
            });
    }

    const handleSubmit = async () => {
        // setSuccess(true);
        setData({
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
                // setWifiStatus(true);
                setData({
                    ...data, 
                    wifiStatus: true
                });
            })
            .catch(async function (error) {
                console.log(error);
                // setWifiStatus(false);
                // setSuccess(false);
                setData({
                    ...data, 
                    wifiStatus: false,
                    requestSuccess: false
                });
            });
    }

    const reloadApp = async () => {
        await getEnvironment();
        await getWifiStatus();
    }

    useEffect(() => {
        reloadApp();
    }, [])

    // const context = {
    //     reloadApp,
    //     resetWarning,
    //     getEnvironment,
    //     handleSubmit,
    //     setSsid,
    //     setPwd,
    //     waterInBilge,
    //     requestSuccess,
    //     currentData,
    //     wifiStatus,
    //     ssid,
    //     pwd
    // };

    const context = {
        reloadApp,
        resetWarning,
        getEnvironment,
        handleSubmit,
        setData,
        data,
        environmentData
    };
    
    return (
        <Context.Provider value={context}>
            <MainComponent/>
        </Context.Provider>
    );
}

export default MainPagesController;