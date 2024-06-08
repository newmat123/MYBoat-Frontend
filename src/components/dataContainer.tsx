import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { Context } from "../controllers/pages/main.controller";

function DataContainer(props: { showDropDown: boolean; children: ReactNode }) {
	const context = useContext(Context);
	const [height, setHeight] = useState<number>(0);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (props.showDropDown && ref.current !== null) {
			setHeight(ref.current.getBoundingClientRect().height);
		} else {
			setHeight(0);
		}
	}, [props.showDropDown, props.children]);

	try {
		return ReactDOM.createPortal(
			<div
				className="w-full bg-[#303030] overflow-hidden"
				style={{ height, transition: "height 0.2s ease-in-out" }}
			>
				<div ref={ref}>{props.children}</div>
			</div>,
			document.getElementById("displayDataPortal") as HTMLElement
		);
	} catch {
		return null;
	}
}

export default DataContainer;
