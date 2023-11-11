import { createContext, useState } from "react";

import { contextType_, data_ } from "../../shared/types/settings.types";
import SettingsComponent from "../../components/settingsComponent";

export const Context = createContext<contextType_ | null>(null);

function SettingsPagesController() {
  const [data, setData] = useState<data_>({
    ssid: "",
    pwd: "",
  });

  const handleSubmit = async () => {
    console.log("Post handler was called!");
    // ClientApi.postWifiCredentials(data.ssid, data.pwd);
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const context = {
    handleSubmit,
    handleOnchange,
    data,
  };
  return (
    <Context.Provider value={context}>
      <SettingsComponent />
    </Context.Provider>
  );
}

export default SettingsPagesController;
