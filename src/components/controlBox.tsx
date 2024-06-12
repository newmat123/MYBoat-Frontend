import { ReactNode, useContext } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeaf } from "@fortawesome/free-solid-svg-icons";

import DataContainer from "./dataContainer";
import { Context } from "../controllers/pages/main.controller";

function ControlBox(props: {
	title: string;
	icon?: IconDefinition;
	onOpen?: () => void;
	children?: ReactNode;
}) {
	const context = useContext(Context);
	const selected = props.title === context?.selectedControl;

	return (
		<>
			<div className="flex w-full h-full justify-center">
				<div
					className="flex flex-col w-24 h-24 my-2 rounded-md justify-center p-2"
					onClick={() => {
						context?.changeSelected(selected, props.title);
						props.onOpen && !selected && props.onOpen();
					}}
					style={{
						backgroundColor: selected ? "#00AA00" : "#006700",
					}}
				>
					<FontAwesomeIcon className="text-5xl" icon={props.icon ?? faDeaf} />
					<h1>{props.title}</h1>
				</div>
			</div>
			<DataContainer showDropDown={selected}>{props.children}</DataContainer>
		</>
	);
}

export default ControlBox;
