import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";

const Menu = () => {

    const [backgroundElement, setBackgroundElement] = useState("");
    
    const outlet = useOutlet();


    const editBoxRef = useRef();
    const outletRef = useRef();
    const overlayRef = useRef();

    useEffect(() => {

        if(!backgroundElement) {
            editBoxRef.current.className = editBoxRef.current.className.replace("flex ", "hidden ");
            outletRef.current.className = outletRef.current.className.replace("blur-sm", "");
            overlayRef.current.className = overlayRef.current.className.replace("z-20", "z-0");
        }else {
            editBoxRef.current.className = editBoxRef.current.className.replace("hidden ", "flex ");
            outletRef.current.className += " blur-sm";
            overlayRef.current.className = overlayRef.current.className.replace("z-0", "z-20");
        }
    }, [backgroundElement]);

    useEffect(() => {

        let handler = (e) => {
            if(backgroundElement && !editBoxRef.current.contains(e.target)) {
                setBackgroundElement("");
            }
        }

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }
    })

    return ( 
        <div className="w-full h-full flex justify-center items-center">
            <div ref={overlayRef} className="z-0 w-full h-full absolute">

            </div>
            <div ref={editBoxRef} className="h-fit p-2 z-30 hidden lg:mt-0 lg:absolute top-1/4 left-1/4 lg:w-1/2 lg:h-1/2 bg-gradient-to-br from-zinc-400 rounded-lg to-zinc-500 blur-none flex-col p-0 justify-center items-center shadow-xl w-11/12 min-h-1/2">
                {backgroundElement}
            </div>
            <div  ref={outletRef} className="w-full h-full absolute t-0 l-0 lg:relative">
                {
                outlet != null ? <Outlet context={{setBackgroundElement}}/> : 
                <div className="z-10 flex flex-col w-full h-full items-center justify-evenly">
                    <p className="text-[84px] font-semibold">Menu</p>
                    <div className="w-full flex flex-col items-center gap-10">
                        <Link to={"/menu/elevatorstatus"} className="w-3/4 lg:w-1/4 flex justify-center items-center">
                            <div className="z-30 w-full h-20 flex text-white bg-gradient-to-br from-sky-600 to-sky-800 p-4 items-center justify-center rounded-xl hover:brightness-110 shadow-xl transition duration-300 cursor-pointer">
                                Sprawdź Status Wind
                            </div>
                        </Link>
                        <Link to={"/menu/callelevator"} className="w-3/4 lg:w-1/4 flex justify-center items-center">
                            <div className="z-30 w-full h-20 flex text-white bg-gradient-to-br from-sky-600 to-sky-800 p-4 items-center justify-center rounded-xl hover:brightness-110 shadow-xl transition duration-300 cursor-pointer">
                                Zamów Windę
                            </div>
                        </Link>
                        <Link to={"/menu/symulateelevators"} className="w-3/4 lg:w-1/4 flex justify-center items-center">
                            <div className="z-30 w-full h-20 flex text-white bg-gradient-to-br from-sky-600 to-sky-800 p-4 items-center justify-center rounded-xl hover:brightness-110 shadow-xl transition duration-300 cursor-pointer">
                                Symuluj Ruch Systemu
                            </div>
                        </Link>
                    </div>
                </div>
                }   
            </div>
        </div>
     );
}
 
export default Menu;