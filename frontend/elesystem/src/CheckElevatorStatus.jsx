import { useEffect, useState } from "react";
import SingleElevator from "./SingleElevator";
import axios from "axios";
import { allElevators} from "./Endpoints";
import { IconArrowLeft, IconHelp } from "@tabler/icons-react";
import { Link, useOutletContext } from "react-router-dom";
import Help from "./Help";

const CheckElevatorStatus = () => {

    const [elevators, setElevators] = useState([]);
    const {setBackgroundElement} = useOutletContext();

    const callHelp = () => {

        let info = 
        [
            "Przycisk dodaj - Dodaje nową windę i wyświetla informacje:",
            <br></br>,
            "Id: Unikatowy numer windy",
            <br></br>,
            "Piętro: Aktualne piętro, na którym znajduje się winda",
            <br></br>,
            "Następne: Piętro, do którego w następnej kolejności uda się winda",
            <br></br>,
            "Po najechaniu na dodaną windę, pojawią się trzy przyciski:",
            <br></br>,
            "Ołówek: Zmiana danych aktualnego i następnego piętra",
            <br></br>,
            "(pozostawienia następnego jako puste pole usuwa kolejkę windy)",
            <br></br>,
            "Tabliczka: Kopiuje widoczne informacje do schowka",
            <br></br>,
            "Gumka: Usuwa windę i pokazuje przycisk dodaj"
        ];

        setBackgroundElement(<Help key={0} info={info}/>)
    }

    // Ładowanie wind
    
    const getAllElevatorsFromDB = () => {
        axios.post(allElevators).then((response) => {
            let responseData = response.data;
            let elevatorsArray = [];
            responseData.map((single) => elevatorsArray.push(single));
            setElevators(elevatorsArray);
        }).catch((error) =>{
            console.log(error);
        });

    }

    useEffect(() => {
        getAllElevatorsFromDB();
    }, []);

    // render wind

    let singleElevatorComponents = [];

    for (let i = 0; i < 16; i++) {
        singleElevatorComponents.push(<SingleElevator key={i} elevator={elevators[i]} number={i+1} setBackgroundElement={setBackgroundElement}/>);
    }

    return (
        <div className="w-full h-full flex flex-col justify-evenly items-center relative">
            <div className=" h-11/12 gap-2 lg:gap-0 w-[60%] flex flex-row items-end justify-center">
            <Link to={'/menu'}>
                     <div className="hover:brightness-110 shadow-xl transition duration-300 cursor-pointer flex items-center gap-4 bg-gradient-to-br from-sky-600 to-sky-800 text-lg rounded-xl my-5 text-white justify-center p-3"><IconArrowLeft /> <p className="hidden lg:block">Menu</p></div>
                </Link>
                <p className="text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-sky-800 text-4xl lg:text-6xl py-5 lg:py-5 lg:mx-10"><span className="font-bold">ELES</span>ystem</p>
                <div onClick={callHelp} className="hover:brightness-110 shadow-xl transition duration-300 cursor-pointer flex items-center gap-4 bg-gradient-to-br from-sky-600 to-sky-800 text-lg rounded-xl my-5 text-white justify-center p-3">
                    <IconHelp/><p className="hidden lg:block">Pomoc</p>
                </div>
            </div>
            <div className="w-full overflow-y-scroll lg:overflow-auto lg:flex lg:items-center ">
                <div className="w-full flex flex-col px-4 gap-2 lg:grid lg:grid-cols-4 lg:gap-4">
                    {singleElevatorComponents}
                </div>
            </div>
        </div>
    );
}

export default CheckElevatorStatus;