import { IconCirclePlus, IconClipboard, IconEraser, IconPencil } from "@tabler/icons-react";
import { addElevator, deleteElevator } from "../Endpoints";
import ChangeElevator from "./ChangeElevator";
import axios from "axios";
import { useEffect, useState } from "react";

const SingleElevator = (props) => {
    const [data, setData] = useState(null);

    const createElevatorInDB = () => {
        axios.put(addElevator).then((response) => {
            setData(response.data);
        });
    }

    useEffect(() => {
        setData(props.elevator);
    }, [props.elevator]);

    const deleteElevatorFromDB = () => {
        axios.delete((deleteElevator + data.id)).then(() => {
            setData(null);
        });
    }

    const copyToClipbord = () => {
        navigator.clipboard.writeText(data.id + " | " + data.actualFloor + " | " + data.nextFloor);
    }

    const startChange = () => {
        
        props.setBackgroundElement(<ChangeElevator key={data.id} elevator={data} setBackgroundElement={props.setBackgroundElement}/>);
    }

    return (
        <div onClick={data == null ? createElevatorInDB : null} className={`relative h-24 w-full bg-zinc-100 rounded-lg shadow-xl flex flex-col items-center justify-center gap-3 flex-shrink-0 md:h-32 ${data == null && 'cursor-pointer'}`}>
        
            {              
                data == null ?
                <div>
                    <IconCirclePlus size="48" />
                    <p className="font-semibold text-l">Dodaj</p>
                </div>
                :
                <div className="w-full h-full group flex justify-center items-center">
                    <div className="bg-zinc-300 h-full w-full hidden absolute group-hover:flex justify-center">
                        <div className="z-10 h-full lg:h-full w-3/4 lg:w-1/2 flex justify-between items-center">
                        <div onClick={startChange} className="z-10 cursor-pointer border-2 border-zinc-100 p-2 hover:brightness-110 transition duration-300"><IconPencil/></div>
                        <div onClick={copyToClipbord} className="z-10 cursor-pointer border-2 border-zinc-100 p-2 hover:brightness-110 transition duration-300"><IconClipboard/></div>
                        <div onClick={deleteElevatorFromDB} className="z-4 cursor-pointer border-2 border-zinc-100 p-2 hover:brightness-200 transition duration-100"><IconEraser/></div>
                        </div>
                    </div>
                    <div className="flex flex-col z-2 group-hover:blur-[6px] w-full items-center">
                        <p className="text-2xl">Winda nr {props.number}</p>
                        <div className="flex justify-evenly w-[90%]">
                            <span className="w-[33vw]">
                                    <p className=" text-lg">Id:</p>
                                    <p className=" text-lg">{data.id}</p>
                            </span>
                            <span className="w-[33vw]">
                                    <p className=" text-lg">Piętro:</p>
                                    <p className=" text-lg">{data.actualFloor}</p>
                            </span>
                            <span className="w-[33vw]">
                                    <p className=" text-lg">Następne:</p>
                                    <p className=" text-lg">{data.nextFloor === null ? "Oczekiwanie" : data.nextFloor}</p>
                            </span>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default SingleElevator;