import { createContext, useState } from "react";

import { ClientApi } from "../../apis/clientAPI";
import { contextType_, data_ } from "../../shared/types/main.types";
import MainComponent from "../../components/mainComponent";

export const Context = createContext<contextType_ | null>(null);

function MainPagesController() {
  const [data, setData] = useState<data_>({
    waterInBilge: false,
    temperature: undefined,
    heat: undefined,
    humidity: undefined,
  });

  const [selectedControl, setSelectedControl] = useState<string | undefined>();

  const resetBilgeStatus = async () => {
    // console.log("resetWarning handler was called!");
    // setData({
    //   ...data,
    //   waterInBilge: await ClientApi.resetBilgeStatus(),
    // });
  };

  const getTemperature = async () => {
    const temperature = await ClientApi.getTemperature();
    setData((prev) => ({
      ...prev,
      temperature: temperature,
    }));
  };

  const getHeat = async () => {
    const heat = await ClientApi.getHeat();
    setData((prev) => ({
      ...prev,
      heat: heat,
    }));
  };

  const getHumidity = async () => {
    const humidity = await ClientApi.getHumidity();
    setData((prev) => ({
      ...prev,
      humidity: humidity,
    }));
  };

  const changeSelected = (selected: boolean, str: string) => {
    if (selected) {
      context?.setSelectedControl(undefined);
    } else {
      context?.setSelectedControl(str);
    }
  };

  const context = {
    getTemperature,
    getHeat,
    getHumidity,
    changeSelected,
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
