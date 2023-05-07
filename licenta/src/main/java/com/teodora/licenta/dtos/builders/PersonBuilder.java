package com.teodora.licenta.dtos.builders;

import com.teodora.licenta.dtos.PersonDTO;
import com.teodora.licenta.dtos.PersonDetailsDTO;
import com.teodora.licenta.entities.Person;

public class PersonBuilder {

    public PersonBuilder() {}

    public static PersonDTO toPersonDTO(Person person) {
        return new PersonDTO(person.getId(), person.getName(), person.getAge());
    }

    public static PersonDetailsDTO toPersonDetailsDTO(Person person) {
        return new PersonDetailsDTO(person.getId(), person.getName(), person.getAddress(), person.getAge());
    }

    public static Person toEntity(PersonDetailsDTO personDetailsDTO) {
        return new Person(personDetailsDTO.getId(), personDetailsDTO.getName(), personDetailsDTO.getAddress(),
                personDetailsDTO.getAge(), UserBuilder.toEntity(personDetailsDTO.getUser()));
    }
}
