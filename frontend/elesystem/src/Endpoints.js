const allElevators = "http://localhost:8080/elevator/get/all";
const changeElevator = "http://localhost:8080/elevator/change";
const addElevator = "http://localhost:8080/elevator/add";
const deleteElevator = "http://localhost:8080/elevator/delete/";
const changeQueue = "http://localhost:8080/elevator/queue/change/";
const elevatorsOnFloor = "http://localhost:8080/elevator/get/byActualFloor/";
const symulate = "http://localhost:8080/elevator/symulate/";
const callOnFloor = "http://localhost:8080/elevator/queue/call/";
const findByFloorInQueue = "http://localhost:8080/elevator/get/byFloorInQueue/";

export {allElevators, addElevator, deleteElevator, changeElevator, changeQueue, elevatorsOnFloor, symulate, callOnFloor, findByFloorInQueue}