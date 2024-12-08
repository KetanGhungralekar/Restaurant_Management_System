package com.Ketan.Repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Ketan.model.IngredientsCategory;
import com.Ketan.model.Restaurant;

public interface IngredientCategoryRepo extends JpaRepository<IngredientsCategory,Long>{
    List<IngredientsCategory> findByRestaurant(Restaurant restaurant);
}
