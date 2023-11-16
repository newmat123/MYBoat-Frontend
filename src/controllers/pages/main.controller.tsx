import { createContext, useState } from "react";

import { ServerAPI } from "../../apis/serverAPI";
import { contextType_, data_ } from "../../shared/types/main.types";
import MainComponent from "../../components/mainComponent";

export const Context = createContext<contextType_ | null>(null);

function MainPagesController() {
  const [data, setData] = useState<data_>({
    bilgeStatus: undefined,
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
    const temperature = await ServerAPI.getTemperature();
    setData((prev) => ({
      ...prev,
      temperature: temperature,
    }));
  };

  const getHeat = async () => {
    const heat = await ServerAPI.getHeat();
    setData((prev) => ({
      ...prev,
      heat: heat,
    }));
  };

  const getHumidity = async () => {
    const humidity = await ServerAPI.getHumidity();
    setData((prev) => ({
      ...prev,
      humidity: humidity,
    }));
  };

  const getBilgeStatus = async () => {
    const bilgeStatus = await ServerAPI.getBilgeStatus();
    setData((prev) => ({
      ...prev,
      bilgeStatus: bilgeStatus,
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
    getBilgeStatus,
    resetBilgeStatus,
    changeSelected,
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
