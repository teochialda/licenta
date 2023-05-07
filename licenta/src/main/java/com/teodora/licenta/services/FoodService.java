package com.teodora.licenta.services;

import com.teodora.licenta.dtos.FoodDTO;
import com.teodora.licenta.dtos.FoodDetailsDTO;
import com.teodora.licenta.dtos.builders.FoodBuilder;
import com.teodora.licenta.dtos.builders.PersonBuilder;
import com.teodora.licenta.entities.Food;
import com.teodora.licenta.repositories.FoodRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FoodService.class);

    private final FoodRepository foodRepository;
    private final PersonService personService;

    @Autowired
    public FoodService(FoodRepository foodRepository, PersonService personService) {
        this.foodRepository = foodRepository;
        this.personService = personService;
    }

    public List<FoodDTO> findFoods() {
        List<Food> foodList = foodRepository.findAll();
        return foodList.stream().map(FoodBuilder::toFoodDTO).collect(Collectors.toList());
    }

    public List<FoodDetailsDTO> findFoodsDetails() {
        List<Food> foodList = foodRepository.findAll();
        return foodList.stream().map(FoodBuilder::toFoodDetailsDTO).collect(Collectors.toList());
    }

    public FoodDetailsDTO findFoodById(UUID id) {
        Optional<Food> foodOptional = foodRepository.findById(id);
        if (!foodOptional.isPresent()) {
            LOGGER.error("Food with id {} was not found in db", id);
            throw new ResourceNotFoundException(Food.class.getSimpleName() + " with id: " + id);
        }
        return FoodBuilder.toFoodDetailsDTO(foodOptional.get());
    }

    public UUID insert(FoodDetailsDTO foodDetailsDTO) {
        Food food = FoodBuilder.toEntity(foodDetailsDTO);
        food = foodRepository.save(food);
        return food.getId();
    }

    public FoodDetailsDTO updateFood(UUID id, FoodDetailsDTO foodDetailsDTO) {
        Optional<Food> foodJr = foodRepository.findById(id);
        if (foodJr.isPresent()) {
            foodRepository.save(FoodBuilder.toEntity(foodDetailsDTO));
        }
        return foodDetailsDTO;
    }

    public FoodDetailsDTO addUserToFood(UUID personId, UUID foodId) {
        Optional<Food> foodJr = foodRepository.findById(foodId);
        if (foodJr.isPresent()) {
            foodJr.get().setId(UUID.randomUUID());
            foodJr.get().setPerson(PersonBuilder.toEntity(personService.findPersonById(personId)));
            foodRepository.save(foodJr.get());
        }
        return FoodBuilder.toFoodDetailsDTO(foodJr.get());
    }

    public UUID delete(UUID id) {
        foodRepository.deleteById(id);
        return id;
    }
}
