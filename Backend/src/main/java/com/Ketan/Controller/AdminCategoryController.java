package com.Ketan.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Request.CreateCategoryreq;
import com.Ketan.Service.CategoryService;
import com.Ketan.Service.UserService;
import com.Ketan.model.Category;
import com.Ketan.model.User;

import io.micrometer.core.ipc.http.HttpSender.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api")
public class AdminCategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private UserService userService;
    @PostMapping("/admin/category")
    public ResponseEntity<?> createCategory(@RequestHeader("Authorization") String jwt,@RequestBody CreateCategoryreq categoryname) throws Exception {
        try{
            User user = userService.FindUserByJwt(jwt);
            Category category = categoryService.createCategory(categoryname, user.getId());
            return new ResponseEntity<>(category, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/category/{categoryid}")
    public ResponseEntity<?> getCategory(@RequestHeader("Authorization") String jwt, @PathVariable Long categoryid) throws Exception {
        try{
            // User user = userService.FindUserByJwt(jwt);
            return new ResponseEntity<>(categoryService.getCategory(categoryid), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/category/restaurant/{restaurantid}")
    public ResponseEntity<?> getCategoriesByRestaurant(@RequestHeader("Authorization") String jwt,@PathVariable Long restaurantid) throws Exception {
        try{
            // User user = userService.FindUserByJwt(jwt);
            // System.out.println("restaurantid: "+restaurantid);
            return new ResponseEntity<>(categoryService.findByRestaurantId(restaurantid), HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
