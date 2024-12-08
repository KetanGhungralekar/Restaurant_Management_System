package com.Ketan.Request;


import java.util.List;

import com.Ketan.model.Address;
import com.Ketan.model.ContactInformation;

import lombok.Data;

@Data
public class CreateRestaurantreq {
    private String name;
    private String description;
    private String cuisineType;
    private Address address;
    private ContactInformation contactInformation;
    private String openingTime;
    private List<String> menu;
    private List<String> images;
}
