package com.teodora.licenta.dtos;

import com.teodora.licenta.UserRole;

import java.util.UUID;

public class UserDetailsDTO {

    private UUID id;
    private String username;
    private String password;
    private UserRole role;
    private boolean loggedin;

    public UserDetailsDTO() {

    }

    public UserDetailsDTO(UUID id, String username, String password, UserRole role, boolean loggedin) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.loggedin = loggedin;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public boolean isLoggedin() {
        return loggedin;
    }

    public void setLoggedin(boolean loggedin) {
        this.loggedin = loggedin;
    }
}