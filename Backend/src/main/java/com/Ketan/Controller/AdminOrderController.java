package com.Ketan.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Service.OrderService;
import com.Ketan.Service.UserService;
import com.Ketan.model.User;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @GetMapping("/order/restaurants/{restaurantId}")
    public ResponseEntity<?> getOrderHistoryRestaurant(@RequestHeader("Authorization") String jwt,@PathVariable Long restaurantId,@RequestParam(required = false) String status){
        try {
            User user = userService.FindUserByJwt(jwt);
            return ResponseEntity.ok(orderService.getOrdersByRestaurant(restaurantId, status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/order/update/{orderId}/{status}")
    public ResponseEntity<?> updateOrder(@RequestHeader("Authorization") String jwt,@PathVariable Long orderId,@PathVariable String status){
        try {
            return ResponseEntity.ok(orderService.updatOrder(orderId, status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
