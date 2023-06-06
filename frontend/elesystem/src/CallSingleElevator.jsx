import { useEffect, useState } from "react";

function CallSingleElevator(props) {
    
    const [data, setData] = useState(null);
    
    useEffect(() => {
        setData(props.elevator);
    }, [props.elevator])

    return (  
        data != null &&(
        <div onClick={() => props.setCurrentElevator(data)} className="w-full rounded-lg bg-gradient-to-tr from-zinc-100 to-zinc-200 p-2 cursor-pointer flex flex-col">
            <div className=" text-lg">
                Winda ID {data.id}
            </div>
            <div className="flex flex-row items-center justify-around">
                <div className="flex flex-col">
                    <p>Aktualne piętro</p>
                    <p>{data.actualFloor}</p>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <p>Kolejka</p>
                        <p>{ data.queue.length != 0 ? data.queue : "Brak"}</p>
                    </div>
                </div>
            </div>
        </div>
        )
    );
}

export default CallSingleElevator;