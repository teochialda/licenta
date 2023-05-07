package com.teodora.licenta.dtos;

import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

public class FoodDTO extends RepresentationModel<FoodDTO> {

    private UUID id;
    private String name;
    private int calories;

    public FoodDTO() {}

    public FoodDTO(UUID id, String name, int calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
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
}
