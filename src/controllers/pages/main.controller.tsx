import { useEffect, useState } from "react";
import axios from "axios";
import MainComponent from "../../components/mainComponent";

function MainPagesController(props: {}) {

    //192.168.69.75          test
    //192.168.1.1            soft ap
    //boatmanager.ddns.net   noip dDns
    const apiUrl = "http://192.168.69.75/";

    const [requestSuccess, setSuccess] = useState(true);

    const [ssid, setSsid] = useState("");
    const [pwd, setPwd] = useState("");
    const [wifiStatus, setWifiStatus] = useState(false);

    const [waterInBilge, setWater] = useState(false);
    const [currentData, setCurrentData] = useState<any>();

    const getEnvironment = async () => {
        setSuccess(true);
        console.log('GetEnvironment handler was called!');

        axios.get(apiUrl + 'data')
            .then(function (response) {

                var temp: any[] = response.data;
                for (let i = 0; i < response.data.length - 1; i++) {
                    temp[i].value = Math.round(response.data[i].value * 100) / 100;
                    temp[i].value2 = Math.round(response.data[i].value2 * 100) / 100;
                }
                setCurrentData(temp);
                console.log(currentData);
                console.log(response.data);
                console.log("---------");

                setWater(response.data[3].value);
            })
            .catch(function (error) {
                console.log(error);
                setSuccess(false);
            });
    }

    const getWifiStatus = async () => {
        setSuccess(true);
        console.log('GetWifiStatus handler was called!');

        axios.get(apiUrl + 'wifiStatus')
            .then(function (response) {
                console.log(response);
                console.log("response");

                setWifiStatus(response.data.value);
            })
            .catch(function (error) {
                console.log(error);
                setWifiStatus(false);
                setSuccess(false);
            });
    }

    const resetWarning = async () => {
        setSuccess(true);
        console.log('resetWarning handler was called!');

        axios.get(apiUrl + 'resetWarning')
            .then(function (response) {
                console.log(response);
                console.log("response");

                setWater(response.data.value);
            })
            .catch(function (error) {
                console.log(error);
                setSuccess(false);
            });
    }

    const handleSubmit = async () => {
        setSuccess(true);
        console.log('Post handler was called!');

        await axios.post(apiUrl + 'wifi', {
            SSID: ssid,
            PWD: pwd
        }, {
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(function (response) {
                console.log(response);
                setWifiStatus(true);
            })
            .catch(async function (error) {
                console.log(error);
                setWifiStatus(false);
                setSuccess(false);
            });
    }

    const reloadApp = async () => {
        await getEnvironment();
        await getWifiStatus();
    }

    useEffect(() => {
        reloadApp();
    }, [])

    return (
        <MainComponent
            reloadApp = {reloadApp}
            resetWarning = {resetWarning}
            getEnvironment = {getEnvironment}
            handleSubmit = {handleSubmit}
            setSsid = {setSsid}
            setPwd = {setPwd}
            waterInBilge = {waterInBilge}
            requestSuccess = {requestSuccess}
            currentData = {currentData}
            wifiStatus = {wifiStatus}
            ssid = {ssid}
            pwd = {pwd}
    />
    );
}

export default MainPagesController;