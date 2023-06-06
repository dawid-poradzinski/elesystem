import { useEffect, useState } from "react";

function SingleElevatorOnFloor(props) {
    
    const [data, setData] = useState(null);
    
    useEffect(() => {
        setData(props.elevator);
    }, [props.elevator])

    return (  
        data != null &&(
        <div className="w-full rounded-lg bg-gradient-to-tr from-zinc-100 to-zinc-200 p-2 flex flex-col">
            <div className=" text-lg">
                Winda ID {data.id}
            </div>
            <div className="flex flex-row items-center justify-around">
                <div className="flex flex-col">
                    <p>Następne piętro</p>
                    <p>{data.nextFloor != null ? data.nextFloor : "Brak"}</p>
                </div>
                <div className="flex flex-col">
                    <p>Kolejka</p>
                    <p>{ data.queue.length != 0 ? data.queue : "Brak"}</p>
                </div>
                <div className="flex flex-col">
                    <p>Kierunek</p>
                    <p>{data.direction != null ?
                           data.direction ? "Góra" : "Dół"
                           : "Brak"}</p>
                </div>
            </div>
        </div>
        )
    );
}

export default SingleElevatorOnFloor;