import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faWifi } from "@fortawesome/free-solid-svg-icons"; // import the icons you need

import WifiConnect from "./wifi";
import { Context } from "../controllers/pages/settings.controller";
import { useContext } from "react";

function SettingsComponent() {
	const context = useContext(Context);

	return (
		<div className="flex flex-col h-screen justify-between">
			<header className="flex justify-between m-5">
				<h1 className="text-3xl font-extrabold">Settings</h1>
				{context?.wifiStatus && (
					<FontAwesomeIcon className="text-5xl" icon={faWifi} />
				)}
			</header>
			{context?.espTime && (
				<div
					className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
					role="alert"
				>
					<span className="font-medium">ESP time: </span> {context?.espTime}
				</div>
			)}
			{context?.displayWify && <WifiConnect />}

			<footer>
				<div className="flex justify-between m-5">
					<div></div>
					<Link to={"/"} className="">
						<FontAwesomeIcon className="text-5xl" icon={faBackward} />
					</Link>
				</div>
			</footer>
		</div>
	);
}

export default SettingsComponent;
