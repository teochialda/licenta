package com.teodora.licenta.services;

import com.teodora.licenta.dtos.UserDTO;
import com.teodora.licenta.dtos.UserDetailsDTO;
import com.teodora.licenta.dtos.builders.UserBuilder;
import com.teodora.licenta.entities.User;
import com.teodora.licenta.repositories.UserRepository;
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
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> findUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(UserBuilder::toUserDTO)
                .collect(Collectors.toList());
    }

    public List<UserDetailsDTO> findUsersDetails() {
        List<User> deviceList = userRepository.findAll();
        return deviceList.stream()
                .map(UserBuilder::toUserDetailsDTO)
                .collect(Collectors.toList());
    }

    public UserDetailsDTO findUserById(UUID id) {
        Optional<User> userOptional = userRepository.find ById(id);
        if (!userOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + id);
        }
        return UserBuilder.toUserDetailsDTO(userOptional.get());
    }

    public UUID insert(UserDetailsDTO userDetailsDTO) {
        User user = UserBuilder.toEntity(userDetailsDTO);
        user = userRepository.save(user);
        LOGGER.debug("User with id {} was inserted in db", user.getId());
        return user.getId();
    }

    public UserDetailsDTO updateUser(UUID id, UserDetailsDTO user) {
        Optional<User> userJr = userRepository.findById(id);
        if (userJr.isPresent()) {
            userRepository.save(UserBuilder.toEntity(user));
        }
        return user;
    }

    public UUID delete(UUID id) {
        userRepository.deleteById(id);
        return id;
    }

    public UserDetailsDTO findByUsernameAndPassword(String username, String password) {
        return UserBuilder.toUserDetailsDTO(userRepository.findByUsernameAndPassword(username, password));
    }

    public UserDetailsDTO findByUsername(String username) {
        return UserBuilder.toUserDetailsDTO(userRepository.findByUsername(username));
    }
}
