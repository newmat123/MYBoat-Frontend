interface currentData_ {
    type: string;
    type2: string;
    unit: string;
    unit2: string;
    value: number | boolean;
    value2: number;
}

function DataBoxCurrent(props: {
    data: currentData_[];
    getEnvironment: () => void;
}) {

    return (
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
                            <button onClick={props.getEnvironment} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
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
                        {props.data !== undefined ?
                            <tbody>
                                {
                                    props.data.map((data) => (
                                        // <div key={String(x)}>{x}</div>
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
                                                        {data?.value === true ?
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
    );
}

export default DataBoxCurrent;