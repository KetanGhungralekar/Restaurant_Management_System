package com.Ketan.Service;


import java.util.List;

import com.Ketan.Request.CreateFoodreq;
import com.Ketan.model.Category;
import com.Ketan.model.Food;
import com.Ketan.model.Restaurant;

public interface FoodService {
    public Food CreateFood(CreateFoodreq req,Category category,Restaurant restaurant);
    public Food updateFood(Long foodid,CreateFoodreq req) throws Exception;
    public void deleteFood(Long foodid) throws Exception;
    public List<Food> getAllFoods();
    public List<Food> getFoodsByRestaurant(Long restaurantid,boolean isVeg,boolean isNonveg,boolean isSeasonal,String foodCategory) throws Exception; 
    public List<Food> searchFoods(String keyword);
    public Food getFood(Long foodid) throws Exception;
    public Food update_food_availability(Long foodid) throws Exception;
}
