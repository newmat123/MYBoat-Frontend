import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../controllers/pages/main.controller";

function DataContainer(Props: {
    showDropDown: boolean;
    children: ReactNode;
}) {
    const context = useContext(Context);
    const [height, setHeight] = useState<number>(0);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (Props.showDropDown && ref.current !== null) {
            setHeight(ref.current.getBoundingClientRect().height);
        } else {
            setHeight(0);
        }
    }, [context?.selectedControl]);
    return (
        <div className="w-full bg-[#212121] overflow-hidden" style={{ height, transition: "height 0.2s ease-in-out", }}>
            <div ref={ref}>
                {Props.children}
            </div>
        </div>
    );
}

export default DataContainer;