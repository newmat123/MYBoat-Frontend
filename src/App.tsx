import DataBoxCurrent from './components/dataBoxCurrent';
import Warning from './components/warning';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WifiConnect from './components/wifi';


//192.168.69.75          test
//192.168.1.1            soft ap
//boatmanager.ddns.net   noip dDns
const apiUrl = "http://192.168.69.75/";

function App() {
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
                for (let i = 0; i < response.data.length-1; i++) {
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
                // testing ------------------------------------------------
                // axios.get(apiUrl+'data')
                //     .then(function (response) {
                //         console.log(response);
                //         console.log("response 2");

                //         setTemp(Math.round(response.data[0].value * 100) / 100);
                //         setMaxTemp(Math.round(response.data[0].value2 * 100) / 100);

                //         setHumidity(Math.round(response.data[1].value * 100) / 100);
                //         setMaxHumidity(Math.round(response.data[1].value2 * 100) / 100);

                //         setHeat(Math.round(response.data[2].value * 100) / 100);
                //         setMaxHeat(Math.round(response.data[2].value2 * 100) / 100);

                //         setWater(response.data[3].value);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
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
                // testing ------------------------------------------------
                // axios.get(apiUrl+'wifiStatus')
                //     .then(function (response) {
                //         console.log(response);
                //         console.log("response 2");

                //         setWifiStatus(response.data.value);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
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
                // testing ------------------------------------------------
                // axios.get(apiUrl+'resetWarning')
                //     .then(function (response) {
                //         console.log(response);
                //         console.log("response 2");

                //         setWater(response.data.value);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
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
                // testing ------------------------------------------------
                // await axios.post(apiUrl+'wifi', {
                //     SSID: ssid,
                //     PWD: pwd
                // }, {
                //     headers: {
                //         'content-type': 'application/json',
                //     }
                // })
                //     .then(function (response) {
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
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
        <div className="flex justify-center bg-slate-400 min-h-screen">

            <div className="flex flex-col justify-center">

                <div className="absolute w-10 top-1 right-1">
                    <button onClick={reloadApp}>
                        <img src="reload.ico" alt="" />
                    </button>
                </div>

                <Warning onClk={resetWarning} show={waterInBilge} >
                    Der er detekteret vand i kølen.
                </Warning>
                <Warning onClk={reloadApp} show={!requestSuccess} >
                    Noget gik galt. Tjek din forbindelse og prøv igen.
                </Warning>

                <DataBoxCurrent
                    data={currentData}
                    getEnvironment={getEnvironment}
                />

                <WifiConnect 
                    wifiStatus={wifiStatus}
                    ssid={ssid}
                    pwd={pwd}
                    setSsid={setSsid}
                    setPwd={setPwd}
                    onClk={handleSubmit}
                />
                
            </div>
        </div>
    );
}

export default App;