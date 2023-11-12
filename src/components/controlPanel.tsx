import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@mui/material";

function ControlPanel(props: {}) {
  return (
    <div className=" text-center">
      <h1>Kontrol panel</h1>

      <div className=" flex space-x-10 justify-center">
        <div className="flex justify-end py-5">
          <div>
            <div className=" flex justify-between w-full">
              <Switch />
              Lys
            </div>
            <div className=" flex justify-between w-full">
              <Switch />
              Fyr
            </div>
            <div className=" flex justify-between w-full">
              <Switch />
              Motor varme
            </div>
          </div>
        </div>
        <div className="flex justify-start py-5">
          <div>
            <div className=" flex justify-between w-full">
              <Switch />
              Lys
            </div>
            <div className=" flex justify-between w-full">
              <Switch />
              Fyr
            </div>
            <div className=" flex justify-between w-full">
              <Switch />
              Motor varme
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
