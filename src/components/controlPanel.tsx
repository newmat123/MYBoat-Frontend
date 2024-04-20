import { Switch } from "@mui/material";
import { useContext } from "react";
import { Context } from "../controllers/pages/main.controller";

function ControlPanel(props: {}) {
  const context = useContext(Context);

  return (
    <div className=" text-center">
      <h1>Kontrol panel</h1>

      <div className=" flex space-x-10 justify-center">
        <div className="flex justify-end py-5">
          <div>
            <div className=" flex justify-between w-full">
              <Switch
                value={context?.controlPanel?.light}
                onChange={() =>
                  context?.controlPanelChange({
                    light: !context?.controlPanel.light,
                  })
                }
              />
              Lys
            </div>
          </div>
        </div>
        <div className="flex justify-start py-5">
          <div>
            <div className=" flex justify-between w-full">
              <Switch
                value={context?.controlPanel?.heater}
                onChange={() =>
                  context?.controlPanelChange({
                    heater: !context?.controlPanel.heater,
                  })
                }
              />
              Fyr
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
