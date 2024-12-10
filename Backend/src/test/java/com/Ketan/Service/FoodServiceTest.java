package com.Ketan.Service;
import com.Ketan.Repository.Foodrepo;
import com.Ketan.Repository.RestaurantRepository;
import com.Ketan.Request.CreateFoodreq;
import com.Ketan.model.Category;
import com.Ketan.model.Food;
import com.Ketan.model.Ingredientsitem;
import com.Ketan.model.Restaurant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;






class FoodServiceImplTest {

    @Mock
    private Foodrepo foodrepo;

    @Mock
    private RestaurantRepository restaurantRepository;

    @InjectMocks
    private FoodServiceImpl foodService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateFood() {
        // Arrange
        CreateFoodreq req = new CreateFoodreq();
        req.setAvailable(true);
        req.setDescription("Delicious food");
        ArrayList<String> images = new ArrayList<>();
        images.add("image.jpg");
        req.setImages(images);
        ArrayList<Ingredientsitem> ingredients = new ArrayList<>();
        Ingredientsitem ingredient = new Ingredientsitem();
        ingredient.setName("ingredient");
        ingredients.add(ingredient);
        req.setName("Food Name");
        req.setIngredients(ingredients);
        req.setPrice(100L);
        req.setSeasonal(false);
        req.setVeg(true);

        Category category = new Category();
        Restaurant restaurant = new Restaurant();
        restaurant.setMenu(new ArrayList<>());

        Food savedFood = new Food();
        when(foodrepo.save(any(Food.class))).thenReturn(savedFood);
        when(restaurantRepository.save(any(Restaurant.class))).thenReturn(restaurant);
        // Act
        Food result = foodService.CreateFood(req, category, restaurant);

        // Assert
        assertNotNull(result);
        verify(foodrepo, times(1)).save(any(Food.class));
        verify(restaurantRepository, times(1)).save(any(Restaurant.class));
    }

    @Test
    void testGetFoodsByRestaurant() throws Exception {
        // Arrange
        Long restaurantId = 1L;
        List<Food> foods = new ArrayList<>();
        when(foodrepo.findByRestaurantId(restaurantId)).thenReturn(foods);

        // Act
        List<Food> result = foodService.getFoodsByRestaurant(restaurantId, true, false, false, null);

        // Assert
        assertNotNull(result);
        verify(foodrepo, times(1)).findByRestaurantId(restaurantId);
    }

    @Test
    void testSearchFoods() {
        // Arrange
        String keyword = "keyword";
        List<Food> foods = new ArrayList<>();
        when(foodrepo.SearchFood(keyword)).thenReturn(foods);

        // Act
        List<Food> result = foodService.searchFoods(keyword);

        // Assert
        assertNotNull(result);
        verify(foodrepo, times(1)).SearchFood(keyword);
    }

    @Test
    void testGetAllFoods() {
        // Arrange
        List<Food> foods = new ArrayList<>();
        when(foodrepo.findAll()).thenReturn(foods);

        // Act
        List<Food> result = foodService.getAllFoods();

        // Assert
        assertNotNull(result);
        verify(foodrepo, times(1)).findAll();
    }

    @Test
    void testGetFood() throws Exception {
        // Arrange
        Long foodId = 1L;
        Food food = new Food();
        when(foodrepo.findById(foodId)).thenReturn(Optional.of(food));

        // Act
        Food result = foodService.getFood(foodId);

        // Assert
        assertNotNull(result);
        verify(foodrepo, times(1)).findById(foodId);
    }

    @Test
    void testDeleteFood() throws Exception {
        // Arrange
        Long foodId = 1L;
        Food existingFood = new Food();
        when(foodrepo.findById(foodId)).thenReturn(Optional.of(existingFood));

        // Act
        foodService.deleteFood(foodId);

        // Assert
        verify(foodrepo, times(1)).findById(foodId);
        verify(foodrepo, times(1)).save(any(Food.class));
    }

    @Test
    void testUpdateFoodAvailability() throws Exception {
        // Arrange
        Long foodId = 1L;
        Food food = new Food();
        food.setAvailable(true);
        when(foodrepo.findById(foodId)).thenReturn(Optional.of(food));
        when(foodrepo.save(any(Food.class))).thenReturn(food);

        // Act
        Food result = foodService.update_food_availability(foodId);

        // Assert
        assertNotNull(result);
        assertFalse(result.isAvailable());
        verify(foodrepo, times(1)).findById(foodId);
        verify(foodrepo, times(1)).save(any(Food.class));
    }

    @Test
    void testUpdateFood() throws Exception {
        // Arrange
        Long foodId = 1L;
        CreateFoodreq req = new CreateFoodreq();
        req.setDescription("Updated description");

        Food existingFood = new Food();
        when(foodrepo.findById(foodId)).thenReturn(Optional.of(existingFood));
        when(foodrepo.save(any(Food.class))).thenReturn(existingFood);

        // Act
        Food result = foodService.updateFood(foodId, req);

        // Assert
        assertNotNull(result);
        assertEquals("Updated description", result.getDescription());
        verify(foodrepo, times(1)).findById(foodId);
        verify(foodrepo, times(1)).save(any(Food.class));
    }


}