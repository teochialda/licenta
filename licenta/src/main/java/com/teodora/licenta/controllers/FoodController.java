package com.teodora.licenta.controllers;

import com.teodora.licenta.dtos.FoodDTO;
import com.teodora.licenta.dtos.FoodDetailsDTO;
import com.teodora.licenta.dtos.PersonDetailsDTO;
import com.teodora.licenta.dtos.UserDetailsDTO;
import com.teodora.licenta.services.FoodService;
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
@RequestMapping(value = "/food")
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping()
    public ResponseEntity<List<FoodDTO>> getFoods() {
        List<FoodDTO> dtos = foodService.findFoods();
        for (FoodDTO dto : dtos) {
            Link deviceLink = linkTo(methodOn(FoodController.class)
                    .getFood(dto.getId())).withRel("foodDetails");
            dto.add(deviceLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<FoodDetailsDTO> getFood(@PathVariable("id") UUID foodId) {
        FoodDetailsDTO dto = foodService.findFoodById(foodId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<List<FoodDetailsDTO>> getFoodDetails() {
        List<FoodDetailsDTO> dtos = foodService.findFoodsDetails();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertFood(@Valid @RequestBody FoodDetailsDTO foodDetailsDTO) {
        if (foodDetailsDTO.getPerson() == null) {
            PersonDetailsDTO personDetailsDTO = new PersonDetailsDTO();
            personDetailsDTO.setUser(new UserDetailsDTO());
            foodDetailsDTO.setPerson(personDetailsDTO);
        }
        UUID deviceID = foodService.insert(foodDetailsDTO);
        return new ResponseEntity<>(deviceID, HttpStatus.CREATED);
    }

    @PostMapping("/address/{id}")
    public ResponseEntity<UUID> updateFood(@PathVariable UUID id, @RequestBody FoodDetailsDTO foodDetailsDTO) {
        UUID foodId = foodService.updateFood(id, foodDetailsDTO).getId();
        return new ResponseEntity<>(foodId, HttpStatus.CREATED);
    }

    @PostMapping("/mapping/{deviceId}/{personId}")
    public ResponseEntity<UUID> addUserToFood(@PathVariable UUID foodId, @PathVariable UUID personId) {
        UUID foodID = foodService.addUserToFood(personId, foodId).getId();
        return new ResponseEntity<>(foodID, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UUID> deleteFoodById(@PathVariable UUID id){
        foodService.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
