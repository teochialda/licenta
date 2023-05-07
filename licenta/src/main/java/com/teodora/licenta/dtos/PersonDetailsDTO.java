package com.teodora.licenta.dtos;

import com.teodora.licenta.dtos.annotation.AgeLimit;

import java.util.Objects;
import java.util.UUID;

public class PersonDetailsDTO {

    private UUID id;
    private String name;
    private String address;
    @AgeLimit(limit = 18)
    private int age;
    private UserDetailsDTO user;

    public PersonDetailsDTO() {
    }

    public PersonDetailsDTO( String name, String address, int age) {
        this.name = name;
        this.address = address;
        this.age = age;
    }

    public PersonDetailsDTO(UUID id, String name, String address, int age) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.age = age;
    }

    public PersonDetailsDTO(UUID id, String name, String address, int age, UserDetailsDTO user) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.age = age;
        this.user = user;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public UserDetailsDTO getUser() {
        return user;
    }

    public void setUser(UserDetailsDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PersonDetailsDTO that = (PersonDetailsDTO) o;
        return age == that.age &&
                Objects.equals(name, that.name) &&
                Objects.equals(address, that.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, address, age);
    }
}