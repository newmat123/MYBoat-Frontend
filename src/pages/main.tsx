import MainPagesController from "../controllers/pages/main.controller";

function Main() {
  return (
    <div className="flex justify-center bg-black min-h-screen text-white">
      <div className="flex flex-col justify-between w-screen">
        <MainPagesController />
      </div>
    </div>
  );
}

export default Main;

//design insperation

//colors
//black: #000000
//white: #FFFFFF
//gray: #212121

//darkGreen (no select): #006700
//lightgreen (select): #00AA00
