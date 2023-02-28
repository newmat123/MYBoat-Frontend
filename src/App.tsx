import React, { useEffect, useState } from 'react';

function App() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentTemp, setCTemp] = useState(0);

    let maxTemp = 27;

    let currentHumidity = 10;
    let maxHumidity = 20;

    let waterInBilge = false;


    const makeAPICall = async () => {
        try {
            const response = await fetch('http://192.168.1.1/data');
            
            const data = await response.json();
            console.log({ data });
            console.log(data[0].value);
            setCTemp(data[0].value);
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        makeAPICall();
    }, [])

    // useEffect(() => {
    //     fetch(`http://192.168.69.75/data`, { mode: 'cors' })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(
    //                     `This is an HTTP error: The status is ${response.status}`
    //                 );
    //             }
    //             return response.json();
    //         })
    //         .then((actualData) => console.log(actualData))
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // }, []);

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
                        <h3 className="text-4xl font-bold text-gray-700">Fugt {currentHumidity} c<sup>o</sup></h3>
                        <div className="my-8">
                            <h1 className="text-2xl font-bold text-gray-800">Top {maxHumidity} c<sup>o</sup></h1>
                            <span className="text-gray-500">Højeste fugt i dag</span>
                        </div>
                        {/* <canvas>

                        </canvas> */}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default App;