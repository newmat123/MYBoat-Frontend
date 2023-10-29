import { useContext } from "react";
import DataBoxCurrent from "./dataBoxCurrent";
import Warning from "./warning";
import WifiConnect from "./wifi";
import { Context } from "../controllers/pages/main.controller";

function MainComponent() {
    const context = useContext(Context);

    return (
        <>
            {context !== null &&
                <>
                    <div className="absolute w-10 top-1 right-1">
                        <button onClick={context.reloadApp}>
                            <img src="reload.ico" alt="" />
                        </button>
                    </div>

                    <Warning onClk={context.resetWarning} show={context.data.waterInBilge} >
                        Der er detekteret vand i kølen.
                    </Warning>
                    <Warning onClk={context.reloadApp} show={!context.data.requestSuccess} >
                        Noget gik galt. Tjek din forbindelse og prøv igen.
                    </Warning>

                    <DataBoxCurrent/>

                    <WifiConnect/>
                </>
            }
        </>
    );
}

export default MainComponent;