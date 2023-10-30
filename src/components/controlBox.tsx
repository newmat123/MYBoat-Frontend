import { ReactNode, useContext } from "react";
import { Context } from "../controllers/pages/main.controller";


function ControlBox(Props: {
    selected?: boolean;
    children: ReactNode;
    }) {
    const context = useContext(Context);

    return (
        <>
            { context !== null &&
                <div className="flex w-full h-full justify-center">
                    <div className="flex flex-col w-24 h-24 my-2 rounded-md justify-center p-2" style={{backgroundColor: Props.selected===true? "#00AA00" : "#006700"}}>
                        {Props.children}
                    </div>
                </div>
            }
        </>
    );
}

export default ControlBox;