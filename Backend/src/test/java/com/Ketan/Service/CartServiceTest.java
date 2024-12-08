package com.Ketan.Service;

import com.Ketan.Repository.CartRepository;
import com.Ketan.Repository.CartitemRepo;
import com.Ketan.Request.AddCartitemreq;
import com.Ketan.model.Cart;
import com.Ketan.model.CartItems;
import com.Ketan.model.Food;
import com.Ketan.model.User;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class CartServiceTest {

    @Mock
    private UserServiceImp userService;

    @Mock
    private CartRepository cartRepository;

    @Mock
    private FoodServiceImpl foodService;

    @Mock
    private CartitemRepo cartitemRepo;

    @InjectMocks
    private CartServiceImp cartService;

    public CartServiceTest() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    // @Test
    // void testAddCartItems() throws Exception {
    //     // Arrange: Setup mock data
    //     String jwt = "eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MzIzNjM4NTUsImV4cCI6MTczMjQ1MDI1NSwiYXV0aG9yaXRpZXMiOiJST0xFX0NVU1RPTUVSIiwiZW1haWwiOiJ5b3VsZWZmZSJ9.mZcOdnZNPvdi4n8caIKXC19Fyd8IHY_040eBAGx7geF0TvPOLe1FiV2HqlFPqfb6";
    //     User user = new User();
    //     user.setId(1L);
        

    //     Cart cart = new Cart();
    //     cart.setCustomer(user);

    //     Food food = new Food();
    //     food.setId(1L);
    //     food.setPrice(100L);

    //     CartItems existingCartItem = new CartItems();
    //     existingCartItem.setFood(food);
    //     existingCartItem.setQuantity(2L);

    //     cart.getCartItems().add(existingCartItem);

    //     AddCartitemreq req = new AddCartitemreq();
    //     req.setFoodid(food.getId());
    //     req.setQuantity(3L);

    //     CartItems newCartItem = new CartItems();
    //     newCartItem.setFood(food);
    //     newCartItem.setQuantity(5L); // Updated quantity
    //     newCartItem.setTotaPrice(500L); // food price * quantity

    //     // Mock behaviors
    //     when(userService.FindUserByJwt(jwt)).thenReturn(user);
    //     when(cartRepository.findByCustomerId(user.getId())).thenReturn(cart);
    //     when(foodService.getFood(req.getFoodid())).thenReturn(food);
    //     when(cartitemRepo.save(any(CartItems.class))).thenReturn(newCartItem);

    //     // Act: Call the method under test
    //     CartItems result = cartService.addCartItems(req, jwt);

    //     // Assert: Verify the behavior and results
    //     assertNotNull(result);
    //     assertEquals(5L, result.getQuantity());
    //     assertEquals(500L, result.getTotaPrice());
    //     verify(userService, times(1)).FindUserByJwt(jwt);
    //     verify(cartRepository, times(1)).findByCustomerId(user.getId());
    //     verify(foodService, times(1)).getFood(req.getFoodid());
    //     verify(cartitemRepo, times(1)).save(any(CartItems.class));
    // }

    @Test
    void testAddNewItemToCart() throws Exception {
        // Arrange: Setup mock data
        String jwt = "eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MzIzNjM4NTUsImV4cCI6MTczMjQ1MDI1NSwiYXV0aG9yaXRpZXMiOiJST0xFX0NVU1RPTUVSIiwiZW1haWwiOiJ5b3VsZWZmZSJ9.mZcOdnZNPvdi4n8caIKXC19Fyd8IHY_040eBAGx7geF0TvPOLe1FiV2HqlFPqfb6";
        User user = new User();
        user.setId(1L);

        Cart cart = new Cart();
        cart.setCustomer(user);

        Food food = new Food();
        food.setId(1L);
        food.setPrice(100L);

        AddCartitemreq req = new AddCartitemreq();
        req.setFoodid(food.getId());
        req.setQuantity(2L);

        CartItems newCartItem = new CartItems();
        newCartItem.setFood(food);
        newCartItem.setQuantity(2L);
        newCartItem.setTotaPrice(200L);

        // Mock behaviors
        when(userService.FindUserByJwt(jwt)).thenReturn(user);
        when(cartRepository.findByCustomerId(user.getId())).thenReturn(cart);
        when(foodService.getFood(req.getFoodid())).thenReturn(food);
        when(cartitemRepo.save(any(CartItems.class))).thenReturn(newCartItem);

        // Act: Call the method under test
        CartItems result = cartService.addCartItems(req, jwt);

        // Assert: Verify the behavior and results
        assertNotNull(result);
        assertEquals(2L, result.getQuantity());
        assertEquals(200, result.getTotaPrice());
        verify(userService, times(1)).FindUserByJwt(jwt);
        verify(cartRepository, times(1)).findByCustomerId(user.getId());
        verify(foodService, times(1)).getFood(req.getFoodid());
        verify(cartitemRepo, times(1)).save(any(CartItems.class));
    }

    @Test
    void testAddCartItemsThrowsException() throws Exception {
        // Arrange: Setup mock data
        String jwt = "invalidJwtToken";

        AddCartitemreq req = new AddCartitemreq();
        req.setFoodid(1L);
        req.setQuantity(2L);

        // Mock behaviors
        when(userService.FindUserByJwt(jwt)).thenThrow(new RuntimeException("Invalid JWT"));

        // Act & Assert: Expect an exception
        Exception exception = assertThrows(Exception.class, () -> {
            cartService.addCartItems(req, jwt);
        });

        assertEquals("Error in adding cart items", exception.getMessage());
        verify(userService, times(1)).FindUserByJwt(jwt);
    }

}
