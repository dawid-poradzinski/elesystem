import { IconArrowLeft, IconArrowNarrowLeft, IconArrowNarrowRight, IconHelp } from "@tabler/icons-react";
import { Link, useOutletContext } from "react-router-dom";
import InElevator from "./InElevator";
import { useState } from "react";
import OnFloor from "./OnFloor";
import Help from "./Help";

function CallElevator() {

    const [inElevator, setInElevator] = useState(true);
    const {setBackgroundElement} = useOutletContext();

    const changeInElevator = () => {

        setInElevator(!inElevator);

    }

    const callHelp = () => {

        let info = 
        [
            "Przycisk 'W windzie' - Wybranie piętra, do którego ma jechać naciśnięta winda:",
            <br></br>,
            "W windzie:",
            <br></br>,
            "Wybór piętra: Wybranie piętra, na które ma udać się winda",
            <br></br>,
            "Przycisk: Wywołanie funkcji wysłania windy",
            <br></br>,
            "Zielony - nie można / w trakcie",
            <br></br>,
            "Okno pokazuje wszystkie windy",
            <br></br>,
            <br></br>,
            "Przycisk 'Na piętrze' - Wezwanie jednej z wind na piętro",
            <br></br>,
            "Na piętrze:",
            <br></br>,
            "Przycisk w górę - Wezwanie windy, aby pojechać w górę",
            <br></br>,
            "Przycisk w dół - Wezwanie windy, aby pojechać w dół",
            <br></br>,
            "Okno pokazuje wszystkie windy na danym piętrze"
        ];

        setBackgroundElement(<Help key={0} info={info}/>)
    }

    return ( 
        <div className="w-full h-full relative flex flex-col items-center">
            <div className=" h-11/12 gap-2 lg:gap-0 w-[60%] flex flex-row items-end justify-center">
                <Link to={'/menu'}>
                     <div className="hover:brightness-110 shadow-xl transition duration-300 cursor-pointer flex items-center gap-4 bg-gradient-to-br from-sky-600 to-sky-800 text-lg rounded-xl my-5 text-white justify-center p-3"><IconArrowLeft /> <p className="hidden lg:block">Menu</p></div>
                </Link>
                <p className="text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-sky-800 text-4xl lg:text-6xl py-5 lg:py-5 lg:mx-10"><span className="font-bold">ELES</span>ystem</p>
                <div className="hover:brightness-110 shadow-xl transition duration-300 cursor-pointer flex items-center gap-4 bg-gradient-to-br from-sky-600 to-sky-800 text-lg rounded-xl my-5 text-white justify-center p-3" onClick={callHelp}>
                    <IconHelp/><p className="hidden lg:block">Pomoc</p>
                </div>
            </div>
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-auto lg:overflow-clip p-2 lg:p-10 py-10">

                <div className="hover:brightness-110 shadow-xl transition duration-300 cursor-pointer w-11/12 lg:w-1/4 h-10 bg-gradient-to-br from-zinc-300 to-zinc-400 rounded-xl flex flex-row justify-around items-center p-4">
                    <IconArrowNarrowLeft className="cursor-pointer" onClick={changeInElevator}/>
                    <p>
                        {
                            inElevator ? "W windzie" : "Na piętrze"
                        }
                    </p>
                    <IconArrowNarrowRight className="cursor-pointer" onClick={changeInElevator}/>
                </div>

                {inElevator ? <InElevator/> : <OnFloor/>
                }

            </div>
        </div>
     );
}

export default CallElevator;