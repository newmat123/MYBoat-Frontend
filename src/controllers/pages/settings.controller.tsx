import { createContext, useEffect, useState } from "react";

import { contextType_, data_ } from "../../shared/types/settings.types";
import SettingsComponent from "../../components/settingsComponent";
import { API } from "../../apis/serverAPI";

export const Context = createContext<contextType_ | null>(null);

export const SettingsPagesController = () => {
	const [displayWify, setDisplayWify] = useState(false);
	const [wifiStatus, setWifiStatus] = useState(false);
	const [espTime, setEspTime] = useState<string>();

	const [data, setData] = useState<data_>({
		ssid: "",
		pwd: "",
	});

	const handleSubmit = async () => {
		if (data.ssid.trim() === "" || data.pwd.trim() === "") {
			return;
		}
		API.putWifiCredentials(data.ssid, data.pwd);
	};

	const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		console.log(new Date());

		API.getWifiStatus().then((res) => {
			setWifiStatus(res.wifiStatus);
			setEspTime(res.espDateTime);
			setDisplayWify(true);
			API.putTime(new Date());
		});
	}, []);

	const context = {
		handleSubmit,
		handleOnchange,
		displayWify,
		wifiStatus,
		espTime,
		data,
	};
	return (
		<Context.Provider value={context}>
			<SettingsComponent />
		</Context.Provider>
	);
};
