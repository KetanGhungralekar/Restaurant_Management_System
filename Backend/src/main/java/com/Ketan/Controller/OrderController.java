package com.Ketan.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.management.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Ketan.Request.CreateOrderreq;
import com.Ketan.Service.EmailService;
import com.Ketan.Service.NotificationService;
import com.Ketan.Service.OrderService;
import com.Ketan.Service.UserService;
import com.Ketan.model.Order;
import com.Ketan.model.OrderItem;
import com.Ketan.model.User;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;
    @PostMapping("/order")
    public ResponseEntity<?> createOrder(@RequestHeader("Authorization") String jwt,
            @RequestBody CreateOrderreq order) {
        try {
            User user = userService.FindUserByJwt(jwt);
            Order createdOrder = orderService.CreateOrderItem(order, user);

            // Immediate order confirmation email
            String toEmail = user.getEmail();
            String subject = "Order Confirmation";
            StringBuilder body = new StringBuilder();
            body.append("Dear ").append(user.getFullname()).append(",\n\n")
                    .append("Your order has been successfully created with order ID: ")
                    .append(createdOrder.getId()).append(".\n\nThank you for your purchase!");

            emailService.sendOrderConfirmationEmail(toEmail, subject, body.toString());
            notificationService.scheduleDeliveryAssignmentNotification(user, createdOrder);

            return ResponseEntity.ok(createdOrder);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private boolean isDeliverableEmail(String email) {
        try {
            // Make an API call to the external email validation service
            // Replace 'yourApiKey' and URL with the actual service endpoint and key
            HttpURLConnection connection = (HttpURLConnection) new URL(
                    "https://api.emailvalidation.com?email=" + email + "&key=yourApiKey").openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            if (responseCode == 200) {
                // Parse the response to check if the email is deliverable
                try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                    String responseLine = in.readLine();
                    return responseLine.contains("\"deliverable\": true");
                }
            }
        } catch (IOException e) {
            System.out.println("Email validation failed: " + e.getMessage());
        }
        return false;
    }

    @GetMapping("/getOrders")
    public ResponseEntity<?> getOrderHistory(@RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);
            return ResponseEntity.ok(orderService.getOrdersByUser(user.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getOrder/{orderId}")
    public ResponseEntity<?> getOrder(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId) {
        try {
            User user = userService.FindUserByJwt(jwt);
            return ResponseEntity.ok(orderService.getOrder(orderId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
