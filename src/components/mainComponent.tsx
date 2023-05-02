import DataBoxCurrent from "./dataBoxCurrent";
import Warning from "./warning";
import WifiConnect from "./wifi";

interface currentData_ {
    type: string;
    type2: string;
    unit: string;
    unit2: string;
    value: number | boolean;
    value2: number;
}

function MainComponent(props: {
    reloadApp: () => void;
    resetWarning: () => void;
    getEnvironment: () => void;
    handleSubmit: () => void;
    setSsid: (ssid: string) => void;
    setPwd: (pwd: string) => void;
    waterInBilge: boolean;
    requestSuccess: boolean;
    currentData: currentData_[];
    wifiStatus: boolean;
    ssid: string;
    pwd: string;
}) {
    
    return (
        <>
            <div className="absolute w-10 top-1 right-1">
                <button onClick={props.reloadApp}>
                    <img src="reload.ico" alt="" />
                </button>
            </div>

            <Warning onClk={props.resetWarning} show={props.waterInBilge} >
                Der er detekteret vand i kølen.
            </Warning>
            <Warning onClk={props.reloadApp} show={!props.requestSuccess} >
                Noget gik galt. Tjek din forbindelse og prøv igen.
            </Warning>

            <DataBoxCurrent
                data={props.currentData}
                getEnvironment={props.getEnvironment}
            />

            <WifiConnect
                wifiStatus={props.wifiStatus}
                ssid={props.ssid}
                pwd={props.pwd}
                setSsid={props.setSsid}
                setPwd={props.setPwd}
                onClk={props.handleSubmit}
            />
        </>
    );
}

export default MainComponent;