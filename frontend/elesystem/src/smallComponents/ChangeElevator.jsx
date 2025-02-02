import axios from "axios";
import { useRef } from "react";
import { changeElevator} from "../Endpoints";

const ChangeElevator = (props) => {

    const changeActualFloor = useRef("changeActualFloor");
    const changeNextFloor = useRef("changeNextFloor");

    const changeElevatorInDB = () => {

        let actual = parseInt(changeActualFloor.current.value);
        let next = parseInt(changeNextFloor.current.value)

        let toChangeElevator = props.elevator;

        if(isNaN(actual)) {
            alert("Podaj prawidłowe dane")
        } else if(actual === next) {
            alert("Aktualne i następne piętro nie mogą być takie same")
        }else if((actual < 0 || actual > 5)) {
            alert("Wybierz aktualne piętro w zakresie 0-5");
        } else {

            toChangeElevator.actualFloor = actual;

            if(!isNaN(next)){
                if((next < 0 || next > 5)) {
                    alert("Wybierz następne piętro w zakresie 0-5");
                    return;
                }
                toChangeElevator.nextFloor = next;

                if(toChangeElevator.queue.indexOf(next) == -1) {
                    toChangeElevator.queue.push(next);
                }
            } else {
                toChangeElevator.nextFloor = null; 
                toChangeElevator.queue = [];
                toChangeElevator.direction = null;
            }

            axios.put(changeElevator, toChangeElevator).then(() => {
                props.setBackgroundElement("");
            });
        }
    }

    return(
        <div className="flex flex-col items-center justify-between">
            <p className="text-3xl text-white p-5">Winda id <span id="currentId">{props.elevator.id}</span></p>
            <div className="flex flex-row gap-10">
                <label className="flex flex-col text-white text-lg">
                    Aktualne piętro:
                    <input className="rounded-lg text-black m-4" min={0} max={5} type="number" defaultValue={props.elevator.actualFloor} name="changeActualFloor" id="changeActualFloor" ref={changeActualFloor}/>
                </label>
                <label className="flex flex-col text-white text-lg">
                    Następne piętro:
                    <input className="rounded-lg text-black m-4" min={0} max={5} type="number" defaultValue={props.elevator.nextFloor} name="changeNextFloor" id="changeNextFloor" ref={changeNextFloor}/>
                </label>
            </div>
            <div onClick={changeElevatorInDB} className="m-5 w-52 h-fit text-white bg-gradient-to-br from-sky-600 to-sky-800 p-3 rounded-lg hover:brightness-110 shadow-xl transition duration-300 cursor-pointer">Zapisz</div>
        </div>
    );

}
export default ChangeElevator;