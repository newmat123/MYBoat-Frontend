import DataBoxCurrent from './components/dataBoxCurrent';
import Warning from './components/warning';
import { useEffect, useState } from 'react';
import axios from 'axios';


//192.168.69.75  test
//192.168.1.1    soft ap
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
                setCurrentData(response.data);
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


                <div className="relative flex flex-col justify-center bg-slate-50 bg-opacity-80 rounded-md shadow-lg mt-14 mb-auto mx-4">

                    {
                        wifiStatus ?
                            <img src="wifi200.png" alt="" className="absolute w-7 top-1 right-1" />
                            :
                            <img src="wifi400.png" alt="" className="absolute w-7 top-1 right-1" />
                    }

                    <div className="flex flex-col">

                        <div className="mt-5 text-center">
                            <h3 className="text-4xl font-bold text-gray-700">Connect to wifi</h3>

                            <div className="my-8 flex flex-col px-5">
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">Wifi name</span>
                                    <input
                                        placeholder=""
                                        value={ssid}
                                        type="text"
                                        onChange={(e) => setSsid(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    />
                                </div>
                                <div className="py-1">
                                    <span className="px-1 text-sm text-gray-600">Password</span>
                                    <input
                                        placeholder=""
                                        value={pwd}
                                        type="text"
                                        onChange={(e) => setPwd(e.target.value)}
                                        className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                    />
                                </div>

                                <button onClick={handleSubmit} className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>





            </div>
        </div>
    );
}

export default App;