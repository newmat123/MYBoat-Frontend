import { ThreeCircles } from "react-loader-spinner";
import { environment_ } from "../shared/types/shared.types";
import "./toggle/style.css";
import { useContext } from "react";
import { Context } from "../controllers/pages/main.controller";

function BilgeDisplay(props: { data: environment_ }) {
	const context = useContext(Context);
	const displayWarning = props.data
		? props.data[0].bilgeStatus
			? true
			: false
		: false;

	return props.data !== undefined ? (
		<div className="flex flex-col justify-center py-10">
			<div
				onClick={() => {
					displayWarning ? context?.resetBilgeStatus() : console.log("cliked");
				}}
				className={`toggle${displayWarning ? " night" : ""}`}
			>
				<div className="notch">
					<div className="crater" />
					<div className="crater" />
				</div>
				<div>
					<div className="shape sm" />
					<div className="shape sm" />
					<div className="shape md" />
					<div className="shape lg" />
				</div>
			</div>
			<div className=" w-full flex justify-center">
				<h2>{displayWarning ? "Water in the bilge!" : "All Dry"}</h2>
			</div>
		</div>
	) : (
		<div className="flex justify-center py-10">
			<ThreeCircles
				height="60"
				width="60"
				color="#006700"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="three-circles-rotating"
				outerCircleColor=""
				innerCircleColor=""
				middleCircleColor=""
			/>
		</div>
	);
}
export default BilgeDisplay;
