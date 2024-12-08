package com.Ketan.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Request.CreateIngredientsitemreq;
import com.Ketan.Request.Createingredientsrequest;
import com.Ketan.Service.IngredientsService;
import com.Ketan.model.IngredientsCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientsController {
    
    @Autowired
    private IngredientsService ingredientsService;

    @PostMapping("/category")
    public ResponseEntity<?> createIngredientCategory(@RequestBody Createingredientsrequest req,@RequestHeader("Authorization") String jwt) {
        try{
            IngredientsCategory ingredientsCategory = ingredientsService.createIngredientCategory(req.getIngredientsname(), req.getRestaurantid());
            return new ResponseEntity<>(ingredientsCategory,HttpStatus.CREATED);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/item")
    public ResponseEntity<?> createIngredientsitem(@RequestBody CreateIngredientsitemreq req,@RequestHeader("Authorization") String jwt) {
        try{
            return new ResponseEntity<>(ingredientsService.createIngredientsitem(req.getIngredientsname(), req.getIngredientCategoryId(), req.getRestaurantid()),HttpStatus.CREATED);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/stock/{ingredientid}")
    public ResponseEntity<?> UpdateStock(@PathVariable Long ingredientid,@RequestHeader("Authorization") String jwt){
        try{
            return new ResponseEntity<>(ingredientsService.updateStock(ingredientid),HttpStatus.OK);
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/category/{ingredientCategoryid}")
    public ResponseEntity<?> getIngredientsCategory(@PathVariable Long ingredientCategoryid,@RequestHeader("Authorization") String jwt){
        try{
            return new ResponseEntity<>(ingredientsService.getIngredientCategory(ingredientCategoryid),HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/restaurant/{restaurantid}")
    public ResponseEntity<?> getRestaurantsIngredients(@PathVariable Long restaurantid,@RequestHeader("Authorization") String jwt){
        try{
            return new ResponseEntity<>(ingredientsService.findRestaurantIngredientsitems(restaurantid),HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/restaurant/category/{restaurantid}")
    public ResponseEntity<?> getRestaurantsIngredientsCategory(@PathVariable Long restaurantid,@RequestHeader("Authorization") String jwt){
        try{
            return new ResponseEntity<>(ingredientsService.findByRestaurantId(restaurantid),HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
