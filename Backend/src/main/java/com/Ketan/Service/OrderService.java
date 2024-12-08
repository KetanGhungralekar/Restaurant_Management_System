package com.Ketan.Service;

import java.util.List;

import com.Ketan.Request.CreateOrderreq;
import com.Ketan.model.Order;
import com.Ketan.model.OrderItem;
import com.Ketan.model.User;

public interface OrderService {
    public Order CreateOrderItem(CreateOrderreq order,User user);
    public Order updatOrder(Long orderId,String status) throws Exception;
    public void cancelOrder(Long orderId) throws Exception;
    public List<Order> getOrdersByUser(Long userId);
    public List<Order> getOrdersByRestaurant(Long restaurantId,String status);
    public Order getOrder(Long orderId);
}
