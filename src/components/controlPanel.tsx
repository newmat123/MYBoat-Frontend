import { Switch } from "@mui/material";
import { useContext, useEffect } from "react";
import { Context } from "../controllers/pages/main.controller";
import { switch_ } from "../shared/types/main.types";

export const ControlPanel = (props: {}) => {
	const context = useContext(Context);

	useEffect(() => {
		console.log("controlPanel");
		console.log(context?.controlPanel);
	}, [context?.controlPanel]);
	return (
		<div className=" text-center">
			<h1>Kontrol panel</h1>

			<div className="grid grid-cols-2 gap-3 m-7">
				{context?.controlPanel.map((sw) => (
					<PanelSwitch
						key={sw.id}
						concreteSwitch={sw}
						onSwitchChange={context?.onSwitchChange}
						disabled={context?.waitingForRes}
					/>
				))}
			</div>
		</div>
	);
};

const PanelSwitch = (props: {
	concreteSwitch: switch_;
	onSwitchChange: (val: switch_) => void;
	disabled: boolean;
}) => {
	return (
		<div className=" flex justify-center bg-[#383838] p-3 m-auto rounded-xl shadow-inner">
			<Switch
				value={props.concreteSwitch.state}
				disabled={props.disabled}
				onChange={() =>
					props.onSwitchChange({
						...props.concreteSwitch,
						state: !props.concreteSwitch.state,
					})
				}
			/>
			{props.concreteSwitch.switchName}
		</div>
	);
};
