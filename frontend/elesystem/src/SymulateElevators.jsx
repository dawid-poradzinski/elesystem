import { IconArrowLeft, IconArrowNarrowLeft, IconArrowNarrowRight, IconHelp } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { symulate } from "./Endpoints";
import Help from "./Help";
import axios from "axios";

function SymulateElevators() {

    const [selectedNumber, setSelectedNumber] = useState(1);
    const {setBackgroundElement} = useOutletContext();

    const callHelp = () => {

        let info = 
        [
            "Menu pozwalające na sumulacje od 1 do 10 następnych ruchów windy",
        ];

        setBackgroundElement(<Help key={0} info={info}/>)
    }

    const changeSelectedNumber = (e) => {

        let number = selectedNumber + e;

        if(number < 1) {
            number = 10;
        }else if(number > 10) {
            number = 0;
        }

        setSelectedNumber(number);

    }

    const sumulateElevators = () => {
        axios.post(symulate + selectedNumber).then(() => {
            alert("Symulacja przebiegła pomyślnie");
        })
    }

    return ( 
        <div className="w-full h-full flex flex-col justify-evenly items-center relative">
            <div className=" h-1/12 w-[60%] gap-2 lg:gap-0 flex flex-row items-center justify-evenly">
                <Link to={'/menu'}>
                     <div className="hover:brightness-110 shadow-xl transition duration-300 cursor-pointer flex items-center gap-4 bg-gradient-to-br from-sky-600 to-sky-800 text-lg rounded-xl my-5 text-white justify-center p-3"><IconArrowLeft /><p className="hidden lg:block">Menu</p></div>
                </Link>
                <p className="text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-sky-800 text-4xl lg:text-6xl py-5 lg:py-5 lg:mx-10"><span className="font-bold">ELES</span>ystem</p>
                <div className="hover:brightness-110 shadow-xl transition duration-300 cursor-pointer flex items-center gap-4 bg-gradient-to-br from-sky-600 to-sky-800 text-lg rounded-xl my-5 text-white justify-center p-3" onClick={callHelp}>
                    <IconHelp/><p className="hidden lg:block">Pomoc</p>
                </div>
            </div>
            <div className="w-full h-full items-center justify-center flex">
                <div className="w-11/12 lg:w-1/4 h-3/4 rounded-xl flex flex-col bg-gradient-to-tr from-zinc-100 to-zinc-200 items-center  justify-evenly">
                    <div className="flex flex-col items-center w-11/12 justify-center">
                        <p className="text-xl my-4">Liczba Ruchów Do Symulacji:</p>
                        <div className="flex items-center h-10 w-full justify-between px-3 bg-zinc-300 rounded-lg">
                            <IconArrowNarrowLeft className="select-none cursor-pointer" onClick={() => changeSelectedNumber(-1)}/>
                            <span className="text-xl font-bold">{selectedNumber}</span>
                            <IconArrowNarrowRight className="select-none cursor-pointer" onClick={() => changeSelectedNumber(1)}/>
                        </div>
                    </div>
                    <div onClick={sumulateElevators} className="flex items-center gap-4 w-1/2 bg-gradient-to-br from-sky-600 to-sky-800 text-lg rounded-xl my-5 text-white justify-center p-3 hover:brightness-110 shadow-xl transition duration-300 cursor-pointer">
                        Symuluj
                    </div>
                </div>
            </div>
        </div>
     );
}

export default SymulateElevators;