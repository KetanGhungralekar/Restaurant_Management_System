package com.Ketan.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Service.FoodService;
import com.Ketan.Service.RestaurantService;
import com.Ketan.Service.UserService;
import com.Ketan.model.User;

@RestController
@RequestMapping("/api/food")
public class FoodController {
    @Autowired
    private FoodService foodService;
    @Autowired
    private UserService userService;
    @Autowired
    private RestaurantService restaurantService;
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
    public ResponseEntity<?> GetFoodsByRestaurant(@RequestHeader("Authorization") String jwt,@PathVariable Long restaurantid,@RequestParam(required = false) boolean isVeg,@RequestParam(required = false) boolean isNonveg,@RequestParam(required = false) boolean isSeasonal,@RequestParam(required = false) String foodCategory){
        try{
            // User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(foodService.getFoodsByRestaurant(restaurantid, isVeg, isNonveg, isSeasonal, foodCategory), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
