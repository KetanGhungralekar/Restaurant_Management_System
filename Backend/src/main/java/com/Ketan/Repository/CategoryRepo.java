package com.Ketan.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.Category;

public interface CategoryRepo extends JpaRepository<Category, Long>{
    List<Category> findByRestaurantId(Long restaurantId);
}
