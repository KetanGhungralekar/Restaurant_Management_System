package com.Ketan.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable // This annotation is used to specify that a class will be embedded by other entities.
public class ContactInformation {
    private String email;
    private String phone;
    private String twitter;
    private String instagram;
}
