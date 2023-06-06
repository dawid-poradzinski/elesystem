package dawid.poradzinski.avsystem.sql.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.stereotype.Service;

import dawid.poradzinski.avsystem.sql.models.Elevator;
import dawid.poradzinski.avsystem.sql.repositories.ElevatorRepository;

@Service
public class ElevatorService {
    
    private ElevatorRepository elevatorRepository;

    public ElevatorService(ElevatorRepository elevatorRepository) {
        this.elevatorRepository = elevatorRepository;
    }

    public Elevator addElevator() {

        Elevator ele = new Elevator();
        ele.setActualFloor(0L);
        ele.setQueue(Collections.emptySet());
        return elevatorRepository.save(ele);
    }

    public List<Elevator> getAllElevators() {
        
        return elevatorRepository.findAll();

    }

    public Elevator getElevatorById(Long id) {

        Optional<Elevator> elevatorOpt = elevatorRepository.findById(id);

        if(elevatorOpt.isPresent()) {
            return elevatorOpt.get();
        }

        return null;
    }  

    public Elevator deleteElevatorById(Long id) { 
        Optional<Elevator> elevator = elevatorRepository.findById(id);

        if(elevator.isPresent()) {

            elevatorRepository.deleteById(id);
            return elevator.get();
            
        }

        return null;
    }

    public Elevator changeElevator(Elevator elevator) {
        return elevatorRepository.save(elevator);
    }

    public Elevator updateQueueInElevator(Long id, Long floor) {
        
        Optional<Elevator> elevatorOpt = elevatorRepository.findById(id);

        if(elevatorOpt.isPresent()) {

            Elevator elevator = elevatorOpt.get();

            Set<Long> queue = elevator.getQueue();

            queue.add(floor);

            elevator.setQueue(queue);

            Long nextFloor = elevator.getNextFloor();
            Long actualFLoor = elevator.getActualFloor();

            if(nextFloor == null) {
                elevator.setNextFloor(floor);

                if(actualFLoor < floor) {
                    elevator.setDirection(true);
                } else {
                    elevator.setDirection(false);
                }

            } else {

                if((elevator.getDirection() && nextFloor > floor && floor > actualFLoor) || (!elevator.getDirection() && nextFloor < floor && floor < actualFLoor)) {
                    elevator.setNextFloor(floor);
                }
            }


            return elevatorRepository.save(elevator);
        }

        
        return null;

    }

    public List<Elevator> findElevatorsByActualFloor(Long floor) {

        return elevatorRepository.findByActualFloor(floor);

    }

    public List<Elevator> findElevatorsByFloorInQueue(Long floor) {
        List<Elevator> allElevators = elevatorRepository.findAll();
        List<Elevator> elevatorsWithFloorInQueue = new ArrayList<>();
        
        for (Elevator elevator : allElevators) {
            if(elevator.getQueue().contains(floor)) {
                elevatorsWithFloorInQueue.add(elevator);
            }
        }

        return elevatorsWithFloorInQueue;
    }

    public List<Elevator> findElevatorsByNotFloorInQueue(Long floor) {
        List<Elevator> allElevators = elevatorRepository.findAll();
        List<Elevator> elevatorsWithFloorInQueue = new ArrayList<>();
        
        for (Elevator elevator : allElevators) {
            if(!elevator.getQueue().contains(floor)) {
                elevatorsWithFloorInQueue.add(elevator);
            }
        }

        return elevatorsWithFloorInQueue;
    }
// 
    public List<Elevator> findElevatorsByNotActualFloor(List<Elevator> elevators, Long floor) {

        List<Elevator> notFloor = new ArrayList<>();

        for (Elevator elevator : elevators) {
            if(elevator.getActualFloor() != floor) {
                notFloor.add(elevator);
            }
        }

        return notFloor;
    }

    public Elevator callElevatorOnFloor(Long floor, Boolean direction) {

        List<Elevator> elevators = findElevatorsByNotFloorInQueue(floor);

        elevators = findElevatorsByNotActualFloor(elevators, floor);

        if(elevators.isEmpty()) {
            return null;
        }

        List<Elevator> tryElevators = findByDirection(elevators, direction);

        if(!tryElevators.isEmpty()){
            elevators = tryElevators;

            if(elevators.size() == 1) {

                saveAfterChange(elevators.get(0), floor);
                return elevators.get(0);
            }
        }

        tryElevators = findBySteps(elevators);

        if(tryElevators.size() == 1) {
            saveAfterChange(tryElevators.get(0), floor);
            return tryElevators.get(0);
        }

        elevators = tryElevators;

        Elevator ele = findByClosestActualFloor(elevators, floor);

        saveAfterChange(ele, floor);

        return ele;

    }

    public void saveAfterChange(Elevator elevator, Long floor) {
        if(!elevator.getQueue().isEmpty()) {
            elevator.getQueue().add(floor);

            if((elevator.getDirection() && elevator.getNextFloor() > floor && floor > elevator.getActualFloor()) || (!elevator.getDirection() && elevator.getNextFloor() < floor && floor < elevator.getActualFloor())) {
                elevator.setNextFloor(floor);
            }

        } else {

            elevator.setNextFloor(floor);

            if(floor - elevator.getActualFloor() > 0) {
                elevator.setDirection(true);
            } else {
                elevator.setDirection(false);
            }

            Set<Long> set = new HashSet<>();

            set.add(floor);

            elevator.setQueue(set);
            
        }

        elevatorRepository.save(elevator);
    }

    public Elevator findByClosestActualFloor(List<Elevator> elevators, Long floor) {
        Elevator min = elevators.get(0);

        Long wynik = Math.abs(floor - min.getActualFloor());
        for (int i = 1; i < elevators.size(); i++) {
            if(wynik > Math.abs(floor - elevators.get(i).getActualFloor())) {
                min = elevators.get(i);
                wynik = Math.abs(floor - min.getActualFloor());
            }
        }

        return min;
    }

    public List<Elevator> findByDirection(List<Elevator> elevators, Boolean direciton) {
        
        List<Elevator> list = new ArrayList<>();

        for (Elevator elevator : elevators) {
            if(Objects.equals(elevator.getDirection(), direciton)) {
                list.add(elevator);
            }
        }

        return list;
    }

    public List<Elevator> findBySteps(List<Elevator> elevators) {
       
        Elevator min = elevators.get(0);
        List<Elevator> minList = new ArrayList<>();
        minList.add(min);

        for(int i = 1; i < elevators.size(); i++) {
            if(min.getQueue().size() > elevators.get(i).getQueue().size()) {
                min = elevators.get(i);
                minList.clear();
                minList.add(min);
            } else if(min.getQueue().size() == elevators.get(i).getQueue().size()) {
                minList.add(elevators.get(i));
            }
        }

        return minList;

    }

    public Boolean symulateSystem(Long number) {
        List<Elevator> toSymulateElevators = elevatorRepository.findAll();

        List<Elevator> finalElevators = new ArrayList<>();

        for(int i = 0; i < number; i++) {

            for (int j = 0; j < toSymulateElevators.size(); j++) {

                Elevator elevator = toSymulateElevators.get(j);

                // wywalanie pustych

                if(elevator.getQueue().isEmpty()) {
                    finalElevators.add(elevator);
                    toSymulateElevators.remove(elevator);

                    j--;
                    continue;
                }
                       
                Set<Long> queue = new TreeSet<>(elevator.getQueue());

                Long nextFloor = elevator.getNextFloor();


                // ustawienie nowego floora

                queue.remove(nextFloor);
                elevator.setQueue(queue);
                elevator.setActualFloor(nextFloor);

                // wymiana, jeśli jest pusty

                if(queue.isEmpty()) {
                    elevator.setDirection(null);
                    elevator.setNextFloor(null);
                    finalElevators.add(elevator);
                    toSymulateElevators.remove(elevator);

                    j--;
                    continue;
                }

                // nowy kierunek

                Long newFloor = null;

                
                while (newFloor == null) {

                    if(Boolean.TRUE.equals(elevator.getDirection())) {

                        for (Long floor : queue) {
                            if(floor > nextFloor) {
                                newFloor = floor;
                                break;
                            }    
                        }

                        if(newFloor == null) {
                            elevator.setDirection(false);
                        }
                       
                    } else {

                        ArrayList<Long> reverseQueue = new ArrayList<>(queue);

                        Collections.reverse(reverseQueue);
                        

                        for (Long floor : reverseQueue) {
                            if(floor < nextFloor) {
                                newFloor = floor;
                                break;
                            }    
                        }

                        if(newFloor == null) {
                            elevator.setDirection(true);
                        }
                    }
                }

                elevator.setNextFloor(newFloor);

            }
        }

        if(!toSymulateElevators.isEmpty()) {
            finalElevators.addAll(toSymulateElevators);
        }

        elevatorRepository.saveAll(finalElevators);

        return true;
    }



}
