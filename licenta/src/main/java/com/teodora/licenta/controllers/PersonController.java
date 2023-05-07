package com.teodora.licenta.controllers;

import com.teodora.licenta.dtos.PersonDTO;
import com.teodora.licenta.dtos.PersonDetailsDTO;
import com.teodora.licenta.dtos.UserDetailsDTO;
import com.teodora.licenta.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping(value = "/person")
public class PersonController {

    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping()
    public ResponseEntity<List<PersonDTO>> getPersons() {
        List<PersonDTO> dtos = personService.findPersons();
        for (PersonDTO dto : dtos) {
            Link personLink = linkTo(methodOn(PersonController.class)
                    .getPerson(dto.getId())).withRel("personDetails");
            dto.add(personLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<List<PersonDetailsDTO>> getPersonsDetails() {
        List<PersonDetailsDTO> dtos = personService.findPersonsDetails();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<UUID> insertPerson(@Valid @RequestBody PersonDetailsDTO personDTO) {
        if (personDTO.getUser() == null) {
            personDTO.setUser(new UserDetailsDTO());
        }
        UUID personID = personService.insert(personDTO);
        return new ResponseEntity<>(personID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<PersonDetailsDTO> getPerson(@PathVariable("id") UUID personId) {
        PersonDetailsDTO dto = personService.findPersonById(personId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping("/address/{id}")
    public ResponseEntity<UUID> updatePerson(@PathVariable UUID id, @RequestBody PersonDetailsDTO personDTO) {
        UUID personID = personService.updatePerson(id, personDTO).getId();
        return new ResponseEntity<>(personID, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UUID> deletePersonById(@PathVariable UUID id){
        personService.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

}
