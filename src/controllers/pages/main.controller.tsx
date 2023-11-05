import { createContext, useEffect, useState } from "react";
// import axios from "axios";
import MainComponent from "../../components/mainComponent";
import { ClientApi } from "../../apis/clientAPI";

type controls = "wifi" | "control" | "temperature" | "humidity" | "heat" | "keel" | undefined;

// type GetEndpoints = "data" | "resetWarning" | "bilgeStatus" | "heat" | "humidity" | "temperature" | "wifiStatus"

export type environment_ = {
    type?: string;
    type2?: string;
    unit?: string;
    unit2?: string;
    value?: number | boolean;
    value2?: number;
} | undefined

export type data_ = {
    requestSuccess: boolean;
    wifiStatus: boolean;
    ssid: string;
    pwd: string;
    waterInBilge: boolean;
    temp: environment_;
    humidity: environment_;
    heat: environment_;
};

type contextType = {
    resetWarning: () => void;
    // ClientApi: () => void
    // getEnvironment: (endpoint: GetEndpoints) => void;
    handleSubmit: () => void;
    handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedControl: (con: controls) => void;
    data: data_;
    selectedControl: controls;
};

export const Context = createContext<contextType | null>(null);

function MainPagesController() {

    const [data, setData] = useState<data_>({
        requestSuccess: true,
        wifiStatus: false,
        ssid: "",
        pwd: "",
        waterInBilge: false,
        temp: undefined,
        humidity: undefined,
        heat: undefined
    });

    const [selectedControl, setSelectedControl] = useState<controls>();

    // const [temp, setTemp] = useState<environment_>(undefined);
    // const [humidity, setHumidity] = useState<environment_>(undefined);
    // const [heat, setHeat] = useState<environment_>(undefined);

    const onFetchEvent = () => {
        !data.requestSuccess && setData({
            ...data,
            requestSuccess: true
        });
    }

    // https://semaphoreci.com/blog/api-layer-react
    //add api layer

    // const getEnvironment = async (endpoint: GetEndpoints) => {
    //     onFetchEvent();
    //     console.log('GetEnvironment handler was called!');

    //     axios.get(apiUrl + endpoint)
    //         .then((response) => {
    //             setData({
    //                 ...data,
    //                 envData: {
    //                     type: response.data.type,
    //                     type2: response.data.type2,
    //                     unit: response.data.unit,
    //                     unit2: response.data.unit2,
    //                     value: Math.round(response.data.value * 100) / 100,
    //                     value2: Math.round(response.data.value2 * 100) / 100
    //                 }
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             setData({
    //                 ...data,
    //                 requestSuccess: false
    //             });
    //         });
    // }

    // const getWifiStatus = async () => {
    //     onFetchEvent();

    //     console.log('GetWifiStatus handler was called!');

    //     axios.get(apiUrl + 'wifiStatus')
    //         .then((response) => {
    //             console.log(response);
    //             console.log("response");

    //             setData({
    //                 ...data,
    //                 wifiStatus: response.data.value
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setData({
    //                 ...data,
    //                 wifiStatus: false,
    //                 requestSuccess: false
    //             });

    //         });
    // }

    const resetWarning = async () => {
        onFetchEvent();
        console.log('resetWarning handler was called!');

        setData({
            ...data,
            waterInBilge: await ClientApi.getBilgeStatus(),
        })

        // const res = await ClientApi.getBilgeStatus();
        // if (res === true){
        //     setData({
        //         ...data,
        //         waterInBilge: res,
        //     })
        // }else{
        //     setData({
        //         ...data,
        //         requestSuccess: false,
        //     })
        // }



        // axios.get(apiUrl + 'resetWarning')
        //     .then((response) => {
        //         console.log(response);
        //         console.log("response");

        //         setData({
        //             ...data,
        //             waterInBilge: response.data.value,
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setData({
        //             ...data,
        //             requestSuccess: false
        //         });
        //     });
    }

    const handleSubmit = async () => {
        onFetchEvent();
        console.log('Post handler was called!');

        ClientApi.postWifiCredentials(data.ssid, data.pwd);

        // await axios.post(apiUrl + 'wifi', {
        //     SSID: data.ssid,
        //     PWD: data.pwd
        // }, {
        //     headers: {
        //         'content-type': 'application/json',
        //     }
        // })
        //     .then((response) => {
        //         console.log(response);
        //         setData({
        //             ...data,
        //             wifiStatus: true
        //         });
        //     })
        //     .catch(async (error) => {
        //         console.log(error);
        //         setData({
        //             ...data,
        //             wifiStatus: false,
        //             requestSuccess: false
        //         });
        //     });
    }

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    // const reloadApp = async () => {
    // await getEnvironment("data");
    // await getWifiStatus();
    // }

    // useEffect(() => {
    // reloadApp();
    // }, [])

    const handleClkEvent = async () => {
        // console.log("----------------");
        // console.log(await ClientApi.getTemperature());
        
        switch (selectedControl) {
            case "temperature":
                const temp = await ClientApi.getTemperature();
                setData((prev) => ({
                    ...prev,
                    temp: temp,
                }));

                // setTemp(await ClientApi.getTemperature());
                // setData((prev) => ({
                //     ...prev,
                //     envData: temp,
                // }));
                break;
            case "heat":
                const heat = await ClientApi.getHeat();
                setData((prev) => ({
                    ...prev,
                    heat: heat,
                }));
                // setData((prev) => ({
                //     ...prev,
                //     envData: heat,
                // }));
                // setHeat(await ClientApi.getHeat());
                // setData((prev) => ({
                //     ...prev,
                //     envData: heat,
                // }));
                break;
            case "humidity":
                const humidity = await ClientApi.getHumidity();
                setData((prev) => ({
                    ...prev,
                    humidity: humidity,
                }));
                // setData((prev) => ({
                //     ...prev,
                //     envData: humidity,
                // }));
                // setHumidity(await ClientApi.getHumidity());
                // setData((prev) => ({
                //     ...prev,
                //     envData: humidity,
                // }));
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        if (typeof selectedControl !== undefined) {
            handleClkEvent();
        }
    }, [selectedControl])

    const context = {
        // reloadApp,
        resetWarning,
        // getEnvironment,
        handleSubmit,
        handleOnchange,
        setSelectedControl,
        data,
        selectedControl,
    };

    return (
        <Context.Provider value={context}>
            <MainComponent />
        </Context.Provider>
    );
}

export default MainPagesController;