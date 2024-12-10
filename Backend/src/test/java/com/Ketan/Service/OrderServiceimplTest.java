package com.Ketan.Service;

import com.Ketan.model.*;
import com.Ketan.Repository.*;
import com.Ketan.Request.*;
import com.Ketan.Service.*;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class OrderServiceImplTest {
    @Mock
    private OrderItemRepo orderItemRepo;

    @InjectMocks
    private OrderServiceimpl orderService; // Use the real implementation

    @Mock
    private OrderRepo orderRepo;

    @Mock
    private AddressRepo addressRepo;

    @Mock
    private RestaurantService restaurantService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CartService cartService;

    public OrderServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }
    /*
     * tesing if new orders are being created
     * we use mockito and junit for testing
     * we make mock objects for testing purposes
     * we mock their behavior and inject them in function for testing purposes
     */
    @Test
    void testCreateOrderItem() {
        // Arrange: Mock input data
        CreateOrderreq orderReq = new CreateOrderreq();
        Address address = new Address();
        orderReq.setRestaurantid(1L);
        orderReq.setDeliveryAddress(address);
        address.setCity("Test City");
        address.setStreetAddress("Test Street");
        address.setId(1L);

        User user = new User();
        user.setAddresses(new ArrayList<>());
        user.setId(1L);

        Restaurant restaurant = new Restaurant();
        restaurant.setOrders(new ArrayList<>());
        restaurant.setId(1L);

        Cart cart = new Cart();
        cart.setCartItems(new ArrayList<>());
        cart.setTotalPrice(500L);
        cart.setCustomer(user);

        CartItems cartItem = new CartItems();
        cartItem.setTotaPrice(500L);
        cartItem.setQuantity(2L);
        Food food = new Food();
        cartItem.setFood(food);
        food.setPrice(250L);
        food.setName("Pizza");
        ArrayList<String> ingredients = new ArrayList<>();
        ingredients.add("Tomato");
        ingredients.add("Cheese");
        cart.getCartItems().add(cartItem);
        cartItem.setIngredients(ingredients);

        OrderItem orderItem = new OrderItem();
        orderItem.setIngredients(cartItem.getIngredients());
        orderItem.setQuantity(cartItem.getQuantity());
        orderItem.setTotalPrice(cartItem.getTotaPrice());
        orderItem.setFood(cartItem.getFood());

        Order expectedOrder = new Order();
        expectedOrder.setCustomer(user);
        expectedOrder.setTotalPrice(500L);
        expectedOrder.setStatus("PENDING");
        expectedOrder.setDeliveryaddress(address);
        expectedOrder.setRestaurant(restaurant);
        expectedOrder.setId(1L);

        // Mock behaviors
        when(userRepository.save(user)).thenReturn(user);
        when(addressRepo.save(address)).thenReturn(address);
        try{
            when(restaurantService.getRestaurant(orderReq.getRestaurantid())).thenReturn(restaurant);
            when(cartService.getCartByUser(user.getId())).thenReturn(cart);
        }
        catch(Exception e){
            fail("Exception thrown: " + e.getMessage());
        }
        when(orderRepo.save(any(Order.class))).thenReturn(expectedOrder);
        when(orderItemRepo.save(any(OrderItem.class))).thenReturn(orderItem);

        // Act: Call the method
        Order result = null;
        try {
            result = orderService.CreateOrderItem(orderReq, user);
            System.out.println(result.getCustomer().getId());
        } catch (Exception e) {
            System.out.println("Exception thrown: " + e.getMessage());
        }
        // System.out.println(result);

        // Assert: Validate the result
        assertNotNull(result);
        assertEquals("PENDING", result.getStatus());
        assertEquals(user, result.getCustomer());
        assertEquals(address, result.getDeliveryaddress());
        assertEquals(500L, result.getTotalPrice());
        assertEquals(1L, result.getId());
        assertEquals(restaurant, result.getRestaurant());

        // Verify interactions
        verify(userRepository, times(1)).save(user);
        verify(addressRepo, times(1)).save(address);
        try{
            verify(restaurantService, times(1)).getRestaurant(orderReq.getRestaurantid());
            verify(cartService, times(1)).getCartByUser(user.getId());
        }
        catch(Exception e){
            System.out.println("Exception thrown: " + e.getMessage());
        }
        verify(orderRepo, times(1)).save(any(Order.class));
        verify(orderItemRepo, times(1)).save(any(OrderItem.class));
    }
}
 