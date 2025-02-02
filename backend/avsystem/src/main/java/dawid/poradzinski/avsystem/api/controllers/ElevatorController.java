package dawid.poradzinski.avsystem.api.controllers;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dawid.poradzinski.avsystem.sql.models.Elevator;
import dawid.poradzinski.avsystem.sql.services.ElevatorService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/elevator")
public class ElevatorController {
    
    private ElevatorService elevatorService;

    public ElevatorController(ElevatorService elevatorService) {
        this.elevatorService = elevatorService;
    }

    @PutMapping("/add")
    public ResponseEntity<Elevator> addElevator() {

        Elevator elevator = elevatorService.addElevator();

        if(elevator != null) {
            return ResponseEntity.ok(elevator);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PutMapping("/change")
    public ResponseEntity<Elevator> changeElevator(@RequestBody Elevator elevator) {
        
        elevator = elevatorService.changeElevator(elevator);

        if(elevator != null) {
            return ResponseEntity.ok(elevator);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PostMapping("/get/all")
    public ResponseEntity<List<Elevator>> getAllElevators() {
        
        List<Elevator> elevators = elevatorService.getAllElevators();

        if(!elevators.isEmpty()) {
            return ResponseEntity.ok(elevators);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/get/{id}")
    public ResponseEntity<Elevator> getElevatorById(@PathVariable Long id) {

        Elevator elevator = elevatorService.getElevatorById(id);

        if(elevator != null) {
            return ResponseEntity.ok(elevator);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Elevator> deleteElevatorById(@PathVariable Long id) { 

        Elevator elevator = elevatorService.deleteElevatorById(id);

        if(elevator != null) {
            return ResponseEntity.ok(elevator);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/queue/change/{id}/{floor}")
    public ResponseEntity<Elevator> updateQueueInElevatorById(@PathVariable Long id, @PathVariable Long floor) {
      
        Elevator elevator = elevatorService.updateQueueInElevator(id, floor);

        if(elevator != null) {
            return ResponseEntity.ok(elevator);
        }
      
        return ResponseEntity.status(HttpStatus.CONFLICT).build();

    }


    @PostMapping("/get/byActualFloor/{floor}")
    public ResponseEntity<List<Elevator>> getElevatorsByActualFloor(@PathVariable Long floor) {

        List<Elevator> elevators = elevatorService.findElevatorsByActualFloor(floor);

        if(!elevators.isEmpty()) {
            return ResponseEntity.ok(elevators);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


    @PostMapping("symulate/{number}")
    public ResponseEntity<Boolean> symulateSystem(@PathVariable Long number) {
        
        if(Boolean.TRUE.equals(elevatorService.symulateSystem(number))) {
            return ResponseEntity.ok(true);
        }
        
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    
    @PostMapping("get/byFloorInQueue/{floor}")
    public ResponseEntity<List<Elevator>> getElevatorsByFloorInQueue(@PathVariable Long floor) {
        
        List<Elevator> elevators = elevatorService.findElevatorsByFloorInQueue(floor);

        if(!elevators.isEmpty()) {
            return ResponseEntity.ok(elevators);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/queue/call/{floor}/{direction}")
    public ResponseEntity<Elevator> callElevatorOnFloor(@PathVariable Long floor, @PathVariable Boolean direction) {
        
        Elevator elevator = elevatorService.callElevatorOnFloor(floor, direction);

        if(elevator != null) {
            return ResponseEntity.ok(elevator);
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
}
