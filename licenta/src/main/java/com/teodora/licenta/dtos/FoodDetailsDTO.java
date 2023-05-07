package com.teodora.licenta.dtos;

import java.util.UUID;

public class FoodDetailsDTO {

    private UUID id;
    private String name;
    private int calories;
    private PersonDetailsDTO person;

    public FoodDetailsDTO() {}

    public FoodDetailsDTO(UUID id, String name, int calories, PersonDetailsDTO person) {
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.person = person;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public PersonDetailsDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDetailsDTO person) {
        this.person = person;
    }
}
