package com.teodora.licenta.controllers;

import com.teodora.licenta.dtos.UserDTO;
import com.teodora.licenta.dtos.UserDetailsDTO;
import com.teodora.licenta.services.UserService;
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
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> dtos = userService.findUsers();
        for (UserDTO dto : dtos) {
            Link userLink = linkTo(methodOn(UserController.class)
                    .getUser(dto.getId())).withRel("userDetails");
            dto.add(userLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<List<UserDetailsDTO>> getUsersDetails() {
        List<UserDetailsDTO> dtos = userService.findUsersDetails();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertUser(@Valid @RequestBody UserDetailsDTO userDTO) {
        UUID userID = userService.insert(userDTO);
        return new ResponseEntity<>(userID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDetailsDTO> getUser(@PathVariable("id") UUID userId) {
        UserDetailsDTO dto = userService.findUserById(userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping("/password/{id}")
    public ResponseEntity<UUID> updateUser(@PathVariable UUID id, @RequestBody UserDetailsDTO userDTO) {
        UUID userID = userService.updateUser(id, userDTO).getId();
        return new ResponseEntity<>(userID, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UUID> deleteUserById(@PathVariable UUID id){
        userService.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/username/{username}/password/{password}")
    public UserDetailsDTO findUserForLogin(@PathVariable String username, @PathVariable String password){
        return userService.findByUsernameAndPassword(username,password);
    }

    @GetMapping("/login/{username}")
    public UserDetailsDTO findByUsername(@PathVariable String username){
        return userService.findByUsername(username);
    }

    @PutMapping("/login/{id}")
    public ResponseEntity<UserDetailsDTO> updateUserLoginField(@PathVariable UUID id, @RequestBody UserDetailsDTO user){
        UserDetailsDTO userFalse=userService.findUserById(id);
        userFalse.setLoggedin(user.isLoggedin());
        UserDetailsDTO userTrue=userService.updateUser(userFalse.getId(), userFalse);
        return ResponseEntity.ok(userTrue);
    }

    @PutMapping("/logout/{id}")
    public ResponseEntity<UserDetailsDTO> updateUserLogoutField(@PathVariable UUID id, @RequestBody UserDetailsDTO user){
        UserDetailsDTO userFalse=userService.findUserById(id);
        userFalse.setLoggedin(user.isLoggedin());
        UserDetailsDTO userTrue=userService.updateUser(userFalse.getId(), userFalse);
        return ResponseEntity.ok(userTrue);
    }
}
