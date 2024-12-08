package com.Ketan.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long>{
    List<Order> findByCustomerId(Long userId);
    List<Order> findByRestaurantId(Long restaurantId);
}
