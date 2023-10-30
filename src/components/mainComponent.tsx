import { useContext } from "react";
import DataBoxCurrent from "./dataBoxCurrent";
import Warning from "./warning";
import WifiConnect from "./wifi";
import { Context } from "../controllers/pages/main.controller";
import ControlBox from "./controlBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faTemperatureHigh, faTowerCell } from "@fortawesome/free-solid-svg-icons"; // import the icons you need

function MainComponent() {
    const context = useContext(Context);

    return (
        context !== null ?
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

                    <ControlBox selected={true}>
                        <FontAwesomeIcon className="text-5xl" icon={faTemperatureHigh} />
                        <h1>Envioment</h1>
                    </ControlBox>

                    <ControlBox>
                        <FontAwesomeIcon className="text-5xl" icon={faTowerCell} />
                        <h1>Connection</h1>
                    </ControlBox>
                    
                    <ControlBox>
                        <FontAwesomeIcon className="text-5xl" icon={faGamepad} />
                        <h1>Envioment</h1>
                    </ControlBox>

                </div>

                <div className=" w-full bg-[#212121]">
                    <DataBoxCurrent/>
                </div>

                <div className="flex space-x-2 m-3">

                    <ControlBox>
                        <FontAwesomeIcon className="text-5xl" icon={faTemperatureHigh} />
                        <h1>Envioment</h1>
                    </ControlBox>

                    <ControlBox>
                        <FontAwesomeIcon className="text-5xl" icon={faTowerCell} />
                        <h1>Connection</h1>
                    </ControlBox>

                    <ControlBox>
                        <FontAwesomeIcon className="text-5xl" icon={faGamepad} />
                        <h1>Envioment</h1>
                    </ControlBox>

                </div>

                <div className="w-full bg-[#212121]">
                    <WifiConnect/>
                </div>
            </>
            :
            <h2>loading...</h2>
    );
}

export default MainComponent;