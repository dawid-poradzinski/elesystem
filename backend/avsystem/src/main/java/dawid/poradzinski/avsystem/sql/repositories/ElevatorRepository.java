package dawid.poradzinski.avsystem.sql.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dawid.poradzinski.avsystem.sql.models.Elevator;

@Repository
public interface ElevatorRepository extends JpaRepository<Elevator, Long>{
    
    List<Elevator> findByActualFloor(Long actualFloor);
}
