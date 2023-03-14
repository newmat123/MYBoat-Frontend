import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [ssid, setSsid] = useState("");
    const [pwd, setPwd] = useState("");

    const [waterInBilge, setWater] = useState(false);
    const [currentTemp, setTemp] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    // const [currentHumidity, setHumidity] = useState(0);
    // const [maxHumidity, setMaxHumidity] = useState(0);


    const makeAPICall = async () => {
        try {
            const response = await fetch('http://192.168.69.75/data');

            const data = await response.json();
            //console.log({ data });
            // console.log(data[0].value);
            setTemp(data[0].value);
            setMaxTemp(data[0].value2);
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        makeAPICall();
    }, [])

    const handleSubmit = async () => {
        await axios.post('http://192.168.69.75/wifi', {
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

            <div className="mt-24 ">

                <div className="border-b-2 border-slate-700 min-w-fit md:min-w-[500px] p-4 text-center">
                    <h1 className="text-5xl font-bold">BÅDMANEGER</h1>
                </div>

                <div className="flex flex-col justify-center">

                    {
                        waterInBilge &&
                        <div className="mt-12 text-center bg-red-600 rounded-md p-5 m-5">
                            <h3 className="text-4xl font-bold text-gray-200">Der Er Vand I Kølen</h3>
                            <div className="">
                                <h1 className="text-2xl font-bold text-gray-200">Warning</h1>
                                <span className="text-gray-300">Skynd dig at få styr på den</span>
                            </div>
                        </div>
                    }


                    <div className="mt-12 text-center">
                        <h3 className="text-4xl font-bold text-gray-700">Temperature {currentTemp} c<sup>o</sup></h3>
                        <div className="my-8">
                            <h1 className="text-2xl font-bold text-gray-800">Top {maxTemp} c<sup>o</sup></h1>
                            <span className="text-gray-500">Højeste temp i dag</span>
                        </div>
                        {/* <canvas>

                        </canvas> */}
                    </div>

                    <div className="mt-12 text-center">
                        <h3 className="text-4xl font-bold text-gray-700">Connect to network</h3>

                        <div className="my-8 flex flex-col">
                            <label>Wifi name:
                                <input
                                    type="text"
                                    value={ssid}
                                    onChange={(e) => setSsid(e.target.value)}
                                />
                            </label>
                            <label>Password:
                                <input
                                    type="text"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                />
                            </label>
                            <button onClick={handleSubmit} className="bg-slate-700 rounded-md">submit</button>
                        </div>

                    </div>

                    {/* <div className="mt-12 text-center">
                        <h3 className="text-4xl font-bold text-gray-700">Fugt {currentHumidity} c<sup>o</sup></h3>
                        <div className="my-8">
                            <h1 className="text-2xl font-bold text-gray-800">Top {maxHumidity} c<sup>o</sup></h1>
                            <span className="text-gray-500">Højeste fugt i dag</span>
                        </div>
                        {/* <canvas>

                        </canvas> 
                    </div> */}

                </div>

            </div>

        </div>
    );
}

export default App;
