import { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons"; // import the icons you need

import { Context } from "../controllers/pages/settings.controller";
import WifiConnect from "./wifi";

function SettingsComponent() {
  const context = useContext(Context);

  return (
    <>
      <header className="flex justify-between m-5">
        <h1 className="text-3xl font-extrabold">Settings</h1>
        <Link to={"/"}>
          <FontAwesomeIcon className="text-5xl" icon={faBackward} />
        </Link>
      </header>
      <WifiConnect />
      <div></div>
    </>
  );
}

export default SettingsComponent;
