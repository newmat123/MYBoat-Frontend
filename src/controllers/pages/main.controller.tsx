import { createContext, useEffect, useState } from "react";

import { ClientApi } from "../../apis/clientAPI";
import { contextType_, controls, data_ } from "../../shared/types/main.types";
import MainComponent from "../../components/mainComponent";

export const Context = createContext<contextType_ | null>(null);

function MainPagesController() {
  const [data, setData] = useState<data_>({
    waterInBilge: false,
    temperature: undefined,
    humidity: undefined,
    heat: undefined,
  });

  const [selectedControl, setSelectedControl] = useState<controls>();

  const resetBilgeStatus = async () => {
    // console.log("resetWarning handler was called!");
    // setData({
    //   ...data,
    //   waterInBilge: await ClientApi.resetBilgeStatus(),
    // });
  };

  const handleClkEvent = async () => {
    switch (selectedControl) {
      case "temperature":
        const temperature = await ClientApi.getTemperature();
        setData((prev) => ({
          ...prev,
          temperature: temperature,
        }));
        break;
      case "heat":
        const heat = await ClientApi.getHeat();
        setData((prev) => ({
          ...prev,
          heat: heat,
        }));
        break;
      case "humidity":
        const humidity = await ClientApi.getHumidity();
        setData((prev) => ({
          ...prev,
          humidity: humidity,
        }));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (typeof selectedControl !== undefined) {
      handleClkEvent();
    }
  }, [selectedControl]);

  const context = {
    resetBilgeStatus,
    setSelectedControl,
    data,
    selectedControl,
  };

  return (
    <Context.Provider value={context}>
      <MainComponent />
    </Context.Provider>
  );
}

export default MainPagesController;
