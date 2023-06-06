package dawid.poradzinski.avsystem.sql.models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Setter;
import lombok.Getter;

@Entity(name = "elevator")
@Getter
@Setter
public class Elevator {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(name = "actual_floor")
    private Long actualFloor;

    @Column(name = "next_floor")
    private Long nextFloor;

    @Column(name = "queue")
    private Set<Long> queue;

    @Column(name = "direction")
    private Boolean direction;

    public Elevator() {};
}
