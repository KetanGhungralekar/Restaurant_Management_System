package com.Ketan.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Ketan.Repository.CategoryRepo;
import com.Ketan.Request.CreateCategoryreq;
import com.Ketan.model.Category;
import com.Ketan.model.Restaurant;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private RestaurantService restaurantService;
    @Override
    public Category createCategory(CreateCategoryreq categoryname,Long Userid) throws Exception{
        Category category = new Category();
        category.setName(categoryname.getName());
        try{
            Restaurant restaurant = restaurantService.getRestaurantByUserid(Userid);
            category.setRestaurant(restaurant);
            return categoryRepo.save(category);
        }
        catch(Exception e){
            throw new Exception("Restaurant not found");
        }
    }
    @Override
    public Category getCategory(Long categoryid) throws Exception {
        return categoryRepo.findById(categoryid).orElseThrow(()->new Exception("Category not found"));
    }
    @Override
    public List<Category> findByRestaurantId(Long Id) {
        try{
            // Restaurant restaurant = restaurantService.getRestaurant(Id);
            return categoryRepo.findByRestaurantId(Id);
        }
        catch(Exception e){
            return null;
        }
    }
}
