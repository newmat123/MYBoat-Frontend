import { useContext } from "react";
import { Context } from "../controllers/pages/main.controller";

function DataBoxCurrent() {
    const context = useContext(Context);

    return (
        <>
            {context !== null &&
                <div className="w-full px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 ">
                        {/* <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">
                                        Boat environment
                                    </h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button onClick={context.getEnvironment} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                        update
                                    </button>
                                </div>
                            </div>
                        </div> */}

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 align-middle border-b border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            #
                                        </th>
                                        <th className="px-6 align-middle border-b border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            current
                                        </th>
                                        <th className="px-6 align-middle border-b border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                                            Highest
                                        </th>
                                    </tr>
                                </thead>

                                {context.environmentData !== undefined ?
                                    <tbody>
                                        {
                                            context.environmentData.map((data) => (
                                                <tr key={data.type}>
                                                    {data.type !== "bilge status" ?
                                                        <>
                                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                                {data?.type}
                                                            </th>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                {data?.value} {data?.unit}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {data?.value2} {data?.unit}
                                                            </td>
                                                        </>
                                                        :
                                                        <>
                                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                                {data?.type}
                                                            </th>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                                {data?.value !== true ?
                                                                    <>Dry</> : <>Wet</>
                                                                }
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            </td>
                                                        </>
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    :
                                    <div className="text-center">loading...</div>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default DataBoxCurrent;