import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";

import Main from "./pages/main";
import Settings from "./pages/settings";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Main />} />

					<Route path="/settings" element={<Settings />} />

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
