import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [ssid, setSsid] = useState("");
    const [pwd, setPwd] = useState("");

    const [waterInBilge, setWater] = useState(false);
    const [currentTemp, setTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    const [currentHumidity, setHumidity] = useState(0);
    const [maxHumidity, setMaxHumidity] = useState(0);
    const [currentHeat, setHeat] = useState(0);
    const [maxHeat, setMaxHeat] = useState(0);

    const makeAPICall = async () => {
        console.log('Get handler was called!');
        //http://192.168.69.75/data
        axios.get('http://192.168.1.1/data')
            .then(function (response) {
                console.log(response);
                console.log(response.data);
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
            });
    }
    useEffect(() => {
        makeAPICall();
    }, [])

    const handleSubmit = async () => {
        console.log('Post handler was called!');
        //http://192.168.69.75/wifi
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
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="flex justify-center bg-slate-400 min-h-screen">

            <div className="flex flex-col justify-center">

                {
                    waterInBilge &&

                    <div className="mt-12">
                        <div className="font-regular relative block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">Der er detekteret vand i kølen.</div>
                    </div>
                }

                <div className="w-full  px-4 mx-auto mt-10">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-slate-50 bg-opacity-80 rounded-md ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">
                                        Boat environment
                                    </h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button onClick={makeAPICall} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
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