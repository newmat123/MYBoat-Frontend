import { useEffect } from "react";

function WifiConnect(props: {
    //children: never;
    wifiStatus: boolean;
    ssid: string;
    pwd: string;

    setSsid: (ssid: string) => void;
    setPwd: (pwd: string) => void;
    onClk: () => void;
}) {

    useEffect(()=>{

    },[props.wifiStatus]);

    return (
        <div className="relative flex flex-col justify-center bg-slate-50 bg-opacity-80 rounded-md shadow-lg mt-14 mb-auto mx-4">

            {props.wifiStatus ?
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
                                value={props.ssid}
                                type="text"
                                onChange={(e) => props.setSsid(e.target.value)}
                                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Password</span>
                            <input
                                placeholder=""
                                value={props.pwd}
                                type="password"
                                onChange={(e) => props.setPwd(e.target.value)}
                                className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                        </div>

                        <button onClick={props.onClk} className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                            Connect
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WifiConnect;