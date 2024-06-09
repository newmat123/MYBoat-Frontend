import { createContext, useState } from "react";

import { API } from "../../apis/serverAPI";
import { contextType_, data_, switch_ } from "../../shared/types/main.types";
import MainComponent from "../../components/mainComponent";

export const Context = createContext<contextType_ | null>(null);

export const MainPagesController = () => {
	const [data, setData] = useState<data_>({
		bilgeStatus: undefined,
		temperature: undefined,
		heat: undefined,
		humidity: undefined,
	});

	const [selectedControl, setSelectedControl] = useState<string | undefined>();
	const [waitingForRes, setWaitingForRes] = useState(false);
	const [controlPanel, setControlPanel] = useState<switch_[]>([
		{
			id: 0,
			switchName: "switch1",
			state: false,
		},
		{
			id: 1,
			switchName: "switch2",
			state: false,
		},
		{
			id: 2,
			switchName: "switch3",
			state: false,
		},
		{
			id: 3,
			switchName: "switch4",
			state: false,
		},
	]);

	const resetBilgeStatus = async () => {
		console.log("resetWarning handler was called!");
		const bilgeStatus = await API.resetBilgeStatus();
		setData((prev) => ({
			...prev,
			bilgeStatus: bilgeStatus,
		}));
	};

	const getTemperature = async () => {
		const temperature = await API.getTemperature();
		setData((prev) => ({
			...prev,
			temperature: temperature,
		}));
	};

	const getHeat = async () => {
		const heat = await API.getHeat();
		setData((prev) => ({
			...prev,
			heat: heat,
		}));
	};

	const getHumidity = async () => {
		const humidity = await API.getHumidity();
		setData((prev) => ({
			...prev,
			humidity: humidity,
		}));
	};

	const getBilgeStatus = async () => {
		const bilgeStatus = await API.getBilgeStatus();
		setData((prev) => ({
			...prev,
			bilgeStatus: bilgeStatus,
		}));
	};

	const changeSelected = (selected: boolean, str: string) => {
		if (selected) {
			setSelectedControl(undefined);
		} else {
			setSelectedControl(str);
		}
	};

	const onSwitchChange = async (concreteSwitch: switch_) => {
		const originalControlPanel = controlPanel;

		setControlPanel((prevSwitches) =>
			prevSwitches.map((switchItem) =>
				switchItem.id === concreteSwitch.id ? concreteSwitch : switchItem
			)
		);

		setWaitingForRes(true);
		const res = await API.postControlPanel(concreteSwitch);
		if (!res) {
			setControlPanel(originalControlPanel);
		}
		setWaitingForRes(false);
	};

	const context = {
		getTemperature,
		getHeat,
		getHumidity,
		getBilgeStatus,
		resetBilgeStatus,
		changeSelected,
		setSelectedControl,
		onSwitchChange,
		data,
		controlPanel,
		selectedControl,
		waitingForRes,
	};

	return (
		<Context.Provider value={context}>
			<MainComponent />
		</Context.Provider>
	);
};
