import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

import { useEffect, useState } from "react";
import { allElevators, changeQueue} from "./Endpoints";
import axios from "axios";
import CallSingleElevator from "./CallSingleElevator";

function InElevator() {

    const [elevators, setElevators] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState(parseInt(0));
    const [currentElevator, setCurrentElevator] = useState(null);
    const [currentQueue, setCurrentQueue] = useState([]);

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
    }, [currentQueue]);

    useEffect(() => {
        if(currentElevator != null) {
            setCurrentQueue(currentElevator.queue);
        }
    }, [currentElevator])

    const changeSelectedFloor = (e) => {

        let number = selectedFloor + e;

        if(number < 0) {
            number = 5;
        }else if(number > 5) {
            number = 0;
        }

        setSelectedFloor(number);

    }

    const callElevator = () => {

        currentQueue.push(selectedFloor);

        setCurrentQueue( currentQueue => [...currentQueue]);

        axios.put(changeQueue + currentElevator.id + "/" + selectedFloor).then((response) => {
            setCurrentElevator(response.data);
        })

    }

    let singleElevators = [];

    for(let i = 0; i < elevators.length; i++) {
        singleElevators.push(<CallSingleElevator key={i} elevator={elevators[i]} setCurrentElevator={setCurrentElevator}/>)
    }

    let alreadyCalled = currentElevator == null || selectedFloor === currentElevator.actualFloor || currentQueue.indexOf(selectedFloor) !== -1;

    return ( 
        <div className="flex flex-col lg:flex-row h-full w-full">
            <div className="py-10 lg:py-0 relative w-full lg:w-1/2 h-full flex justify-center items-center">
                <div className="lg:gap-0 gap-5 bg-gradient-to-br from-zinc-100 to-zinc-300 h-full lg:h-5/6 w-5/6 lg:w-2/3 flex flex-col items-center rounded-lg justify-evenly">
                    <p className="text-xl lg:text-4xl text-black p-6 font-semibold">Aktualnie wybrana<br></br> winda: <span>{currentElevator != null ? currentElevator.id : "Brak"}</span></p>
                    
                    <div className="flex flex-col items-center w-11/12 justify-center">
                        <p>Wybór piętra:</p>
                        <div className="flex items-center h-10 w-full justify-between px-3 bg-zinc-300 rounded-lg">
                            <IconArrowNarrowLeft className="select-none cursor-pointer" onClick={() => changeSelectedFloor(-1)}/>
                            <span className="text-xl font-bold">{selectedFloor}</span>
                            <IconArrowNarrowRight className="select-none cursor-pointer" onClick={() => changeSelectedFloor(1)}/>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-11/12 justify-center">
                        <p>Aktualna kolejka:</p>
                        <div className="flex h-10 px-3 w-full bg-zinc-300 rounded-lg items-center">
                            <span className="text-xl w-full font-bold flex items-center justify-center">{currentQueue.length != 0 ? currentQueue : "Brak"}</span>
                        </div>
                    </div>


                            <div className="lg:m-0 mb-4 bg-gradient-to-tr from-zinc-500 to-zinc-600 w-16 h-16 rounded-3xl flex items-center justify-center">
                                <div onClick={!alreadyCalled ? callElevator : null} className={`bg-gradient-to-tr from-zinc-300 to-zinc-400 w-12 h-12 rounded-2xl
                                 ${alreadyCalled ? "border-green-500/40 border-4 cursor-default" : "cursor-pointer"}`}>

                                </div>
                            </div>
                </div>
        </div>

        <div className="w-full lg:w-1/2 h-full flex-col flex items-center justify-center">
        <p className="p-4 text-xl w-full lg:w-fit">Wszystkie windy:</p>
                    <div className="w-11/12 lg:w-1/2 h-full lg:h-5/6 overflow-y-auto flex flex-col relative items-center justify-start px-4 space-y-5">
                        {singleElevators}
                    </div>
        </div>
        </div>
     );
}

export default InElevator;