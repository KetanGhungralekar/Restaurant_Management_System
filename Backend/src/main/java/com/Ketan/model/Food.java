package com.Ketan.model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private Long price;

    @ManyToOne
    private Category foodcategory; //it is required to have a category in database before adding food

    @Column(length = 1000)
    @ElementCollection
    private List<String> images;
    private boolean available;

    @ManyToOne
    private Restaurant restaurant;

    private boolean isVeg;
    private boolean isSeasonal;
    @ManyToMany
    private List<Ingredientsitem> ingredients;

    private Date creationDate;
}
