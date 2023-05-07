package com.teodora.licenta.dtos;

import com.teodora.licenta.UserRole;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

public class UserDTO extends RepresentationModel<UserDTO> {

    private UUID id;
    private String username;
    private UserRole role;

    public UserDTO() {

    }

    public UserDTO(UUID id, String username, UserRole role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

}