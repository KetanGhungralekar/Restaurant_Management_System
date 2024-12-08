package com.Ketan.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Ketan.Repository.Foodrepo;
import com.Ketan.Repository.RestaurantRepository;
import com.Ketan.Request.CreateFoodreq;
import com.Ketan.model.Category;
import com.Ketan.model.Food;
import com.Ketan.model.Restaurant;

@Service
public class FoodServiceImpl implements FoodService{
    @Autowired
    private Foodrepo foodrepo;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Override
    public Food CreateFood(CreateFoodreq req, Category category, Restaurant restaurant) {
        Food food = new Food();
        food.setAvailable(req.isAvailable());
        food.setDescription(req.getDescription());
        food.setFoodcategory(category);
        food.setImages(req.getImages());
        food.setIngredients(req.getIngredients());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setSeasonal(req.isSeasonal());
        food.setVeg(req.isVeg());
        restaurant.getMenu().add(food);
        food.setRestaurant(restaurant);
        Food savedfood = foodrepo.save(food); //do we need to save restaurant again? //yes
        //because restaurant is updated with new food
        //so in database it will be updated only when we save it
        return savedfood;
    }

    @Override
    public Food updateFood(Long foodid, CreateFoodreq req) throws Exception {
        Food food = getFood(foodid);
        if (req.getDescription() != null)
            food.setDescription(req.getDescription());
        if (req.getImages() != null){
            food.setImages(req.getImages());
        }
        if (req.getIngredients() != null){
            food.setIngredients(req.getIngredients());
        }
        if (req.getName() != null){
            food.setName(req.getName());
        }
        if (req.getPrice() != null){
            food.setPrice(req.getPrice());
        }
        if (req.isAvailable() != food.isAvailable()){
            food.setAvailable(req.isAvailable());
        }
        if (req.isSeasonal() != food.isSeasonal()){
            food.setSeasonal(req.isSeasonal());
        }
        if (req.isVeg() != food.isVeg()){
            food.setVeg(req.isVeg());
        }
        if (req.getFoodcategory() != null){
            food.setFoodcategory(req.getFoodcategory());
        }
        if (req.getRestaurantId() != null){
            Restaurant restaurant = restaurantRepository.findById(req.getRestaurantId()).orElseThrow(() -> new Exception("Restaurant not found"));
            restaurant.getMenu().add(food);
            restaurantRepository.save(restaurant);
            food.setRestaurant(restaurant);
        }
        return foodrepo.save(food);
    }

    @Override
    public void deleteFood(Long foodid) throws Exception {
        Food food = getFood(foodid);
        food.setRestaurant(null);
        foodrepo.save(food); //as constraint is set to not null //this gets automatically deleted really? //yes wow cool na
    }

    @Override
    public List<Food> getAllFoods() {
        return foodrepo.findAll();
    }

    @Override
    public List<Food> getFoodsByRestaurant(Long restaurantid, boolean isVeg, boolean isNonveg, boolean isSeasonal,
            String foodCategory) throws Exception {
            List<Food> foods = foodrepo.findByRestaurantId(restaurantid);
            if (isVeg)
                foods.removeIf(food -> !food.isVeg()); //removeIf takes a predicate will remove all elements that satisfy the predicate
            if (isNonveg)
                foods.removeIf(food -> food.isVeg());
            if (isSeasonal)
                foods.removeIf(food -> !food.isSeasonal());
            if (foodCategory != null && !foodCategory.isEmpty()){
                foods.removeIf(food -> !food.getFoodcategory().getName().equals(foodCategory));
            }
            return foods;
    }

    @Override
    public List<Food> searchFoods(String keyword) {
        return foodrepo.SearchFood(keyword);
    }

    @Override
    public Food getFood(Long foodid) throws Exception {
        return foodrepo.findById(foodid).orElseThrow(() -> new Exception("Food not found"));
        //when you use orElseThrow it will throw an exception if the value is not present so when it is empty it will throw an exception 
    }

    @Override
    public Food update_food_availability(Long foodid) throws Exception {
        Food food = getFood(foodid);
        food.setAvailable(!food.isAvailable());
        return foodrepo.save(food);
    }
    
}
