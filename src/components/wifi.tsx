import { useContext, useEffect } from "react";
import { Context } from "../controllers/pages/main.controller";

function WifiConnect() {
    const context = useContext(Context);

    return (
        <div className="flex flex-col justify-center mb-auto mx-4">

            {context?.data.wifiStatus ?
                <>
                    <h1>Esp allready connected</h1>
                    <button>connect anyway</button>
                </>
                :
                <div className="flex flex-col">

                    <div className="mt-5 text-center">
                        <h3 className="text-4xl font-bold">Connect to wifi</h3>

                        <div className="my-2 flex flex-col">
                            <div className="py-1">
                                <span className="px-1 text-sm">Wifi name</span>
                                <input
                                    placeholder="ssid"
                                    value={context?.data.ssid}
                                    type="text"
                                    name="ssid"
                                    onChange={context?.handleOnchange}
                                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                            </div>
                            <div className="py-1">
                                <span className="px-1 text-sm">Password</span>
                                <input
                                    placeholder="password"
                                    value={context?.data.pwd}
                                    type="password"
                                    name="pwd"
                                    onChange={context?.handleOnchange}
                                    className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                />
                            </div>

                            <button onClick={context?.handleSubmit} className="mt-3 text-lg font-semibold bg-[#006700] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-[#00AA00]">
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default WifiConnect;