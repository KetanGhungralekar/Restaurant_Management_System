package com.Ketan.Service;


import java.util.List;

import com.Ketan.Request.CreateRestaurantreq;
import com.Ketan.dto.Restaurant_dti;
import com.Ketan.model.Restaurant;
import com.Ketan.model.User;

public interface RestaurantService {
    public Restaurant CreateRestaurant(CreateRestaurantreq req,User user);
    public Restaurant updateRestaurant(Long restaurantid,CreateRestaurantreq req) throws Exception;
    public Restaurant getRestaurant(Long restaurantid) throws Exception;
    public void deleteRestaurant(Long restaurantid) throws Exception;
    public List<Restaurant> getAllRestaurants();
    // public List<Restaurant> searchRestaurants(String keyword);
    public List<Restaurant> searchRestaurantsByCuisine(String cuisine) throws Exception;
    public Restaurant getRestaurantByUserid(Long userid) throws Exception;
    public Restaurant_dti add_to_favourites(Long restaurantid,User user) throws Exception;
    public List<Restaurant> searchRestaurants(String keyword);
    public Restaurant update_restaurant_status(Long restaurantid) throws Exception;
}
