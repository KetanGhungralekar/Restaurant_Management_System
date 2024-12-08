package com.Ketan.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Request.CreateFoodreq;
import com.Ketan.Service.FoodService;
import com.Ketan.Service.RestaurantService;
import com.Ketan.Service.UserService;
import com.Ketan.model.Restaurant;
import com.Ketan.model.User;


import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {
    @Autowired
    private FoodService foodService;
    @Autowired
    private UserService userService;
    @Autowired
    private RestaurantService restaurantService;

    @PostMapping()
    public ResponseEntity<?> CreateFood(@RequestHeader("Authorization") String jwt,@RequestBody CreateFoodreq req){
        try{
            User user = userService.FindUserByJwt(jwt);
            Restaurant restaurant = restaurantService.getRestaurant(req.getRestaurantId());
            if (restaurant == null){
                return new ResponseEntity<>("Restaurant not found", HttpStatus.NOT_FOUND);
            }
            //print req
            return new ResponseEntity<>(foodService.CreateFood(req,req.getFoodcategory(),restaurant), HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/delete/{foodid}")
    public ResponseEntity<?> Deletefood(@RequestHeader("Authorization") String jwt,@PathVariable Long foodid){
        try{
            foodService.deleteFood(foodid);
            return new ResponseEntity<>(foodid, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/update/{foodid}")
    public ResponseEntity<?> UpdateFood(@RequestHeader("Authorization") String jwt,@PathVariable Long foodid,@RequestBody CreateFoodreq req){
        try{
            User user = userService.FindUserByJwt(jwt);
            Restaurant restaurant = restaurantService.getRestaurant(req.getRestaurantId());
            if (restaurant == null){
                return new ResponseEntity<>("Restaurant not found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(foodService.updateFood(foodid, req), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/update_availability/{foodid}")
    public ResponseEntity<?> UpdateFoodAvailability(@RequestHeader("Authorization") String jwt,@PathVariable Long foodid){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(foodService.update_food_availability(foodid), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/get/{foodid}")
    public ResponseEntity<?> GetFood(@RequestHeader("Authorization") String jwt,@PathVariable Long foodid){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(foodService.getFood(foodid), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/search")
    public ResponseEntity<?> SearchFoods(@RequestHeader("Authorization") String jwt,@RequestParam String keyword){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(foodService.searchFoods(keyword), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getByRestaurant/{restaurantid}")
    public ResponseEntity<?> GetFoodsByRestaurant(@RequestHeader("Authorization") String jwt,@PathVariable Long restaurantid,@RequestParam boolean isVeg,@RequestParam boolean isNonveg,@RequestParam boolean isSeasonal,@RequestParam String foodCategory){
        try{
            User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(foodService.getFoodsByRestaurant(restaurantid, isVeg, isNonveg, isSeasonal, foodCategory), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
