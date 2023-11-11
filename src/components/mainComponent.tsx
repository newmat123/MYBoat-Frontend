import { ReactNode, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faTemperatureHigh,
  faFire,
  faUmbrella,
  faGears,
} from "@fortawesome/free-solid-svg-icons"; // import the icons you need

import EnvironmentDataBox from "./environmentDataBox";
// import Warning from "./warning";
// import WifiConnect from "./wifi";
import { Context } from "../controllers/pages/main.controller";
import ControlBox from "./controlBox";
import DataContainer from "./dataContainer";
import { Link } from "react-router-dom";

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
        <h1 className="text-3xl font-extrabold">MYBoat</h1>
        <Link to={"/settings"}>
          <FontAwesomeIcon className="text-5xl" icon={faGears} />
        </Link>
      </header>

      <section id="displayDataPortal"></section>

      <YScrollContainer>
        <ControlBox title="Panel" icon={faGamepad}>
          <FontAwesomeIcon className="text-5xl" icon={faGamepad} />
          <h1>Controlpannel</h1>
        </ControlBox>

        <ControlBox
          title="Temp"
          icon={faTemperatureHigh}
          onOpen={context?.getTemperature}
        >
          <EnvironmentDataBox data={context?.data.temperature} />
        </ControlBox>

        <ControlBox title="Heat" icon={faFire} onOpen={context?.getHeat}>
          <EnvironmentDataBox data={context?.data.heat} />
        </ControlBox>

        <ControlBox
          title="Humidity"
          icon={faUmbrella}
          onOpen={context?.getHumidity}
        >
          <EnvironmentDataBox data={context?.data.humidity} />
        </ControlBox>

        <ControlBox title="Køl" icon={faGamepad}></ControlBox>
      </YScrollContainer>
    </>
  );
}

const YScrollContainer = (Props: { children: ReactNode }) => {
  return (
    <div className=" mb-10 flex justify-center w-screen ">
      <div className=" overflow-x-auto ">
        <div className="flex space-x-2 px-2">{Props.children}</div>
      </div>
    </div>
  );
};

export default MainComponent;
