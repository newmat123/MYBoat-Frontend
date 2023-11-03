import { useContext } from "react";
import DataBoxCurrent from "./dataBoxCurrent";
import Warning from "./warning";
import WifiConnect from "./wifi";
import { Context } from "../controllers/pages/main.controller";
import ControlBox from "./controlBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faTemperatureHigh, faTowerCell, faFire, faUmbrella } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import DataContainer from "./dataContainer";

function MainComponent() {
    const context = useContext(Context);

    return (
        <>
            {/* <div className="absolute w-10 top-1 right-1">
                <button onClick={context.reloadApp}>
                    <img src="reload.ico" alt="" />
                </button>
            </div>

            <Warning onClk={context.resetWarning} show={context.data.waterInBilge} >
                Der er detekteret vand i kølen.
            </Warning>
            <Warning onClk={context.reloadApp} show={!context.data.requestSuccess} >
                Noget gik galt. Tjek din forbindelse og prøv igen.
            </Warning> */}


            <div className="flex space-x-2 m-3">

                <ControlBox onClk={() => { context?.selectedControl === "wifi" ? context.setSelectedControl(undefined) : context?.setSelectedControl("wifi") }} selected={context?.selectedControl === "wifi"}>
                    <FontAwesomeIcon className="text-5xl" icon={faTowerCell} />
                    <h1>Connection</h1>
                </ControlBox>

                <ControlBox onClk={() => { context?.selectedControl === "control" ? context.setSelectedControl(undefined) : context?.setSelectedControl("control") }} selected={context?.selectedControl === "control"}>
                    <FontAwesomeIcon className="text-5xl" icon={faGamepad} />
                    <h1>Controlpannel</h1>
                </ControlBox>

                <ControlBox onClk={() => { context?.selectedControl === "keel" ? context.setSelectedControl(undefined) : context?.setSelectedControl("keel") }} selected={context?.selectedControl === "keel"}>
                    <FontAwesomeIcon className="text-5xl" icon={faGamepad} />
                    <h1>Køl</h1>
                </ControlBox>

            </div>

            <DataContainer showDropDown={context?.selectedControl === "wifi" || context?.selectedControl === "control" || context?.selectedControl === "keel"}>
                {context?.selectedControl === "wifi" &&
                    <WifiConnect />
                }
            </DataContainer>

            <div className="flex space-x-2 m-3">

                <ControlBox onClk={() => { context?.selectedControl === "temperature" ? context.setSelectedControl(undefined) : context?.setSelectedControl("temperature") }} selected={context?.selectedControl === "temperature"}>
                    <FontAwesomeIcon className="text-5xl" icon={faTemperatureHigh} />
                    <h1>Temp</h1>
                </ControlBox>

                <ControlBox onClk={() => { context?.selectedControl === "heat" ? context.setSelectedControl(undefined) : context?.setSelectedControl("heat") }} selected={context?.selectedControl === "heat"}>
                    <FontAwesomeIcon className="text-5xl" icon={faFire} />
                    <h1>Heat</h1>
                </ControlBox>

                <ControlBox onClk={() => { context?.selectedControl === "humidity" ? context.setSelectedControl(undefined) : context?.setSelectedControl("humidity") }} selected={context?.selectedControl === "humidity"}>
                    <FontAwesomeIcon className="text-5xl" icon={faUmbrella} />
                    <h1>Humidity</h1>
                </ControlBox>

            </div>

            <DataContainer showDropDown={context?.selectedControl === "temperature" || context?.selectedControl === "heat" || context?.selectedControl === "humidity"}>
                {/* {context?.selectedControl === "temperature" && */}
                    <DataBoxCurrent />
                {/* // } */}
            </DataContainer>

        </>
    );
}

export default MainComponent;