package com.Ketan.dto;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable // To embed this class in another class
public class Restaurant_dti {
    private Long id;
    private String name;

    @Column(length = 1000)
    private List<String> images;

    private String description;
}
