package com.Ketan.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Ketan.Repository.IngredientCategoryRepo;
import com.Ketan.Repository.IngredientsItemRepo;
import com.Ketan.model.IngredientsCategory;
import com.Ketan.model.Ingredientsitem;
import com.Ketan.model.Restaurant;

@Service
public class IngredientServiceimp implements IngredientsService{
    @Autowired
    private IngredientCategoryRepo ingredientCategoryRepo;
    @Autowired
    private IngredientsItemRepo ingredientsItemRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private RestaurantService restaurantService;
    @Override
    public IngredientsCategory createIngredientCategory(String ingredientsname, Long restaurantid) throws Exception {
        IngredientsCategory ingredientsCategory = new IngredientsCategory();
        ingredientsCategory.setName(ingredientsname);
        try{
            Restaurant restaurant = restaurantService.getRestaurant(restaurantid);
            ingredientsCategory.setRestaurant(restaurant);
            return ingredientCategoryRepo.save(ingredientsCategory);
        }
        catch(Exception e){
            throw new Exception("Restaurant not found");
        }
    }

    @Override
    public IngredientsCategory getIngredientCategory(Long ingredientCategoryid) throws Exception {
        return ingredientCategoryRepo.findById(ingredientCategoryid).orElseThrow(()->new Exception("Category not found"));
    }

    @Override
    public List<IngredientsCategory> findByRestaurantId(Long Id) throws Exception {
        try{
            Restaurant restaurant = restaurantService.getRestaurant(Id);
            return ingredientCategoryRepo.findByRestaurant(restaurant);
        }
        catch(Exception e){
            return null;
        }
    }

    @Override
    public Ingredientsitem createIngredientsitem(String ingredientsname, Long ingredientCategoryId, Long restaurantid)
            throws Exception {
        Ingredientsitem ingredientsitem = new Ingredientsitem();
        ingredientsitem.setName(ingredientsname);
        try{
            IngredientsCategory ingredientsCategory = getIngredientCategory(ingredientCategoryId);
            Restaurant restaurant = restaurantService.getRestaurant(restaurantid);
            ingredientsitem.setRestaurant(restaurant);
            ingredientsCategory.getIngredients().add(ingredientsitem);
            ingredientsitem.setCategory(ingredientsCategory);
            // ingredientCategoryRepo.save(ingredientsCategory);
            return ingredientsItemRepo.save(ingredientsitem);
        }
        catch(Exception e){
            throw new Exception("Restaurant not found");
        }
    }


    @Override
    public Ingredientsitem updateStock(Long ingredientid) throws Exception {
        Ingredientsitem ingredientsitem = ingredientsItemRepo.findById(ingredientid).orElseThrow(()->new Exception("Ingredient not found"));
        ingredientsitem.setInstock(!ingredientsitem.isInstock());
        return ingredientsItemRepo.save(ingredientsitem);
    }

    @Override
    public List<Ingredientsitem> findRestaurantIngredientsitems(Long restaurantId) throws Exception {
        try{
            Restaurant restaurant = restaurantService.getRestaurant(restaurantId);
            return ingredientsItemRepo.findByRestaurant(restaurant);
        }
        catch(Exception e){
            return null;
        }
    }
    
}
