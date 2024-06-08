import { environment_ } from "../shared/types/shared.types";

function Warning(props: {
	children: string;
	show: environment_;
	onClk: () => void;
}) {
	const show = props.show === undefined ? false : props.show[0].bilgeStatus;

	return show ? (
		<div className="flex w-full justify-center absolute top-20 z-50">
			<div className="flex justify-between w-2/3 rounded-lg bg-red-500 p-4 text-white">
				{props.children}
				<button onClick={props.onClk}>X</button>
			</div>
		</div>
	) : (
		<></>
	);
}

export default Warning;
