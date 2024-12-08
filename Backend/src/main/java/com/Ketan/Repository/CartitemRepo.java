package com.Ketan.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.CartItems;

public interface CartitemRepo extends JpaRepository<CartItems, Long>{
    
}
