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

    @InjectMocks
    private OrderServiceimpl orderService; // Use the real implementation

    @Mock
    private AddressRepo addressRepo;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RestaurantService restaurantService;

    @Mock
    private CartService cartService;

    @Mock
    private OrderItemRepo orderItemRepo;

    @Mock
    private OrderRepo orderRepo;

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
        address.setId(1L);
        address.setStreetAddress("Test Street");
        address.setCity("Test City");
        orderReq.setDeliveryAddress(address);
        orderReq.setRestaurantid(1L);

        User user = new User();
        user.setId(1L);
        user.setAddresses(new ArrayList<>());

        Restaurant restaurant = new Restaurant();
        restaurant.setId(1L);
        restaurant.setOrders(new ArrayList<>());

        Cart cart = new Cart();
        cart.setCustomer(user);
        cart.setCartItems(new ArrayList<>());
        cart.setTotalPrice(500L);

        CartItems cartItem = new CartItems();
        Food food = new Food();
        food.setName("Pizza");
        food.setPrice(250L);
        cartItem.setFood(food);
        cartItem.setQuantity(2L);
        cartItem.setTotaPrice(500L);
        ArrayList<String> ingredients = new ArrayList<>();
        ingredients.add("Cheese");
        ingredients.add("Tomato");
        cartItem.setIngredients(ingredients);
        cart.getCartItems().add(cartItem);

        OrderItem orderItem = new OrderItem();
        orderItem.setFood(cartItem.getFood());
        orderItem.setQuantity(cartItem.getQuantity());
        orderItem.setTotalPrice(cartItem.getTotaPrice());
        orderItem.setIngredients(cartItem.getIngredients());

        Order expectedOrder = new Order();
        expectedOrder.setId(1L);
        expectedOrder.setDeliveryaddress(address);
        expectedOrder.setCustomer(user);
        expectedOrder.setRestaurant(restaurant);
        expectedOrder.setTotalPrice(500L);
        expectedOrder.setStatus("PENDING");

        // Mock behaviors
        when(addressRepo.save(address)).thenReturn(address);
        when(userRepository.save(user)).thenReturn(user);
        try{
            when(restaurantService.getRestaurant(orderReq.getRestaurantid())).thenReturn(restaurant);
            when(cartService.getCartByUser(user.getId())).thenReturn(cart);
        }
        catch(Exception e){
            fail("Exception thrown: " + e.getMessage());
        }
        when(orderItemRepo.save(any(OrderItem.class))).thenReturn(orderItem);
        when(orderRepo.save(any(Order.class))).thenReturn(expectedOrder);

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
        assertEquals(1L, result.getId());
        assertEquals(address, result.getDeliveryaddress());
        assertEquals(user, result.getCustomer());
        assertEquals(restaurant, result.getRestaurant());
        assertEquals(500L, result.getTotalPrice());
        assertEquals("PENDING", result.getStatus());

        // Verify interactions
        verify(addressRepo, times(1)).save(address);
        verify(userRepository, times(1)).save(user);
        try{
            verify(restaurantService, times(1)).getRestaurant(orderReq.getRestaurantid());
            verify(cartService, times(1)).getCartByUser(user.getId());
        }
        catch(Exception e){
            System.out.println("Exception thrown: " + e.getMessage());
        }
        verify(orderItemRepo, times(1)).save(any(OrderItem.class));
        verify(orderRepo, times(1)).save(any(Order.class));
    }
}
 