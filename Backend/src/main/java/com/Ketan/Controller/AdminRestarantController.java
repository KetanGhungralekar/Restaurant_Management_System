package com.Ketan.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Request.CreateRestaurantreq;
import com.Ketan.Service.RestaurantService;
import com.Ketan.Service.UserService;
import com.Ketan.model.Restaurant;
import com.Ketan.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/admin/restaurants")
public class AdminRestarantController {
    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private UserService userService;

    @PostMapping()    
    public ResponseEntity<Restaurant> CreateRestaurant(@RequestBody CreateRestaurantreq req, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.FindUserByJwt(jwt);
        Restaurant restaurant = restaurantService.CreateRestaurant(req, user);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }
    @GetMapping("/getAll")
    public ResponseEntity<?> GetRestaurants(@RequestHeader("Authorization") String jwt){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(restaurantService.getAllRestaurants(), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<?> GetRestaurantById(@RequestHeader("Authorization") String jwt,@PathVariable Long id){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(restaurantService.getRestaurant(id), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> UpdateRestaurant(@RequestHeader("Authorization") String jwt,@PathVariable Long id,@RequestBody CreateRestaurantreq req){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(restaurantService.updateRestaurant(id, req), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> DeleteRestaurant(@RequestHeader("Authorization") String jwt,@PathVariable Long id){
        try{
            User user = userService.FindUserByJwt(jwt);
            restaurantService.deleteRestaurant(id);
            return new ResponseEntity<>("Restaurant deleted", HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<?> UpdateRestaurantStatus(@RequestHeader("Authorization") String jwt,@PathVariable Long id){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(restaurantService.update_restaurant_status(id), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getByUser")
    public ResponseEntity<?> GetRestaurantByUser(@RequestHeader("Authorization") String jwt){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(restaurantService.getRestaurantByUserid(user.getId()), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/addToFavourites/{id}")
    public ResponseEntity<?> AddToFavourites(@RequestHeader("Authorization") String jwt,@PathVariable Long id){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(restaurantService.add_to_favourites(id, user), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
