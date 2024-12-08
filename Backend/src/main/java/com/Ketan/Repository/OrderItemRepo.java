package com.Ketan.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long>{
    
}
