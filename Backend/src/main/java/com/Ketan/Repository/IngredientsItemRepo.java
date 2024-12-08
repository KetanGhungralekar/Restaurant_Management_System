package com.Ketan.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.Ingredientsitem;
import com.Ketan.model.Restaurant;

public interface IngredientsItemRepo extends JpaRepository<Ingredientsitem, Long>{

    List<Ingredientsitem> findByRestaurant(Restaurant restaurant);
    
}
