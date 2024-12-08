package com.Ketan.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Service.RestaurantService;
import com.Ketan.Service.UserService;
import com.Ketan.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private UserService userService;

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
    @PutMapping("/add_to_favourites/{id}")
    public ResponseEntity<?> Add_to_favourites(@RequestHeader("Authorization") String jwt,@PathVariable Long id){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(restaurantService.add_to_favourites(id, user), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/search")
    public ResponseEntity<?> SearchRestaurants(@RequestHeader("Authorization") String jwt,@RequestParam String keyword){
        try{
            return new ResponseEntity<>(restaurantService.searchRestaurants(keyword), HttpStatus.OK);
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
}
