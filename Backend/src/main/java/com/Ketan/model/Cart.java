package com.Ketan.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private User customer;

    private Long totalPrice;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL,orphanRemoval = true) // To create a foreign key in the CartItems table // orphanremoval means if we delete cart then all the cart items will be deleted
    private List<CartItems> cartItems = new ArrayList<>();
}
