package com.Ketan.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Data
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {
    "city", "state", "pincode", "streetAddress", "Country"
}))
@EqualsAndHashCode(of = {"city", "state", "pincode", "streetAddress", "Country"})
@ToString(of = {"city", "state", "pincode", "streetAddress", "Country"})
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String city;
    private String state;
    private String pincode;
    private String streetAddress;
    private String country;
}
