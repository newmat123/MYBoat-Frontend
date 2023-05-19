function Warning(props: {
    children: string;
    show: boolean;
    onClk: () => void;
}) {
    return (
        <>
            {props.show &&
                <div className="relative mt-12 -mb-12">
                    <div className="font-regular relative block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">{props.children}</div>
                    <button onClick={props.onClk}>
                        <img src="close.png" alt="" className=" absolute w-7 top-1 right-1" />
                    </button>
                </div>
            }
        </>
    );
}

export default Warning;