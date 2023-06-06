import { IconArrowDown, IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { elevatorsOnFloor, callOnFloor, findByFloorInQueue} from "../Endpoints";
import SingleElevatorOnFloor from "../smallComponents/singleElevatorOnFloor";

function OnFloor() {

    const [elevators, setElevators] = useState([]);
    const [elevatorsOnWay, setElevatorsOnWay] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState(0);

    const getElevatorsOnCurrentFloor = () => {
        axios.post(elevatorsOnFloor + selectedFloor).then((response) => {
            let responseData = response.data;
            let elevatorsArray = [];
            responseData.map((single) => elevatorsArray.push(single));
            setElevators(elevatorsArray);
        }).catch(() =>{
            setElevators([]);
        });

        axios.post(findByFloorInQueue + selectedFloor).then((response) => {
            let responseData = response.data;
            let elevatorsArray = [];
            responseData.map((single) => elevatorsArray.push("#" + single.id + " "));
            setElevatorsOnWay(elevatorsArray);
        }).catch(() =>{
            setElevatorsOnWay([]);
        });
    }    

    useEffect(() => {
        getElevatorsOnCurrentFloor();
    }, [selectedFloor]);

    const changeSelectedFloor = (e) => {

        let number = selectedFloor + e;

        if(number < 0) {
            number = 5;
        }else if(number > 5) {
            number = 0;
        }

        setSelectedFloor(number);

    }

    const callElevator = (e) => {
        axios.put(callOnFloor + selectedFloor + "/" + e).then( (response) => {
            alert("Wysłano windę");
            let ele = elevatorsOnWay;
            ele.push("#" + response.data.id + " ");
            setElevatorsOnWay(elevatorsOnWay => [...ele]);
        }).catch( () => {
            alert("Wszystkie windy są wysłane")
        })
    }

    let singleElevators = [];

    for(const element of elevators) {
        singleElevators.push(<SingleElevatorOnFloor key={element.id} elevator={element}/>);
    }

    return ( 
        <div className="w-full h-full flex flex-col lg:flex-row">
                <div className="py-10 pb-5 lg:py-0 relative w-full lg:w-1/2 h-full flex justify-center items-center">
                    <div className="py-10 lg:py-0 lg:gap-0 gap-5 bg-gradient-to-br from-zinc-100 to-zinc-300 h-full lg:h-5/6 w-5/6 lg:w-2/3 flex flex-col items-center rounded-lg justify-evenly">
                        <p className="text-xl lg:text-4xl text-black p-6 font-semibold">Aktualne piętro: <span>{selectedFloor}</span></p>
                        
                        <div className="flex flex-col items-center w-11/12 justify-center">
                            <p>Wybór piętra:</p>
                            <div className="flex items-center h-10 w-full justify-between px-3 bg-zinc-300 rounded-lg">
                                <IconArrowNarrowLeft className="select-none cursor-pointer" onClick={() => changeSelectedFloor(-1)}/>
                                <span className="text-xl font-bold ">{selectedFloor}</span>
                                <IconArrowNarrowRight className="select-none cursor-pointer" onClick={() => changeSelectedFloor(1)}/>
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-11/12 justify-center">
                            <p>Windy w drodze:</p>
                            <div className="flex min-h-10 h-fit px-3 w-full bg-zinc-300 rounded-lg items-center overflow-auto">
                                <span className="text-xl w-full font-bold flex items-center justify-center">{elevatorsOnWay.length != 0 ? elevatorsOnWay : "Brak"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-around gap-10 lg:gap-20">
                            <div className="lg:m-0 mb-4 bg-gradient-to-tr from-zinc-500 to-zinc-600 w-16 h-16 rounded-3xl flex items-center justify-center">
                                <div onClick={() => callElevator(1)} className={`bg-gradient-to-tr from-zinc-300 to-zinc-400 w-12 h-12 rounded-2xl border-green-500/40 border-4 cursor-pointer flex justify-center items-center`}><IconArrowUp/></div>
                            </div>
                            <div className="lg:m-0 mb-4 bg-gradient-to-tr from-zinc-500 to-zinc-600 w-16 h-16 rounded-3xl flex items-center justify-center">
                                <div onClick={() => callElevator(0)} className={`bg-gradient-to-tr from-zinc-300 to-zinc-400 w-12 h-12 rounded-2xl border-green-500/40 border-4 cursor-pointer flex justify-center items-center`}><IconArrowDown/></div>
                            </div>
                        </div>

                    </div>
            </div>

            <div className="w-full lg:w-1/2 h-full flex items-center justify-center flex-col">
            <p className="p-4 text-xl w-full lg:w-fit">Windy na piętrze:</p>
                    <div className="w-11/12 lg:w-1/2 h-full lg:h-5/6 overflow-y-auto flex flex-col relative items-center justify-start px-4 space-y-5">
                        {singleElevators}
                    </div>
            </div>
        </div>
     );
}

export default OnFloor;