package com.teodora.licenta.dtos.builders;

import com.teodora.licenta.dtos.FoodDTO;
import com.teodora.licenta.dtos.FoodDetailsDTO;
import com.teodora.licenta.entities.Food;

public class FoodBuilder {

    private FoodBuilder() {}

    public static FoodDTO toFoodDTO(Food food) {
        return new FoodDTO(food.getId(), food.getName(), food.getCalories());
    }

    public static FoodDetailsDTO toFoodDetailsDTO(Food food) {
        return new FoodDetailsDTO(food.getId(), food.getName(), food.getCalories(), PersonBuilder.toPersonDetailsDTO(food.getPerson()));
    }

    public static Food toEntity(FoodDetailsDTO foodDetailsDTO) {
        return new Food(foodDetailsDTO.getId(), foodDetailsDTO.getName(), foodDetailsDTO.getCalories(), PersonBuilder.toEntity(foodDetailsDTO.getPerson()));
    }
}
