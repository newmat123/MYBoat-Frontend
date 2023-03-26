import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [requestSuccess, setSuccess] = useState(true);

    const [ssid, setSsid] = useState("");
    const [pwd, setPwd] = useState("");
    const [wifiStatus, setWifiStatus] = useState(false);

    const [waterInBilge, setWater] = useState(false);
    const [currentTemp, setTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    const [currentHumidity, setHumidity] = useState(0);
    const [maxHumidity, setMaxHumidity] = useState(0);
    const [currentHeat, setHeat] = useState(0);
    const [maxHeat, setMaxHeat] = useState(0);

    const getEnvironment = async () => {
        setSuccess(true);
        console.log('GetEnvironment handler was called!');
        //http://192.168.69.75/data
        axios.get('http://192.168.1.1/data')
            .then(function (response) {
                console.log(response);
                console.log("response");

                setTemp(Math.round(response.data[0].value * 100) / 100);
                setMaxTemp(Math.round(response.data[0].value2 * 100) / 100);

                setHumidity(Math.round(response.data[1].value * 100) / 100);
                setMaxHumidity(Math.round(response.data[1].value2 * 100) / 100);

                setHeat(Math.round(response.data[2].value * 100) / 100);
                setMaxHeat(Math.round(response.data[2].value2 * 100) / 100);

                setWater(response.data[3].value);
            })
            .catch(function (error) {
                console.log(error);
                setSuccess(false);
                // testing ------------------------------------------------
                // axios.get('http://192.168.69.75/data')
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
        //http://192.168.69.75/wifiStatus
        axios.get('http://192.168.1.1/wifiStatus')
            .then(function (response) {
                console.log(response);
                console.log("response");

                setWifiStatus(response.data.value);
            })
            .catch(function (error) {
                console.log(error);
                setSuccess(false);
                // testing ------------------------------------------------
                // axios.get('http://192.168.69.75/wifiStatus')
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
        //http://192.168.69.75/resetWarning
        axios.get('http://192.168.1.1/resetWarning')
            .then(function (response) {
                console.log(response);
                console.log("response");

                setWater(response.data.value);
            })
            .catch(function (error) {
                console.log(error);
                setSuccess(false);
                // testing ------------------------------------------------
                // axios.get('http://192.168.69.75/resetWarning')
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
        //http://192.168.69.75/wifi   192.168.1.1
        await axios.post('http://192.168.1.1/wifi', {
            SSID: ssid,
            PWD: pwd
        }, {
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(async function (error) {
                console.log(error);
                setSuccess(false);
                // testing ------------------------------------------------
                // await axios.post('http://192.168.69.75/wifi', {
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

                {
                    waterInBilge &&

                    <div className="relative mt-12 -mb-12">
                        <div className="font-regular relative block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">Der er detekteret vand i kølen.</div>
                        <button onClick={resetWarning}>
                            <img src="close.png" alt="" className=" absolute w-7 top-1 right-1" />
                        </button>
                    </div>
                }
                {
                    !requestSuccess &&
                    <div className="relative mt-12 -mb-12">
                        <div className="font-regular relative block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">Noget gik galt. Tjek din forbindelse og prøv igen.</div>
                        <button onClick={reloadApp}>
                            <img src="close.png" alt="" className=" absolute w-7 top-1 right-1" />
                        </button>
                    </div>
                }

                <div className="w-full px-4 mx-auto mt-12">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-slate-50 bg-opacity-80 rounded-md ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">
                                        Boat environment
                                    </h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button onClick={getEnvironment} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                        update
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full border-collapse">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 bg-slate-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            #
                                        </th>
                                        <th className="px-6 bg-slate-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            current
                                        </th>
                                        <th className="px-6 bg-slate-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                            Highest
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            Temperature
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {currentTemp} c<sup>o</sup>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {maxTemp} c<sup>o</sup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            Humidity
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {currentHumidity} %
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {maxHumidity} %
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            Heat
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {currentHeat} c<sup>o</sup>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {maxHeat} c<sup>o</sup>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

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