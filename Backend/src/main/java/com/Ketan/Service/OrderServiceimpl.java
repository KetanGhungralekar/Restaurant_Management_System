package com.Ketan.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Ketan.Repository.AddressRepo;
import com.Ketan.Repository.OrderItemRepo;
import com.Ketan.Repository.OrderRepo;
import com.Ketan.Repository.UserRepository;
import com.Ketan.Request.CreateOrderreq;
import com.Ketan.model.Address;
import com.Ketan.model.Cart;
import com.Ketan.model.CartItems;
import com.Ketan.model.Order;
import com.Ketan.model.OrderItem;
import com.Ketan.model.Restaurant;
import com.Ketan.model.User;

@Service
public class OrderServiceimpl implements OrderService{
    @Autowired
    private OrderRepo orderRepo;
    
    @Autowired
    private OrderItemRepo orderItemrepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CartService cartService;

    @Override
    public Order CreateOrderItem(CreateOrderreq order, User user) throws UnsupportedOperationException {
        Address address = order.getDeliveryAddress();
        Address savedAddress = addressRepo.save(address);
        Order newOrder = new Order();
        newOrder.setDeliveryaddress(savedAddress);
        newOrder.setCustomer(user);
        if (!user.getAddresses().contains(address)) {
            user.getAddresses().add(address);
            userRepository.save(user);
        }
        try{
            Restaurant restaurant = restaurantService.getRestaurant(order.getRestaurantid());
            newOrder.setRestaurant(restaurant);
            newOrder.setOrderDate(new Date());
            newOrder.setStatus("PENDING");
            Cart cart = cartService.getCartByUser(user.getId());
            List<OrderItem> orderItems = new ArrayList<>();
            for (CartItems cartItems : cart.getCartItems()) {
                OrderItem orderItem = new OrderItem();
                orderItem.setFood(cartItems.getFood());
                orderItem.setQuantity(cartItems.getQuantity());
                orderItem.setTotalPrice(cartItems.getTotaPrice());
                orderItem.setIngredients(cartItems.getIngredients());
                OrderItem savedOrderItem = orderItemrepo.save(orderItem);
                orderItems.add(savedOrderItem);
            }
            newOrder.setOrderItems(orderItems);
            newOrder.setTotalPrice(cart.getTotalPrice());
            Order savedOrder = orderRepo.save(newOrder);
            restaurant.getOrders().add(savedOrder);
            return savedOrder;
        }
        catch(Exception e){
            e.printStackTrace();
            throw new UnsupportedOperationException("Error fetching restaurant");
        }
    }

    @Override
    public Order updatOrder(Long orderId, String status) throws Exception {
        Order order = getOrder(orderId);
        order.setStatus(status);
        return orderRepo.save(order);
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {
        Order order = getOrder(orderId);
        orderRepo.deleteById(order.getId());
    }

    @Override
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepo.findByCustomerId(userId);
    }

    @Override
    public List<Order> getOrdersByRestaurant(Long restaurantId,String status) {
        List<Order> orders = orderRepo.findByRestaurantId(restaurantId);
        if (status != null){
            List<Order> filteredOrders = new ArrayList<>();
            for (Order order : orders) {
                if (order.getStatus().equals(status)){
                    filteredOrders.add(order);
                }
            }
            return filteredOrders;
        }
        return orders;
    }

    @Override
    public Order getOrder(Long orderId) {
        Optional<Order> order = orderRepo.findById(orderId);
        if (order.isEmpty()){
            throw new UnsupportedOperationException("ORDER NOT FOUND");
        }
        return order.get();
    }
    
}
