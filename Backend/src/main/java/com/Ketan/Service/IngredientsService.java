package com.Ketan.Service;

import java.util.List;

import com.Ketan.model.IngredientsCategory;
import com.Ketan.model.Ingredientsitem;

public interface IngredientsService {
    public IngredientsCategory createIngredientCategory(String ingredientsname,Long Userid) throws Exception;
    public IngredientsCategory getIngredientCategory(Long ingredientCategoryid) throws Exception;
    public List<IngredientsCategory> findByRestaurantId(Long Id) throws Exception;
    public Ingredientsitem createIngredientsitem(String ingredientsname,Long ingredientCategoryId,Long restaurantid) throws Exception;
    public List<Ingredientsitem> findRestaurantIngredientsitems(Long restaurantId) throws Exception;
    public Ingredientsitem updateStock(Long ingredientid) throws Exception;
}
