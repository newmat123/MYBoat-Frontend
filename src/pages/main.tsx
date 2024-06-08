import MainPagesController from "../controllers/pages/main.controller";

function Main() {
	return (
		<div className="flex justify-center bg-[#252525] min-h-screen text-white">
			<div className="flex flex-col justify-between w-screen">
				<MainPagesController />
			</div>
		</div>
	);
}

export default Main;

//design insperation

//colors
//black: #252525
//white: #FFFFFF
//gray: #303030

//darkGreen (no select): #006700
//lightgreen (select): #00AA00
// another green #4fa94d
