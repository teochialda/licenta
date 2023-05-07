package com.teodora.licenta.dtos.builders;

import com.teodora.licenta.dtos.UserDTO;
import com.teodora.licenta.dtos.UserDetailsDTO;
import com.teodora.licenta.entities.User;

public class UserBuilder {

    public UserBuilder() {}

    public static UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getRole());
    }

    public static UserDetailsDTO toUserDetailsDTO(User user) {
        return new UserDetailsDTO(user.getId(), user.getUsername(), user.getPassword(), user.getRole(), user.isLoggedin());
    }

    public static User toEntity(UserDetailsDTO userDetailsDTO) {
        return new User(userDetailsDTO.getId(), userDetailsDTO.getUsername(), userDetailsDTO.getPassword(), userDetailsDTO.getRole(), userDetailsDTO.isLoggedin());
    }
}
