import { createContext, useEffect, useState } from "react";
import MainComponent from "../../components/mainComponent";
import { ClientApi } from "../../apis/clientAPI";

type controls =
  | "wifi"
  | "control"
  | "temperature"
  | "humidity"
  | "heat"
  | "keel"
  | undefined;

export type environment_ =
  | {
      temperature?: number;
      heat?: number;
      humidity?: number;
      bilgeStatus?: boolean;
      timestamp?: string;
    }[]
  | undefined;

// export type temperature_ =
//   | { temperature?: number; timestamp?: string }[]
//   | undefined;
// export type heat_ = { heat?: number; timestamp?: string }[] | undefined;
// export type humidity_ = { humidity?: number; timestamp?: string }[] | undefined;

export type data_ = {
  // requestSuccess: boolean;
  wifiStatus: boolean;
  ssid: string;
  pwd: string;
  waterInBilge: boolean;
  temperature: environment_;
  heat: environment_;
  humidity: environment_;
};

type contextType_ = {
  resetBilgeStatus: () => void;
  handleSubmit: () => void;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedControl: (con: controls) => void;
  data: data_;
  selectedControl: controls;
};

export const Context = createContext<contextType_ | null>(null);

function MainPagesController() {
  const [data, setData] = useState<data_>({
    // requestSuccess: true,
    wifiStatus: false,
    ssid: "",
    pwd: "",
    waterInBilge: false,
    temperature: undefined,
    humidity: undefined,
    heat: undefined,
  });

  const [selectedControl, setSelectedControl] = useState<controls>();

  // const onFetchEvent = () => {
  //     !data.requestSuccess && setData({
  //         ...data,
  //         requestSuccess: true
  //     });
  // }

  const resetBilgeStatus = async () => {
    // onFetchEvent();
    // console.log("resetWarning handler was called!");
    // setData({
    //   ...data,
    //   waterInBilge: await ClientApi.resetBilgeStatus(),
    // });
  };

  const handleSubmit = async () => {
    // onFetchEvent();
    console.log("Post handler was called!");
    // ClientApi.postWifiCredentials(data.ssid, data.pwd);
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
    handleSubmit,
    handleOnchange,
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
