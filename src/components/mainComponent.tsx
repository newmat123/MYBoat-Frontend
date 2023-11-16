import { ReactNode, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faTemperatureHigh,
  faFire,
  faUmbrella,
  faGears,
} from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { Link } from "react-router-dom";

import EnvironmentDisplay from "./environmentDisplay";
// import Warning from "./warning";
// import WifiConnect from "./wifi";
import { Context } from "../controllers/pages/main.controller";
import ControlBox from "./controlBox";
import ControlPanel from "./controlPanel";
import BilgeDisplay from "./bilgeDisplay";

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

      {/* <DataContainer
        showDropDown={
          context?.selectedControl === "wifi" ||
          context?.selectedControl === "control" ||
          context?.selectedControl === "keel"
        }
      >
        {context?.selectedControl === "wifi" && <WifiConnect />}
      </DataContainer> */}

      <header className="flex justify-between m-5">
        {/* <div className=" bg-slate-400 rounded-lg flex items-center sm:px-20 sm:py-4 px-5 py-2"> */}
        <h1 className="text-3xl font-extrabold">MYBoat</h1>
        {/* </div> */}
        <Link to={"/settings"}>
          <FontAwesomeIcon className="text-5xl" icon={faGears} />
        </Link>
      </header>

      <section id="displayDataPortal"></section>

      <YScrollContainer>
        <ControlBox title="Panel" icon={faGamepad}>
          <ControlPanel />
        </ControlBox>

        <ControlBox
          title="Temp"
          icon={faTemperatureHigh}
          onOpen={context?.getTemperature}
        >
          <EnvironmentDisplay data={context?.data.temperature} />
        </ControlBox>

        <ControlBox title="Heat" icon={faFire} onOpen={context?.getHeat}>
          <EnvironmentDisplay data={context?.data.heat} />
        </ControlBox>

        <ControlBox
          title="Humidity"
          icon={faUmbrella}
          onOpen={context?.getHumidity}
        >
          <EnvironmentDisplay data={context?.data.humidity} />
        </ControlBox>

        <ControlBox
          title="Køl"
          icon={faGamepad}
          onOpen={context?.getBilgeStatus}
        >
          <BilgeDisplay data={context?.data.bilgeStatus} />
        </ControlBox>
      </YScrollContainer>
    </>
  );
}

const YScrollContainer = (props: { children: ReactNode }) => {
  return (
    <div className=" mb-10 flex justify-center w-screen ">
      <div className=" overflow-x-auto ">
        <div className="flex space-x-2 px-2">{props.children}</div>
      </div>
    </div>
  );
};

export default MainComponent;
