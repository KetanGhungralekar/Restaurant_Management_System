package com.Ketan.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.Cart;
import com.Ketan.model.User;

public interface CartRepository extends JpaRepository<Cart, Long>{
    public Cart findByCustomerId(Long customerId);
}
