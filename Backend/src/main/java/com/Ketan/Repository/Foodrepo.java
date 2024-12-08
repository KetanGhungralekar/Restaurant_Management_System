package com.Ketan.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Ketan.model.Category;
import com.Ketan.model.Food;

public interface Foodrepo extends JpaRepository<Food, Long>{
    List<Food> findByRestaurantId(Long restaurantId);

    @Query("SELECT f FROM Food f WHERE lower(f.name) LIKE lower(concat('%',:keyword,'%')) OR lower(f.description) LIKE lower(concat('%',:keyword,'%')) OR lower(f.foodcategory.name) LIKE lower(concat('%',:keyword,'%'))")
    List<Food> SearchFood(@Param("keyword")String keyword);
}
